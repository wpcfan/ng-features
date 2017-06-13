import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, Validators, Validator, ValidatorFn } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/of";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/observable/combineLatest";
import '../../utils/debug';

import {
  getProvinces,
  getCitiesByProvince,
  getAreasByCity,
  isCityInProvince
} from "../../utils/area";

import { Address } from "../../domain";

@Component({
  selector: 'app-model-driven',
  templateUrl: './model-driven.component.html',
  styleUrls: ['./model-driven.component.css']
})
export class ModelDrivenComponent implements OnInit {

  user: FormGroup;
  provinces: string[];
  cities$: Observable<string[]>;
  areas$: Observable<string[]>;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // 初始化表单
    this.user = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      repeat: ['', Validators.required],
      addrs: this.fb.array([])
    }, {validator: this.validateEqual('password', 'repeat')});
    // // 初始化省份数组
    this.provinces = getProvinces();
    // // 省份的选择变化流
    // const province$ = this.user.get('addrs').get('address').get('province').valueChanges;
    // // 城市的选择变化流
    // const city$ = this.user.get('addrs').get('address').get('city').valueChanges;
    // // 根据省份的选择得到城市列表
    // this.cities$ = province$.mergeMap(province => Observable.of(getCitiesByProvince(province)));
    // // 根据省份和城市的选择得到地区列表
    // this.areas$ = Observable
    //   .combineLatest(province$, city$, (p, c) => Object.assign({}, {province: p, city: c}))
    //   .mergeMap(a => Observable.of(getAreasByCity(a.province, a.city)));
  }

  validateEqual(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
    return (group: FormGroup): {[key: string]: any} => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
        return {
          validateEqual: true
        };
      }
      return null;
    }
  }

  onSubmit({value, valid}){
    if(!valid) return;
    console.log(JSON.stringify(value))
  }

  addAddr(): void {
    (<FormArray>this.user.controls['addrs']).push(this.createAddrItem());
  }

  private createAddrItem(): FormGroup {
    return this.fb.group({
      province: [],
      city: [],
      area: [],
      street: []
    })
  }
}
