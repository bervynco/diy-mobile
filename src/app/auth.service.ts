import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable } from "rxjs";
@Injectable({
  	providedIn: 'root'
})
export class AuthService {
	isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
	constructor(private storage: Storage) { }
	
	/**
	   * if we have token the user is loggedIn
	   * @returns {boolean}
	   */
  	private hasToken() : boolean {
		let hasToken = false;
		this.storage.get("auth").then(function(data){
			if(data == null)
				hasToken = false;
			hasToken = true;
		});

		return hasToken;
  	}
	
	isLoggedIn() : Observable<boolean> {
		return this.isLoginSubject.asObservable();
	}
	
	login() {
		this.isLoginSubject.next(true);
	}

	getStorage(storageName) {
		return this.storage.get(storageName).then(function(data){
			return data;
		}); 
	}
	
	setStorage(storageName, value) {
		return this.storage.set(storageName, value).then(function(data){
			return data;
		});
	}

	removeStorage(storageName) {
		this.storage.remove(storageName)
	}
}
