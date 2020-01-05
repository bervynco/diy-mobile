import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  	selector: 'app-reset-password',
  	templateUrl: './reset-password.component.html',
  	styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
	resetForm:FormGroup;
	email:string;
	password:string;
	statusMessage:string;
	spinnerLoader: any;
	constructor(private formBuilder: FormBuilder, private alertController: AlertController, private toastController: ToastController, 
			private loadingController: LoadingController, private dataService: DataService, private router: Router,
	) { }

  	ngOnInit() {
		this.resetForm = this.formBuilder.group({
			email: new FormControl('bervyn_co2010@yahoo.com', [
				Validators.required
			])

		});
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
	reset() {
		this.showLoader();
		let details = this.resetForm.value;
		
		this.dataService.resetPassword(details).subscribe(
			(res:any)=>{
				this.createToast("Reset complete", 200, "bottom");
				this.router.navigate(['/me']);
				this.hideLoader();
			},(err) => {
				this.hideLoader();
			}
		);
	}

}
