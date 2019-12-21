import { Component, OnInit } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

import { DataService } from '../data.service';
import { Branch } from '../interface/branch';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent implements OnInit {
	//14.617023, 120.960985
	//currLocation = {'longitude': 14.535378, 'latitude': 121.051348};
	currLocation = {'longitude': 0, 'latitude': 0};
	// currLocation;
	branchList:Branch;
  	constructor(
		private geolocation: Geolocation, 
		public alertController: AlertController, 
		public toastController: ToastController, 
		private dataService: DataService,
		private router: Router
	) { }
		
		ngOnInit(){
			this.determineCurrentLocation();
			
			
		}
		
		getBranchNearby() {
			console.log(this.currLocation);
			this.dataService.getBranchNearby(this.currLocation).subscribe(
				(res:Branch)=>{
					this.branchList = res;
					// }
				},(err) => {
					
				}
			);
		}
		routeBuilder(id){
			this.router.navigate(['branch/branch-summary/' + id]);
		}
		
		determineCurrentLocation() {
			console.log("Determine current loc");
			this.geolocation.getCurrentPosition().then((resp) => {
				this.currLocation.longitude = resp.coords.longitude;
				this.currLocation.latitude = resp.coords.latitude;
				this.getBranchNearby();
			}).catch((error) => {
				this.createAlert("Error", error);
			});
			   
			// let watch = this.geolocation.watchPosition();
			// watch.subscribe((data) => {
			// 	this.currLocation.longitude = data.coords.longitude;
			// 	this.currLocation.latitude = data.coords.latitude;
			// 	this.createAlert("subscribe", this.currLocation);
			// 	// data can be a set of coordinates, or an error (if an error occurred).
			// 	// data.coords.latitude
			// 	// data.coords.longitude
			// });
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
