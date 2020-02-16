import { Injectable } from '@angular/core';
import {AutoCompleteService} from 'ionic4-auto-complete';
import  *  as  cityData  from  './../assets/data/cities.json';
import  *  as  provinceData from  './../assets/data/provinces.json';
@Injectable({
  providedIn: 'root'
})
export class CityAutoCompleteService {
	labelAttribute = 'name';
	data:any;
	provinceData:any;
	region:string = "";
	regionKey:string = "";
	constructor() { }

	getProvinceEquivalent() {
		console.log("Province Equivalent");
		this.provinceData = provinceData;
		this.provinceData = this.provinceData.default.filter(
			(object) => {
				const value = object.name;
				return value.includes(this.region);
			}
		);
		this.regionKey = this.provinceData[0].key;
		this.getCityData();
	}
	setFilter(region) {
		this.region = region;
		this.getProvinceEquivalent();
	}
	getCityData (){
		this.data = cityData;
		this.data = this.data.default.filter(
			(object) => {
				const value = object.province;
				return value.includes(this.regionKey);
			}
		);
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
