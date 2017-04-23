import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormHomeComponent } from './form-home/form-home.component';

const routes: Routes = [
  { path: 'forms', component: FormHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormDemoRoutingModule {}
