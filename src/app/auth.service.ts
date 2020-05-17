// import { Injectable } from '@angular/core';
// import { Storage } from '@ionic/storage';
// import { BehaviorSubject, Observable, from, ReplaySubject } from "rxjs";
// @Injectable({
//   	providedIn: 'root'
// })
// export class AuthService {
// 	isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
// 	constructor(private storage: Storage) { }
	
// 	/**
// 	   * if we have token the user is loggedIn
// 	   * @returns {boolean}
// 	   */
//   	private hasToken() : any {
// 		let hasToken = false;
// 		this.storage.get("auth").then(function(data){

// 			if(data == null){
// 				console.log("Storage doesn't have value");
// 				// this.hasToken = false;
// 				return false;
// 			}
				
// 			else{
// 				console.log("Storage has value");
// 				// this.hasToken = true;
// 				return true;
// 			}
// 		});
//   	}
	
// 	isAuthenticated() {
// 		return this.authState.value;
// 	}
// 	isLoggedIn() : Observable<boolean> {
// 		this.hasToken();
// 		return this.isLoginSubject.asObservable();
// 	}
	
// 	login() {
// 		this.isLoginSubject.next(true);
// 	}
	  
// 	getStorage(storageName) {
// 		return this.storage.get(storageName).then(function(data){
// 			return data;
// 		}); 
// 	}
	
// 	setStorage(storageName, value) {
// 		return this.storage.set(storageName, value).then(function(data){
// 			return data;
// 		});
// 	}

// 	removeStorage(storageName) {
// 		this.storage.remove(storageName)
// 	}
// }


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
 
 
@Injectable()
export class AuthService {
	private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  	authState = new BehaviorSubject(false);
 
  	constructor(
		private router: Router,
		private storage: Storage,
		private platform: Platform,
		public toastController: ToastController
	) {
		// this.platform.ready().then(() => {
		// 	this.ifLoggedIn();
		// });
	}
	get isLoggedIn() {
		let authToken = this.getToken(); 
		
		authToken.then((response) => {
			if(response === null || response === ""){
				this.loggedIn.next(false);
				return false;
			}
			else{
				this.loggedIn.next(true);
				return true;
			}
		});
		return this.loggedIn.asObservable();
  	}
  	
	getToken() {
		return this.storage.get("auth").then((response) => {
			return response;
		});
	}

	hasToken() {
		return this.storage.get("auth").then((response) => {
			if(response !== null){
				if('accessToken' in response){
					return true;
				}
				else{
					return false;
				}
			}
			else{
				return false;
			}
		});
	}
  	login(authData) {
		this.storage.set('auth', authData).then((response) => {
			this.loggedIn.next(true);
		});
  	}
 
	logout() {
		this.storage.remove('auth').then(() => {
			this.loggedIn.next(false);
		});
	}
 
	isAuthenticated() {
		return this.loggedIn.value;
	}

 
 
}