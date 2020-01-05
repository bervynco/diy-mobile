import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';
import { MustMatch } from '../_helpers/must-match.validator';
import {CityAutocompleteService} from '../city-autocomplete.service';
import {AutoCompleteOptions} from 'ionic4-auto-complete';
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
	public options:AutoCompleteOptions;

	constructor(
		private stepOneBuilder: FormBuilder,
		private stepTwoBuilder: FormBuilder,
		private stepThreeBuilder: FormBuilder,
		public alertController: AlertController,
		public dataService: DataService,
		public provider: CityAutocompleteService) {
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
			gender: new FormControl('male', [
				Validators.required
			]), 
			
		});

		this.stepTwo = this.stepTwoBuilder.group({
			email: new FormControl('bervyn_co2010@yahoo.com', [
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
			city: new FormControl('', [
				Validators.required
			]),
			contactNumber: new FormControl('', [
				Validators.required
			]),
			
		});

		this.options = new AutoCompleteOptions();

		this.options.autocomplete = 'on';
		// this.options.cancelButtonIcon = 'assets/icons/clear.svg';
		// this.options.clearIcon = 'assets/icons/clear.svg';
		this.options.debounce = 750;
		this.options.placeholder = 'Search for city..';
		// this.options.searchIcon = '../../assets/svg/search.svg';
		this.options.type = 'search';
	
		this.formInputCount = Object.keys(this.stepOne.controls).length + Object.keys(this.stepTwo.controls).length + Object.keys(this.stepThree.controls).length;
		this.formLoaded = true;
	}
	// get formValidator() {
	// 	return this.registerForm.controls; 
	// }

	ionViewWillEnter() {
		this.currentStep = 1;
	}

	register() {
		this.holdForm = true;
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

}
