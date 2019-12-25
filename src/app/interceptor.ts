import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';


const TOKEN_KEY = 'auth';

@Injectable()
export class Interceptor implements HttpInterceptor {
    
    protected DEV_BASE_PATH = 'http://localhost:3494/api/v1/';
	protected PROD_BASE_PATH = 'https://diy-platform-backend.herokuapp.com/';
    // protected url   = 'http://localhost:3494/api/v1/';
    protected debug = true;

    constructor(private alertController: AlertController, private storage: Storage) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        request = request.clone({ headers: request.headers.set("Access-Control-Allow-Origin", "*") });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', "Origin, Authorization, Content-Type, Accept") });
        
        if(request.url.search('me') > 0 || request.url.search('refreshtoken') > 0){
            return from(this.storage.get(TOKEN_KEY))
            .pipe(
                switchMap(token => {
                    if (token) {
                        if(request.url.search('refreshtoken') > 0){
                            console.log("Refresh token");
                            console.log(token.refreshToken);
                            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.refreshToken) });
                        }
                        else {
                            console.log("Access token");
                            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.accessToken) });
                        }
                       
                    }

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
                            console.log(returnError);
                            this.createAlert("Error", returnError);
                            // const status =  error.status;
                            // const reason = error && error.error.data ? error.error.data : status;
                            return throwError(returnError);
                        })
                    );
                })
            );
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