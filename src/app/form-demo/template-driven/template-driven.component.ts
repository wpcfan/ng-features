import { Component, OnInit } from '@angular/core';

import { User } from "../../domain";
import { getProvinces, getCitiesByProvince, getAreasByCity } from "../../utils/area";

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {

  user: User = {
    email: '',
    password: '',
    repeat: '',
    address: {
      province: '',
      city: '',
      area: '',
      street: ''
    }
  };

  provinces = getProvinces();
  cities = [];
  areas = [];

  constructor() { }

  ngOnInit() {}

  onProvinceChange(){
    this.cities = getCitiesByProvince(this.user.address.province);
    this.areas = [];
    this.user.address.area = '';
    this.user.address.city = '';
  }

  onCityChange(){
    this.areas = getAreasByCity(this.user.address.province, this.user.address.city);
    this.user.address.area = '';
  }

  onSubmit({value, valid}, event: Event){
    if(valid){
      console.log(value);
    }
    event.preventDefault();
  }
}
