import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';


import { AuthService } from '../auth.service';
import { MeComponent } from '../me/me.component';
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
	constructor(private formBuilder: FormBuilder, private alertController: AlertController, private toastController: ToastController, 
			private loadingController: LoadingController, private Login: DataService, private authService:AuthService, private router: Router,
	) { }

  	ngOnInit() {
		
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
	showLoader() {
		this.spinnerLoader = this.loadingController.create({
			message: 'Please wait',
			cssClass: '.custom-loading-class',
			spinner: 'crescent',
			
		}).then((res) => {
			console.log(res);
			res.present();
		});
	}
	 
	hideLoader() {
		setTimeout(() => {
		  this.loadingController.dismiss();
		}, 2000);
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
		this.showLoader();
		let details = this.loginForm.value;
		
		this.Login.login(details).subscribe(
			(res:any)=>{
				this.createToast("Login complete", 200, "bottom");
				// this.authService.setStorage("auth", res);
				this.authService.login(res);
				this.createToast("Login successful",200, "bottom");
				this.router.navigate(['/me']);
				this.hideLoader();
				
				// if(res.status == 900){
				// 	this.createAlert("Login failed", "The email address or password entered is incorrect");
				// }
				// else {
				// 	// localStorage.setItem("access_token", res.accessToken);
				// 	// localStorage.setItem("refresh_token",res.refreshToken);
				// 	// this.router.navigate(["branch-management"]);
				// 	// console.log("Complete");
				// }
			},(err) => {
				this.hideLoader();
			}
		);
		
	}
			

}
