import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController, AngularDelegate } from '@ionic/angular';
import { MustMatch } from '../_helpers/must-match.validator';
import { CityAutoCompleteService } from '../city-autocomplete.service';
import { ProvinceAutoCompleteService } from '../province-autocomplete.service';
import { AutoCompleteOptions } from 'ionic4-auto-complete';
@Component({
	selector: 'sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
	stepOne:FormGroup;
	stepTwo:FormGroup;
	stepThree:FormGroup;
	holdForm:boolean = false;
	formInputCount:Number = 0;
	totalCount:number = 0;
	formLoaded:boolean = false;
	currentStep:number = 1;
	cityData:any;
	provinceData:any;
	public cityOptions:AutoCompleteOptions;
	public provinceOptions:AutoCompleteOptions;

	constructor(
		private stepOneBuilder: FormBuilder,
		private stepTwoBuilder: FormBuilder,
		private stepThreeBuilder: FormBuilder,
		public alertController: AlertController,
		public dataService: DataService,
		public cityProvider: CityAutoCompleteService,
		public provinceProvider: ProvinceAutoCompleteService,
		public router: Router) {
		
		this.initializeFormBuilder();
		this.initializeCityAutoComplete();
		this.initializeProvinceAutoComplete();
	
		
	}
	initializeFormBuilder() {
		this.stepOne = this.stepOneBuilder.group({
			firstName: new FormControl('Bervyn', [
				Validators.required
			]),
			lastName: new FormControl('Co', [
				Validators.required
			]),
			birthday: new FormControl('06/10/1993', [
				Validators.required
			]),
			gender: new FormControl('Male', [
				Validators.required
			]), 
			
		});

		this.stepTwo = this.stepTwoBuilder.group({
			email: new FormControl('bervynco@gmail.com', [
				Validators.required
			]),
			password: new FormControl('Password01!', [
				Validators.required,
				Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')
			]),
			confirmPassword: new FormControl('Password01!', [
				Validators.required
			])
		},{
			validator: MustMatch('password', 'confirmPassword')
		});

		this.stepThree = this.stepThreeBuilder.group({
			province: new FormControl('', [
				Validators.required
			]),
			city: new FormControl('', [
				Validators.required
			]),
			contactNumber: new FormControl('9178173687', [
				Validators.required
			]),
			
		});
		this.formInputCount = Object.keys(this.stepOne.controls).length + Object.keys(this.stepTwo.controls).length + Object.keys(this.stepThree.controls).length;
		this.formLoaded = true;
	}

	initializeCityAutoComplete() {
		this.cityOptions = new AutoCompleteOptions();
		
		this.cityOptions.autocomplete = 'on';
		// this.options.cancelButtonIcon = 'assets/icons/clear.svg';
		// this.options.clearIcon = 'assets/icons/clear.svg';
		this.cityOptions.debounce = 750;
		this.cityOptions.placeholder = 'Search for city..';
		// this.options.searchIcon = '../../assets/svg/search.svg';
		this.cityOptions.type = 'search';
		
	}

	initializeProvinceAutoComplete() {
		this.provinceOptions = new AutoCompleteOptions();
		this.provinceOptions.autocomplete = 'on';
		// this.options.cancelButtonIcon = 'assets/icons/clear.svg';
		// this.options.clearIcon = 'assets/icons/clear.svg';
		this.provinceOptions.debounce = 750;
		this.provinceOptions.placeholder = 'Search for province..';
		// this.options.searchIcon = '../../assets/svg/search.svg';
		this.provinceOptions.type = 'search';
	}
	// get formValidator() {
	// 	return this.registerForm.controls; 
	// }

	ionViewWillEnter() {
		this.currentStep = 1;
	}

	register() {
		this.holdForm = true;
		let details = [];
		let consolidatedDetails = {};
		details.push(this.stepOne.value);
		details.push(this.stepTwo.value);
		details.push(this.stepThree.value);
		consolidatedDetails = this.flattenObject(details);
		this.dataService.registerUser(consolidatedDetails).subscribe(
			(res:any)=>{
				console.log(res);
				// this.createToast("Reset complete", 200, "bottom");
				this.router.navigate(['/me']);
				// this.hideLoader();
			},(err) => {
				// this.hideLoader();
			}
		);
		// let user = this.registerForm.value;
		// console.log(user);
		// this.dataService.registerUser() {

		// }
		///api/v1/users/register
	}

	next(step) {
		if(this.currentStep < step){
			switch(step){
				case 2:
					this.totalCount = this.totalCount + (Object.keys(this.stepOne.controls).length);
					break;
				case 3:
					this.totalCount = this.totalCount + (Object.keys(this.stepTwo.controls).length);
					break;
			}
		}
		
		this.currentStep = step;
	}
	ngOnInit() {}
	selectedProvince(event){
		this.cityProvider.setFilter(this.stepThree.value.province);
	}

	flattenObject = function(ob) {
		var toReturn = {};
		
		for (var i in ob) {
			if (!ob.hasOwnProperty(i)) continue;
			
			if ((typeof ob[i]) == 'object') {
				var flatObject = this.flattenObject(ob[i]);
				for (var x in flatObject) {
					if (!flatObject.hasOwnProperty(x)) continue;
					
					toReturn[x] = flatObject[x];
				}
			} else {
				toReturn[i] = ob[i];
			}
		}
		return toReturn;
	};
}
