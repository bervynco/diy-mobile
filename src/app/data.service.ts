import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	token = "";
	DEV_BASE_PATH = 'http://localhost:10010/api/v1/';
	PROD_BASE_PATH = 'https://diy-platform-backend.herokuapp.com/api/v1/';
	BASE_PATH = this.PROD_BASE_PATH;
	// token = localStorage.getItem("auth");
  
  	constructor(private http: HttpClient, private authService: AuthService) {
	}
	
    private handleError(error: HttpErrorResponse) {
        return throwError(error.status + ': ' + error.statusText);
    };
	
	/* Refresh token */
	refreshToken() {
		var output = this.http.post(this.BASE_PATH + 'users/refreshtoken', {
			observe: 'response'
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}

	/* End of refresh token */
  	/* Login Component */
  	login(details) {
		var output = this.http.post(this.BASE_PATH + 'users/login', {
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

	getProfile() {
		return this.http.get(this.BASE_PATH + 'users/me', {
		});
	}
	/* User Management */

	registerUser(details) {
		var output = this.http.post(this.BASE_PATH + 'users/register', details, {
			observe: 'response'
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}

	/* End of user Management */
	/* Me */
	getWalletDetails() {
		return this.http.get(this.BASE_PATH + 'wallet/me', {
		});
	}
	
	getMyDetails() {
		return forkJoin(this.getWalletDetails(), this.getProfile());
	}

	getMeDetails() {

	}
	changePassword(passwordDetails) {
		var output = this.http.post(this.BASE_PATH + 'users/me/changepassword', {
			observe: 'response',
			currentPassword: passwordDetails.currentPassword,
			newPassword: passwordDetails.newPassword
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}

	resetPassword(details) {
		var output = this.http.post(this.BASE_PATH + 'users/forgotpassword', {
			observe: 'response',
			email: details.email
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}
	/* End of Me */

	/* Branch */
	getBranchNearby(coords) {
		var output = this.http.post(this.BASE_PATH + 'store/nearby', {
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
		var output = this.http.get(this.BASE_PATH + 'store/branch/' + id, {
			observe: 'response'
		}).pipe(
		// retry(3),  // if (error) => retry 'n' times
		catchError(this.handleError)
		);
		return output;
	}
	/* End of branch */
}