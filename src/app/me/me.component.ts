import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { User } from '../interface/User';

import * as jwt_decode from 'jwt-decode';
@Component({
	selector: 'app-me',
	templateUrl: './me.component.html',
	styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
	token:String = "";
	isLoggedIn:boolean = false;
	walletHistory;
	userProfile:User = {'name': "", 'email': ""};
	constructor(private router: Router, private authService: AuthService, private dataService: DataService) {
		// this.loadStorage();
		this.checkIfAuthenticated();
	}

	ngOnInit() {
		
	}

	populateProfile() {
		this.authService.getToken().then(response => {
			var decoded = jwt_decode(response.accessToken);
			this.userProfile.email = decoded.email;
			this.userProfile.name = "Bervyn Co";
			
		});
	}
	checkIfAuthenticated() {
		this.authService.authState.subscribe(state => {
			if(state == true){
				this.populateProfile();
				this.getWalletDetails();
			}
			this.isLoggedIn = state;
		});
	}

	viewMenu() {
		this.router.navigate(['/profile-menu']);
	}

	getWalletDetails() {
		this.dataService.getWalletDetails().subscribe(
			(res:any)=>{
				this.walletHistory = res.body[0].history;
			},(err) => {
				this.dataService.refreshToken().subscribe(
					(res:any)=>{
						console.log(res);
					},(err) => {
						this.dataService.refreshToken();
						console.log(err);
					}
				);
				console.log(err);
			}
		);
	}
	
}
