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
 
  	authState = new BehaviorSubject(false);
 
  	constructor(
		private router: Router,
		private storage: Storage,
		private platform: Platform,
		public toastController: ToastController
	) {
		this.platform.ready().then(() => {
			this.ifLoggedIn();
		});
	}
 
  	ifLoggedIn() {
		this.storage.get("auth").then((response) => {
			if (response) {
				this.authState.next(true);
			}
		});
  	}
	  
	getToken() {
		return this.storage.get("auth").then((response) => {
			return response;
		});
	}
  	login(authData) {
		this.storage.set('auth', authData).then((response) => {
			this.authState.next(true);
		});
  	}
 
	logout() {
		this.storage.remove('auth').then(() => {
			this.authState.next(false);
		});
	}
 
	isAuthenticated() {
		return this.authState.value;
	}

 
 
}