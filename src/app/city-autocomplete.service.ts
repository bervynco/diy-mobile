import { Injectable } from '@angular/core';
import {AutoCompleteService} from 'ionic4-auto-complete';
import  *  as  cityData  from  './../assets/data/cities.json';
@Injectable({
  providedIn: 'root'
})
export class CityAutocompleteService {
	labelAttribute = 'name';
	data:any;
	constructor() { }
	getCityData (){
		this.data = cityData;
		this.data = this.data.default;
	}
	getResults(keyword) {
		this.getCityData();
		keyword = keyword.toLowerCase();

		return this.data.filter(
			(object) => {
				const value = object[this.labelAttribute].toLowerCase();
				return value.includes(keyword);
			}
		);
		
	}
}
