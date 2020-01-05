import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  	selector: 'app-intro',
  	templateUrl: './intro.component.html',
  	styleUrls: ['./intro.component.css'],
})
export class IntroComponent implements OnInit {
	content:HTMLIonTabBarElement;
	introContent:Array<Object>;
	currentContent:Object;
	shouldLoad:Boolean = false;
  	constructor(private router: Router, private storage: Storage) {
	}

	ngOnInit() {
		this.checkIfFirstLoad();
	}
	checkIfFirstLoad() {
		this.storage.get('first_time').then((val) => {
			if (val === null) {
				this.populateIntroContent();
			}
			else {
				this.router.navigate(['home']);
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
		this.content = document.querySelector('ion-tab-bar');
		this.content.style.display = "none";
		document.querySelector('ion-slide').style.height="100%";
	}
	ionViewWillLeave() {
		this.content.style.display = "flex";
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
}
