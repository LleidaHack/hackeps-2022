import { FormControl } from '@angular/forms';

export class UrlValidator {

  static url(control: FormControl): { [key: string]: any } {
    if (!control.value || control.value === '') {
      return null;
    }

    const reg = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    if (!control.value.match(reg)) {
      return { isValid: false };
    }
    return null;
  }
}
