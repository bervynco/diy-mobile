import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
    selector: 'app-contact-us',
    templateUrl: './contact-us.component.html',
    styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {
	contactForm:FormGroup;
	email:string;
	password:string;
	statusMessage:string;
	spinnerLoader: any;
    constructor(private formBuilder: FormBuilder, private alertController: AlertController, private toastController: ToastController, 
		private loadingController: LoadingController, private Login: DataService, private router: Router,
	) { }

    ngOnInit() {
		this.contactForm = this.formBuilder.group({
			name: new FormControl('', [
				Validators.required
			]),
			email: new FormControl('', [
				Validators.required
			]),
			message: new FormControl('', [
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

}
