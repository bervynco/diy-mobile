import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { MustMatch } from '../_helpers/must-match.validator';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
	changePasswordForm:FormGroup;
	spinnerLoader: any;
	constructor(
		private formBuilder: FormBuilder,
		private alertController: AlertController, 
		private toastController: ToastController,  
		public dataService: DataService,
		private loadingController: LoadingController,
		private router: Router
	) {
		this.changePasswordForm = this.formBuilder.group({
			currentPassword: new FormControl('', [
				Validators.required
			]),
			newPassword: new FormControl('', [
				Validators.required,
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')
			]),
			confirmPassword: new FormControl('', [
				Validators.required
			])
		},{
			validator: MustMatch('newPassword', 'confirmPassword')
		});
	}

	ngOnInit() {}
	get formValidator() { 
		return this.changePasswordForm.controls; 
	}

	reset() {
		let passwordDetails = {
			"currentPassword": this.changePasswordForm.value.currentPassword,
			"newPassword": this.changePasswordForm.value.newPassword
		}
		this.showLoader();
		this.dataService.changePassword(passwordDetails).subscribe(
			(res:any)=>{
				this.createToast("Change password completed", 200, "bottom");
				this.router.navigate(['me/profile-menu']);
				this.hideLoader();

			},(err: HttpErrorResponse) => {
				// console.log(err);
				// this.createAlert("Error", err);
				this.hideLoader();
			}
		);
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
}