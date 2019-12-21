import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
	token = "";
	DEV_BASE_PATH = 'http://localhost:3494/api/v1/';
	PROD_BASE_PATH = 'https://diy-platform-backend.herokuapp.com/api/v1/';
	// token = localStorage.getItem("auth");
	headers = new HttpHeaders;
  
  	constructor(private http: HttpClient, private authService: AuthService) {
		// this.authService.getStorage("auth").then(function(token){
		// 	this.token=token;
		// })
		// console.log(this.token);
		// this.headers = this.headers.append("Content-Type", 'application/json');
		// this.headers = this.headers.append('Authorization', "Bearer " + this.token);
		// this.headers = this.headers.append("Access-Control-Allow-Origin", "*");
		// this.headers = this.headers.append("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, Accept");
	}
	
	public getToken() {
		return localStorage.getItem("auth");
	}
    private handleError(error: HttpErrorResponse) {
        return throwError(error.status + ': ' + error.statusText);
    };
  
  	/* Login Component */
  	login(details) {
		var output = this.http.post(this.PROD_BASE_PATH + 'users/login', {
			observe: 'response',
			email: details.email,
			password: details.password
			// headers: this.headers
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
	/* Wallet */
	getWalletDetails() {
		var output = this.http.get(this.PROD_BASE_PATH + 'wallet/me', {
			observe: 'response',
			headers: this.headers
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}
	
	/* End of Wallet */

	/* Branch */
	getBranchNearby(coords) {
		var output = this.http.post(this.PROD_BASE_PATH + 'store/nearby', {
			observe: 'response',
			longitude: coords.longitude,
			latitude: coords.latitude
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}

	getBranchDetails(id) {
		var output = this.http.get(this.PROD_BASE_PATH + 'store/branch/' + id, {
			observe: 'response'
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}
}