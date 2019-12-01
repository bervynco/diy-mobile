import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-me',
	templateUrl: './me.component.html',
	styleUrls: ['./me.component.css'],
})
export class MeComponent implements OnInit {
	token:String = "";
	isLoggedIn : Observable<boolean>;
	constructor(private router: Router, private authService: AuthService) {
		this.loadStorage();
	}

	ngOnInit() {
		
	}
	
	async loadStorage() {
		this.isLoggedIn = this.authService.isLoggedIn();
	}
	viewMenu() {
		this.router.navigate(['/profile-menu']);
	}
	
}
