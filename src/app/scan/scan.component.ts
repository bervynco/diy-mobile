import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, ToastController } from '@ionic/angular';
@Component({
	selector: 'app-scan',
	templateUrl: './scan.component.html',
	styleUrls: ['./scan.component.css'],
})
export class ScanComponent implements OnInit {

	constructor(private scanner: QRScanner, private toastController: ToastController) { }

	ngOnInit() {
		this.startScanner();
	}
	
	startScanner = () => {
		// Show scanner 

		const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
		rootElement.classList.add('qr-scanner-open');
		this.launchQrScanner();
	};
	
	closeScanner = () => {
			// Hide and unsubscribe from scanner
	
			const rootElement = <HTMLElement>document.getElementsByTagName('html')[0];
			rootElement.classList.remove('qr-scanner-open');
	};

	launchQrScanner() {
		this.scanner.prepare()
			.then((status: QRScannerStatus) => {
				if (status.authorized) {
				// camera permission was granted
				this.createToast("Authorized", 200, 'bottom');
		
				// start scanning
				let scanSub = this.scanner.scan().subscribe((text: string) => {
					this.scanner.show();
					this.createToast(text, 200, 'bottom');
					console.log('Scanned something', text);
					
					this.scanner.hide(); // hide camera preview
					scanSub.unsubscribe(); // stop scanning
				});
		
				} else if (status.denied) {
					this.createToast("Denied Permanently", 500, 'bottom');
					this.scanner.openSettings();
				// camera permission was permanently denied
				// you must use QRScanner.openSettings() method to guide the user to the settings page
				// then they can grant the permission from there
				} else {
					this.createToast("Denied Temporarily", 500, 'bottom');
				// permission was denied, but not permanently. You can ask for permission again at a later time.
				}
			})
			.catch((e: any) => this.createToast(e, 500, 'bottom'));
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
