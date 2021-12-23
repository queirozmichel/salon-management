import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidarCampo {
  static deveCoincidir(primeiraPalavra: string, segundaPalavra: string): any {
    return (group: AbstractControl) => {
      const formGroup = group as FormGroup;
      const control = formGroup.controls[primeiraPalavra];
      const matchingControl = formGroup.controls[segundaPalavra];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return null;
      }

      if (control.value != matchingControl.value) {
        matchingControl.setErrors({ deveCoincidir: true });
      } else {
        matchingControl.setErrors(null);
      }
      return null;
    };
  }
}
