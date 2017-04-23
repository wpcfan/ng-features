import { Directive, forwardRef, Attribute } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';

@Directive({
  selector: '[appRepeatValidator][ngModel], [appRepeatValidator][formControl], [appRepeatValidator][formControlName]',
  providers: [
    { 
      provide: NG_VALIDATORS, 
      useExisting: forwardRef(()=>RepeatValidatorDirective), 
      multi: true 
    }
  ]
})
export class RepeatValidatorDirective implements Validator{
  validator: Function;
  constructor(
    @Attribute('appRepeatValidator') public validateEqual: string,
    @Attribute('reverse') public reverse: string) { }
  
  private get isReverse() {
    if (!this.reverse) return false;
    return this.reverse === 'true' ? true: false;
  }

  validate(c: AbstractControl): { [key: string]: any } {
    // self value
    let self = c.value;

    // control vlaue
    let target = c.root.get(this.validateEqual);

    // value not equal
    if (target && self !== target.value && !this.isReverse) {
      return {
        validateEqual: false
      }
    }

    // value equal and reverse
    if (target && self === target.value && this.isReverse) {
        delete target.errors['validateEqual'];
        if (!Object.keys(target.errors).length) target.setErrors(null);
    }

    // value not equal and reverse
    if (target && self !== target.value && this.isReverse) {
        target.setErrors({
            validateEqual: false
        })
    }

    return null;
  }
}
