import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-me',
	templateUrl: './me.component.html',
	styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
	token:String = "";
	isLoggedIn : Observable<boolean>;
	loginStatus:boolean = false;
	constructor(private router: Router, private authService: AuthService, private dataService: DataService) {
		this.loadStorage();
	}

	ngOnInit() {
		
	}

	async loadStorage() {
		await this.authService.isLoggedIn().subscribe((loginStatus)=>{
			console.log(loginStatus);
			this.loginStatus = loginStatus;
		});
		console.log(this.loginStatus);
		this.getWalletDetails();
		// if(this.loginStatus == true){
		// 	this.getWalletDetails();
		// }
	}

	viewMenu() {
		this.router.navigate(['/profile-menu']);
	}

	getWalletDetails() {
		this.dataService.getWalletDetails().subscribe(
			(res:any)=>{
				console.log(res);
				// this.createToast("Login complete", 200, "bottom");
				// this.authService.setStorage("auth", res);
				// this.authService.login();
				// this.createToast("Login successful",200, "bottom");
				// this.router.navigate(['/me']);
				// this.hideLoader();
				// }
			},(err) => {
				// this.createAlert("Login failed", "The email address or password entered is incorrect");
				// this.hideLoader();
			}
		);
	}
	
}
