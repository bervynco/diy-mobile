import { Injectable } from '@angular/core';
import {AutoCompleteService} from 'ionic4-auto-complete';
import  *  as  provinceData  from  './../assets/data/provinces.json';
@Injectable({
  providedIn: 'root'
})
export class ProvinceAutoCompleteService {
	labelAttribute = 'name';
	data:any;
	constructor() { }
	getProvinceData (){
		this.data = provinceData;
		this.data = this.data.default;
	}
	getResults(keyword) {
		this.getProvinceData();
		keyword = keyword.toLowerCase();

		return this.data.filter(
			(object) => {
				const value = object[this.labelAttribute].toLowerCase();
				return value.includes(keyword);
			}
		);
		
	}
}
