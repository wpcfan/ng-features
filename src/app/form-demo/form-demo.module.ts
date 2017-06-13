import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ModelDrivenComponent } from './model-driven/model-driven.component';
import { FormHomeComponent } from './form-home/form-home.component';
import { FormDemoRoutingModule } from './form-demo-routing.module';
import { RepeatValidatorDirective } from './repeat-validator.directive';
import { StructuralDirective } from './structural.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormDemoRoutingModule
  ],
  exports: [FormHomeComponent],
  declarations: [
    TemplateDrivenComponent,
    ModelDrivenComponent,
    FormHomeComponent,
    RepeatValidatorDirective,
    StructuralDirective
    ]
})
export class FormDemoModule { }
