import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  	selector: 'app-profile-menu',
  	templateUrl: './profile-menu.component.html',
  	styleUrls: ['./profile-menu.component.css'],
})
export class ProfileMenuComponent implements OnInit {
	activeRoute:String = "";
	isLoggedIn$: Observable<boolean>;
  	constructor(private router: Router, private authService: AuthService) {
		  
	}
	

	ngOnInit() {}
	ionViewWillEnter() {
		this.isLoggedIn$ = this.authService.isLoggedIn;
	}
	viewTerms() {
		this.activeRoute = "Terms";
		this.router.navigate(['me/terms']);
	}

	viewContactUs() {
		this.router.navigate(['me/contact-us']);
		this.activeRoute = "Contact Us";
	}
	
	logout(){
		this.activeRoute = "Log Out";
		this.router.navigate(['me/profile-menu']);
		this.router.navigate(['home']);
		// this.authService.isLoggedIn.next(false);
		this.authService.logout();
	}

	changePassword() {
		
		this.router.navigate(['me/change-password']);
		this.activeRoute = "Change Password";
	}
	login() {
		this.router.navigate(['me/login']);
		this.activeRoute = "Log In";
	}
}
