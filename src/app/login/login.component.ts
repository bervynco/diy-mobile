import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService } from '../auth.service';
import { LoaderService } from '../loader.service';
@Component({
	  selector: 'login',
	  templateUrl: './login.component.html',
	  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm:FormGroup;
	email:string;
	password:string;
	statusMessage:string;
	spinnerLoader: any;
	isLoggedIn$: Observable<boolean>;
	constructor(private formBuilder: FormBuilder, private alertController: AlertController, private toastController: ToastController, 
			private loadingController: LoadingController, private Login: DataService, 
			private authService:AuthService, private router: Router, private loaderService:LoaderService
	) { }

  	ngOnInit() {
		this.isLoggedIn$ = this.authService.isLoggedIn;
		this.loginForm = this.formBuilder.group({
			email: new FormControl('bervyn_co2010@yahoo.com', [
				Validators.required
			]),
			password: new FormControl('Password01!', [
				Validators.required
			]),

		});
		// this.hideLoader();
  	}
	async createAlert(header, message){
		const alert = await this.alertController.create({
			header: header,
			message: message,
			buttons: ['OK']
		});
	
		await alert.present();
	}

	async createToast(message, code, position){
		let color = "";
		if(code == 200)
			color = "primary";
		else
			color = "danger";

		const toast = await this.toastController.create({
			color: color,
	        duration: 2000,
	        message: message,
			showCloseButton: true,
			animated: true,
			position: position
		});
		toast.present();
	}
	async login() {
		this.loaderService.showLoader();
		let details = this.loginForm.value;
		
		this.Login.login(details).subscribe(
			(res:any)=>{
				this.createToast("Login complete", 200, "bottom");
				this.authService.login(res);
				this.createToast("Login successful",200, "bottom");
				this.router.navigate(['/me']);
				this.loaderService.hideLoader();
			},(err) => {
				this.loaderService.hideLoader();
			}
		);
		
	}
			

}
