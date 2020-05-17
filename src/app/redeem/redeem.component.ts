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
import { Observable } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
	selector: 'app-redeem',
	templateUrl: './redeem.component.html',
	styleUrls: ['./redeem.component.css'],
})
export class RedeemComponent implements OnInit {
	points:Number;
	isLoggedIn$: Observable<boolean>;
	isLoaded:boolean = false;
	constructor(private router: Router, private authService: AuthService, private toastController: ToastController, 
		private loaderService: LoaderService,private dataService: DataService) {
		// this.loadStorage();
	}
	data:string=""
	encodedData:String = "";
	
	ngOnInit() {
	}
	
	ionViewWillEnter() {
		this.checkIfAuthenticated();
	}
	checkIfAuthenticated() {
		this.loaderService.showLoader();
		this.isLoggedIn$ = this.authService.isLoggedIn;
		this.authService.hasToken().then(response => {
			if(response === true){
				this.dataService.getMyDetails().subscribe(
					(res:any)=> {
						this.points = res[0][0].currentBalance;
						this.data = res[1].customerKey;
						this.generateQr();

						
					},(err) => {
						this.loaderService.hideLoader();
					}
				)
			}
			else{
				this.loaderService.createToast("You are not logged in. Please complete login.", 401, "bottom");
				this.router.navigate(['me/login']);
			}
		});
		this.loaderService.hideLoader();
	}

	// getWalletDetails() {
	// 	this.dataService.getWalletDetails().subscribe(
	// 		(res:any)=>{
	// 			this.points = res.body[0].currentBalance;
	// 		},(err) => {
	// 		}
	// 	);
	// }

	// getProfileDetails() {
	// 	this.dataService.getProfile().subscribe(
	// 		(res:any)=>{
	// 			this.data = res.customerKey;
	// 			this.generateQr();
	// 		},(err) => {
	// 	});
	// }
	generateQr() {
		this.encodedData = JSON.stringify(this.data);
	}

	
}
