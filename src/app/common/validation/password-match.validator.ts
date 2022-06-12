import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(controlName1: string, controlName2: string): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    if (!formGroup.get(controlName1).hasError("minlength")) {
      if (formGroup.get(controlName1).value !== formGroup.get(controlName2).value) {
        return { "doesntMatch": true };
      }
    }
    return null;
  };
}
