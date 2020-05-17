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
	branchList:any;
	filteredBranchList:any;
	dataLoaded: Boolean = false;
  	constructor(
		private geolocation: Geolocation, 
		public alertController: AlertController, 
		public toastController: ToastController, 
		private dataService: DataService,
		private router: Router
	) { }
		ngOnInit(){}

		ionViewWillEnter() {
			this.dataLoaded = false;
		}
		ionViewDidEnter(){
			this.determineCurrentLocation();
		}
		
		filterList(event){
			let searchValue = event.target.value;
			this.filteredBranchList = this.branchList;
			if (searchValue && searchValue.trim() !== '') {
				this.filteredBranchList = this.filteredBranchList.filter((branch) => {
					return (
						branch.address.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || 
						branch.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 ||
						branch.city.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
					);
				})
			}
			console.log(this.branchList);
		}
		getBranchNearby() {
			this.dataService.getBranchNearby(this.currLocation).subscribe(
				(res:Branch)=>{
					this.branchList = res;
					this.filteredBranchList = res;
					console.log(this.branchList);
					this.dataLoaded = true;
					// }
				},(err) => {
					this.dataLoaded = true;
				}
			);
		}
		routeBuilder(id){
			this.router.navigate(['branch/branch-summary/' + id]);
		}
		
		async determineCurrentLocation() {
			let options = {timeout: 10000, enableHighAccuracy: true};
			this.geolocation.getCurrentPosition(options).then((resp) => {
				this.currLocation.longitude = resp.coords.longitude;
				this.currLocation.latitude = resp.coords.latitude;
				// this.createAlert("Success", this.currLocation.longitude);
				// this.createAlert("Success", this.currLocation.latitude);
				this.getBranchNearby();
			}).catch((error) => {
				this.createAlert("Error", "Error in catch of getCurrentPosition");
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
