import { Directive, ElementRef, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appStructural]'
})
export class StructuralDirective {

  constructor(
    el: ElementRef, 
    private tr: TemplateRef<any>, 
    private view: ViewContainerRef) { 
    console.log(el.nativeElement);
    console.log(this.tr)
  }

}
