import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  	selector: 'app-home',
  	templateUrl: './home.component.html',
  	styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
	content:HTMLIonTabBarElement;
	introContent:Array<Object>;
	currentContent:Object;
	shouldLoad:Boolean = false;
	slideOpts = {
		slidesPerView: 3,
		coverflowEffect: {
			rotate: 50,
			stretch: 0,
			depth: 100,
			modifier: 1,
			slideShadows: true
		}

	}
  	constructor(private router: Router, private storage: Storage) {
	}

	ngOnInit() {
		
	}

	checkIfFirstLoad() {
		// this.storage.remove('first_time');
		this.storage.get('first_time').then((val) => {
			if (val === null) {
				this.populateIntroContent();
				
			}
		});
	}
	populateIntroContent() {
		this.introContent = [
			{
				'title': "Go Digital",
				"subtitle": "Access your membership information and manage your points"
			},
			{
				"title": "View Products",
				"subtitle": "Check out our latest products or get updated with our hottest items"
			},
			{
				"title": "Stay Updated",
				"subtitle": "Check out any changes or hot offers in our very own news feed"
			},
			{
				"title": "Locate Us",
				"subtitle": "locate and get exclusive rewards in any of our DIY branches"
			}
		];
		this.currentContent = this.introContent[0];
		this.shouldLoad = true;
	}
	
	ionViewWillEnter() {
		this.checkIfFirstLoad();
		// this.content = document.querySelector('ion-tab-bar');
		// this.content.style.display = "none";
		// document.querySelector('ion-slide').style.height="100%";
	}
	ionViewWillLeave() {
		// this.content.style.display = "flex";
	}

	SlideDidChange(slide, index){
		this.shouldLoad = false;
		slide.getActiveIndex().then(index => {
			this.currentContent = this.introContent[index];
			this.shouldLoad = true;
		 });
		// console.log(index);
		// this.currentContent = this.introContent[index];
		// console.log(this.currentContent);
		// this.router.navigate(['me']);
	}
	completeIntro() {
		this.storage.set('first_time', 'done');
		this.router.navigate(['home']);
	}

	getDataUri(url, callback) {
		var canvas = document.createElement("canvas");
		// canvas = canvas.getContext("2d");
	}

	getImage() {
		
	}
}
