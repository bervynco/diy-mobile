import { Component, OnInit } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {

  	constructor(private launchNavigator: LaunchNavigator, public alertController: AlertController, public toastController: ToastController, ) { }
		options: LaunchNavigatorOptions;
		ngOnInit(){
			this.options = {
				app: this.launchNavigator.APP.WAZE
			}
		}
		navigate() {
			this.launchNavigator.navigate([14.533863,121.051133], this.options)
		    .then(
			      success => this.createAlert("Success", "Launched navigator"),
			      error => this.createAlert("Error", 'Error launching navigator ' + error)
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

}
