import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
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
	
	data:any = {
		'userId': 41
	}
	encodedData:String = "";
	ngOnInit() {
		this.generateQr();
	}

  	ionViewDidLoad(){
	}
	generateQr() {
		this.encodedData = JSON.stringify(this.data);
	}
}
