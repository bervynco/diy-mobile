import { Component, OnInit } from '@angular/core';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator/ngx';
import { AlertController, ToastController } from '@ionic/angular';
import { switchMap } from "rxjs/operators" // RxJS v6
import { ActivatedRoute } from "@angular/router";

import { Branch } from '../interface/branch';
import { DataService } from '../data.service';
@Component({
  selector: 'app-branch-summary',
  templateUrl: './branch-summary.component.html',
  styleUrls: ['./branch-summary.component.css'],
})
export class BranchSummaryComponent implements OnInit {
	options: LaunchNavigatorOptions;
	summary: Branch;
	storeID: String;
	isLoadedFlag:boolean = false;
  	constructor(
		private launchNavigator: LaunchNavigator, 
		public alertController: AlertController, 
		public toastController: ToastController, 
		private route: ActivatedRoute,
		private dataService: DataService
	) {

	}

 	ngOnInit() {
		this.storeID = this.route.snapshot.paramMap.get("id");
		this.getBranchSummaryData(this.storeID);
	}

	getBranchSummaryData(id) {
		this.dataService.getBranchDetails(this.storeID).subscribe(
			(res:any)=>{
				this.summary = res.body;
				this.isLoadedFlag = true;
				// }
			},(err) => {
				
			}
		);
	}
	
	initializeNavigationOption() {
		this.options = {
			app: this.launchNavigator.APP.WAZE
		}
	}  
	navigate() {
		this.initializeNavigationOption();
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
