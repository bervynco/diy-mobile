import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, from, Subject } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { DataService } from '../app/data.service';
import { AuthService } from '../app/auth.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
    
    protected DEV_BASE_PATH = 'http://localhost:3494/api/v1/';
	protected PROD_BASE_PATH = 'https://diy-platform-backend.herokuapp.com/';
    // protected url   = 'http://localhost:3494/api/v1/';
    protected debug = true;
    private _refreshSubject: Subject<any> = new Subject<any>();
    constructor(
        private alertController: AlertController, 
        private storage: Storage, 
        private dataService: DataService, 
        private authService: AuthService
    ) {}

    private _refreshExpiredToken() {

        this._refreshSubject.subscribe({
            complete: () => {
                this._refreshSubject = new Subject<any>();
            }
        });
        if (this._refreshSubject.observers.length === 1) {
            // Hit refresh-token API passing the refresh token stored into the request
            // to get new access token and refresh token pair
            this.dataService.refreshToken().subscribe(this._refreshSubject);
        }
        return this._refreshSubject;
    }

    private _checkErrorExpiredToken(error: HttpErrorResponse): boolean {
        if(error.error.message === "Access token is expired"){
            return true;
        }
        else {
            return false;
        }
    }

    private updateHeader(req) {
        const token = this.authService.getToken().then(function(response){
            return response.accessToken;
        });
        console.log(token);
        req = req.clone({
          headers: req.headers.set("Authorization", 'Bearer ' + token)
        });
        return req;
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        request = request.clone({ headers: request.headers.set("Access-Control-Allow-Origin", "*") });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', "Origin, Authorization, Content-Type, Accept") });
        
        if(request.url.search('me') > 0 || request.url.search('refreshtoken') > 0){
            return from(this.storage.get("auth"))
            .pipe(
                switchMap(token => {
                    request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.accessToken) });
                    return next.handle(request).pipe(
                        
                        map((event: HttpEvent<any>) => {
                            
                            if (event instanceof HttpResponse) {
                                // do nothing for now
                            }
                            return event;
                        }),
                        catchError((error, caught) => {
                            console.log("Access token: " + token.accessToken);
                            console.log("Refresh token: " + token.refreshToken);
                            this.createAlert("Error", error.error.message);
                            if(error instanceof HttpErrorResponse){
                                console.log("Error: " + this._checkErrorExpiredToken(error));
                                if(this._checkErrorExpiredToken(error)){
                                    return this._refreshExpiredToken().pipe(
                                        switchMap(() => {
                                            return next.handle(this.updateHeader(request));
                                        })
                                    );
                                }
                                else {
                                    return throwError(error);
                                }
                            }
                            else {
                                return caught;
                            }
                        })
                    );
                })
            );
        }
        else if(request.url.search('refreshtoken') > 0){

        }
        else{
            return next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        // do nothing for now
                    }
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    let returnError = "";
                    if(error.error.data){
                        returnError = error.error.data;
                    }
                    else {
                        returnError = error.error.message;
                    }
                    this.createAlert("Error", returnError);
                    return throwError(returnError);
                })
            );
        }
    }
    async createAlert(header, message){
		const alert = await this.alertController.create({
			header: header,
			message: message,
			buttons: ['OK']
		});
	
		await alert.present();
	}
}