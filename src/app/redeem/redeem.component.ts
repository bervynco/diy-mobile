import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { User } from '../interface/User';
import {
	BarcodeScannerOptions,
	BarcodeScanner
} from "@ionic-native/barcode-scanner/ngx";

@Component({
	selector: 'app-redeem',
	templateUrl: './redeem.component.html',
	styleUrls: ['./redeem.component.css'],
})
export class RedeemComponent implements OnInit {
	points:Number;
	isLoggedIn:boolean = false;
	constructor(private router: Router, private authService: AuthService, private toastController: ToastController, private dataService: DataService) {
		// this.loadStorage();
		this.checkIfAuthenticated();
	}
	data:any = {
		'userId': 41
	}
	encodedData:String = "";
	
	ngOnInit() {
		this.generateQr();
	}
	
	ionViewWillEnter() {
		this.checkIfAuthenticated();
	}
	checkIfAuthenticated() {
		this.authService.authState.subscribe(state => {
			if(state == true){
				this.getWalletDetails();
			}
			else {
				this.createToast("You are not logged in. Please complete login.", 401, "bottom");
				this.router.navigate(['me/login']);
			}
			this.isLoggedIn = state;
		});
	}

	getWalletDetails() {
		this.dataService.getWalletDetails().subscribe(
			(res:any)=>{
				this.points = res.body[0].currentBalance;
			},(err) => {
			}
		);
	}
	generateQr() {
		this.encodedData = JSON.stringify(this.data);
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
