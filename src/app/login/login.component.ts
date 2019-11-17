import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';
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
  	constructor(private formBuilder: FormBuilder, public alertController: AlertController, public Login: DataService) { }

  	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			email: new FormControl('', [
				Validators.required
			]),
			password: new FormControl('', [
				Validators.required
			]),

		});
  	}
	
	async createAlert(header, message){
		const alert = await this.alertController.create({
			header: header,
			message: message,
			buttons: ['OK']
		});
	
		await alert.present();
	}
	async login() {
		let details = this.loginForm.value;
		this.Login.login(details).subscribe(
				(res:any)=>{
					console.log(res);
					if(res.status == 900){
						this.createAlert("Login failed", "The email address or password entered is incorrect");
					}
					else {
						// localStorage.setItem("access_token", res.accessToken);
						// localStorage.setItem("refresh_token",res.refreshToken);
						// this.router.navigate(["branch-management"]);
						// console.log("Complete");
					}
				},(err) => {
					this.createAlert("Login failed", "The email address or password entered is incorrect");
				},() =>{
					
					
		});
		
	}
		// if (this.loginForm.valid) {
		// 	let details = this.loginForm.value;
			

}
