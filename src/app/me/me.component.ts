import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { User } from '../interface/User';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';
import { LoaderService } from '../loader.service';
@Component({
	selector: 'app-me',
	templateUrl: './me.component.html',
	styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
	token:String = "";
	isLoggedIn$: Observable<boolean>;
	walletHistory;
	points:Number;
	userProfile:User = {'name': "", 'email': ""};
	constructor(private router: Router, private authService: AuthService, private dataService: DataService, private loaderService:LoaderService) {
	}

	ngOnInit() {
		
	}
	ionViewWillEnter() {
		this.checkIfAuthenticated();
	}
	checkIfAuthenticated() {
		this.loaderService.showLoader();
		this.isLoggedIn$ = this.authService.isLoggedIn;
		this.authService.hasToken().then(response => {
			if(response === true){
				this.dataService.getMyDetails().subscribe(
					(res:any)=> {
						this.walletHistory = res[0][0].history;
						this.points = res[0][0].currentBalance;
						this.userProfile = res[1];
						this.loaderService.hideLoader();
						
					},(err) => {
						this.loaderService.hideLoader();
					}
				)
			}
			else{
				this.loaderService.createToast("You are not logged in. Please complete login.", 401, "bottom");
				this.router.navigate(['me/login']);
			}
		});
		
	}

	viewMenu() {
		this.router.navigate(['/profile-menu']);
	}
	
}
