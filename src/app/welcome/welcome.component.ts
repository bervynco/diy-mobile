import { Component, OnInit, ViewChild } from '@angular/core';
import {IonSlides} from '@ionic/angular';
@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
	// @ViewChild(IonSlides) slides: IonSlides;
	slideOpts = {
		initialSlide: 1,
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
		}
	};
	constructor() { }

	ngOnInit() {}
	//Move to Next slide
	slideNext(object, slideView) {
		slideView.slideNext(500).then(() => {
			this.checkIfNavDisabled(object, slideView);
		});
	}

	//Move to previous slide
	slidePrev(object, slideView) {
		slideView.slidePrev(500).then(() => {
			this.checkIfNavDisabled(object, slideView);
		});
	}

	//Method called when slide is changed by drag or navigation
	SlideDidChange(object, slideView) {
		this.checkIfNavDisabled(object, slideView);
	}

	//Call methods to check if slide is first or last to enable disbale navigation  
	checkIfNavDisabled(object, slideView) {
		this.checkisBeginning(object, slideView);
		this.checkisEnd(object, slideView);
	}

	checkisBeginning(object, slideView) {
		slideView.isBeginning().then((istrue) => {
			object.isBeginningSlide = istrue;
		});
	}
	checkisEnd(object, slideView) {
		slideView.isEnd().then((istrue) => {
			object.isEndSlide = istrue;
		});
	}
}
