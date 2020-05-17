import { Injectable } from '@angular/core';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  	constructor(private loadingController: LoadingController, private toastController: ToastController) { }
  	showLoader() {
		return this.loadingController.create({
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

	async createToast(message, code, position){
		let color = "";
		if(code == 200)
			color = "primary";
		else
			color = "danger";

		const toast = await this.toastController.create({
			color: color,
	        duration: 3000,
	        message: message,
			showCloseButton: true,
			animated: true,
			position: position
		});
		toast.present();
	}
}
