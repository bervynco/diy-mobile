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
	isLoggedIn:boolean = false;
	// isLoggedIn : Observable<boolean>;
  	constructor(private router: Router, private authService: AuthService) {
		  this.checkIfAuthenticated();
	}
	

	ngOnInit() {}
	viewTerms() {
		this.activeRoute = "Terms";
	}

	viewContactUs() {
		this.router.navigate(['me/contact-us']);
		this.activeRoute = "Contact Us";
	}
	
	logout(){
		this.activeRoute = "Log Out";
		this.router.navigate(['home']);
		this.authService.authState.next(false);
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

	checkIfAuthenticated() {
		this.authService.authState.subscribe(state => {
			this.isLoggedIn = state;
		});
	}
}
