import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

@Component({
	selector: 'app-scan',
	templateUrl: './scan.component.html',
	styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {
	options: BarcodeScannerOptions;
	scannedData: any;
	constructor(
		public barcodeCtrl: BarcodeScanner,
		private toastController: ToastController,
		public platform:Platform,
	) { 
	}
	ionViewDidEnter() {
		this.initializeScanner();
	}
	initializeScanner() {
		const options: BarcodeScannerOptions = {
			preferFrontCamera: true,
			showFlipCameraButton: true,
			showTorchButton: true,
			torchOn: false,
			prompt: 'Place a barcode inside the scan area',
			resultDisplayDuration: 1500,
			// 'CODABAR' | 'ITF' | 'RSS14' | 'RSS_EXPANDED' | 'PDF_417' | 'AZTEC' | 'MSI
			formats: 'QR_CODE,PDF_417,DATA_MATRIX,UPC_E,UPC_A,EAN_8,EAN_13,CODE_128,CODE_39,CODE_93,CODABAR,ITF,RSS14,RSS_EXPANDED,PDF_417,AZTEC,MSI',
			orientation: 'portrait',
		};
	
		this.barcodeCtrl.scan(options).then(barcodeData => {
			this.createToast(JSON.stringify(barcodeData), 200, "bottom");
			console.log('Barcode data', barcodeData);
			this.scannedData = barcodeData;
	
		}).catch(err => {
		 	 console.log('Error', err);
		});
	}

	ngOnInit() {
		
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

// import { Component, OnInit } from '@angular/core';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
// import { AlertController, ToastController, Platform } from '@ionic/angular';
// import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';

// @Component({
// 	selector: 'app-scan',
// 	templateUrl: './scan.component.html',
// 	styleUrls: ['./scan.component.css'],
// })
// export class ScanComponent implements OnInit {

// 	constructor(
// 		private scanner: QRScanner, 
// 		private toastController: ToastController,
// 		public platform:Platform,
// 	) { 
// 		platform.ready().then(()=>{
// 			this.launchQrScanner();
// 		  })
// 	}

// 	ngOnInit() {
// 	}

// 	launchQrScanner() {
// 		this.scanner.prepare().then((status: QRScannerStatus) => {
// 			if (status.authorized) {
// 			// camera permission was granted
// 				this.createToast("Authorized", 200, 'bottom');
		
// 				// start scanning

// 				let scanSub = this.scanner.scan().subscribe((text: string) => {
// 					console.log('Scanned something', text);
// 					alert(text);
// 					// this.triggerEarn();
// 					this.scanner.hide(); // hide camera preview
// 					scanSub.unsubscribe(); // stop scanning
// 				});
// 				this.scanner.resumePreview();

// 					// show camera preview
// 					this.scanner.show()
// 					.then((data : QRScannerStatus)=> { 
// 						alert(data.showing);
// 					},err => {
// 						alert(err);
// 					}
// 				);
	
// 			} else if (status.denied) {
// 				this.createToast("Denied Permanently", 500, 'bottom');
// 				this.scanner.openSettings();
// 			} else {
// 				this.createToast("Denied Temporarily", 500, 'bottom');
// 			}
// 		})
// 		.catch((e: any) => console.log(e));
// 	}
// 	triggerEarn() {

// 	}
// 	async createToast(message, code, position){
// 		let color = "";
// 		if(code == 200)
// 			color = "primary";
// 		else
// 			color = "danger";

// 		const toast = await this.toastController.create({
// 			color: color,
// 	        duration: 2000,
// 	        message: message,
// 			showCloseButton: true,
// 			animated: true,
// 			position: position
// 		});
// 		toast.present();
// 	}
// }
