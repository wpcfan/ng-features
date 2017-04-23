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
    email: 'wang@163.com',
    password: '',
    repeat: '',
    address: {
      province: '',
      city: '',
      area: '',
      addr: ''
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
  }

  onCityChange(){
    this.areas = getAreasByCity(this.user.address.province, this.user.address.city);
  }
}