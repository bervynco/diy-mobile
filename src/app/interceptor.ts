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

        // YOU CAN ALSO DO THIS
        // const token = this.authenticationService.getToke()
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        request = request.clone({ headers: request.headers.set("Access-Control-Allow-Origin", "*") });
        request = request.clone({ headers: request.headers.set('Access-Control-Allow-Headers', "Origin, Authorization, Content-Type, Accept") });
        
        if(request.url.search('wallet') > 0 ){
            console.log("Interceptor Enabled");
            return from(this.storage.get(TOKEN_KEY))
            .pipe(
                switchMap(token => {
                    if (token) {
                        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token.accessToken) });
                    }

                    return next.handle(request).pipe(
                        map((event: HttpEvent<any>) => {
                            if (event instanceof HttpResponse) {
                                // do nothing for now
                            }
                            return event;
                        }),
                        catchError((error: HttpErrorResponse) => {
                            const status =  error.status;
                            const reason = error && error.error.reason ? error.error.reason : '';
                            return throwError(error);
                        })
                    );
                })
            );
        }
        else{
            console.log("Interceptor Disabled");
            return next.handle(request);
        }
        


    }

    async presentAlert(status, reason) {
        const alert = await this.alertController.create({
            header: status + ' Error',
            subHeader: 'Subtitle',
            message: reason,
            buttons: ['OK']
        });

        await alert.present();
    }
}