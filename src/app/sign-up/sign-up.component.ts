import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,  Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { AlertController } from '@ionic/angular';

@Component({
	selector: 'sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
	registerForm:FormGroup;
	constructor(private formBuilder: FormBuilder, public alertController: AlertController, public Register: DataService) {
		this.registerForm = this.formBuilder.group({
			email: new FormControl('', [
				Validators.required
			]),
			password: new FormControl('', [
				Validators.required
			]),
			firstName: new FormControl('', [
				Validators.required
			]),
			lastName: new FormControl('', [
				Validators.required
			]),
			city: new FormControl('', [
				Validators.required
			]),
			contactNumber: new FormControl('', [
				Validators.required
			]),
			birthday: new FormControl('', [
				Validators.required
			])
		});
	}
	
	register() {
		///api/v1/users/register
	}
	ngOnInit() {}

}
