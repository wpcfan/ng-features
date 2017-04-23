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
    // 控件自身值
    let self = c.value;

    // 要对比的值，也就是在 appRepeatValidator=“ctrlname” 的那个控件的值
    let target = c.root.get(this.validateEqual);

    // 不反向查询且值不相等
    if (target && self !== target.value && !this.isReverse) {
      return {
        validateEqual: false
      }
    }

    // 反向查询且值相等
    if (target && self === target.value && this.isReverse) {
        delete target.errors['validateEqual'];
        if (!Object.keys(target.errors).length) target.setErrors(null);
    }

    // 反向查询且值不相等
    if (target && self !== target.value && this.isReverse) {
        target.setErrors({
            validateEqual: false
        })
    }

    return null;
  }
}
