import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	
	DEV_BASE_PATH = 'http://localhost:3494/api/v1/';
	PROD_BASE_PATH = 'https://diy-platform-backend.herokuapp.com/';
	token = localStorage.getItem("access_token");
	headers = new HttpHeaders;
  
  	constructor(private http: HttpClient) {
		this.headers = this.headers.append("Content-Type", 'application/json');
		this.headers = this.headers.append('Authorization', "Bearer " + this.token);
		this.headers = this.headers.append("Access-Control-Allow-Origin", "*");
		this.headers = this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
	}
	
	public getToken() {
		return localStorage.getItem("access_token");
	}
    private handleError(error: HttpErrorResponse) {
        return throwError(error.status + ': ' + error.statusText);
    };
  
  	/* Login Component */
  	login(details) {
		var output = this.http.post(this.PROD_BASE_PATH + 'api/v1/users/login', {
			observe: 'response',
			email: details.email,
			password: details.password,
			headers: this.headers
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}
	/* User Management */

	registerUser(details) {
		//httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
		var output = this.http.post(this.PROD_BASE_PATH + 'users/appusers', details, {
			headers: this.headers
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}

	/* End of user Management */
}