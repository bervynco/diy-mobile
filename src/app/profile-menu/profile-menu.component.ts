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
	isLoggedIn : Observable<boolean>;
  	constructor(private router: Router, private authService: AuthService) {
		  this.loadStorage();
	}
	
	async loadStorage() {
		this.isLoggedIn = this.authService.isLoggedIn();
	}

	ngOnInit() {}
	viewTerms() {
		this.activeRoute = "Terms";
	}

	viewContactUs() {
		this.activeRoute = "Contact Us";
	}
	
	logout(){
		this.activeRoute = "Log Out";
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
