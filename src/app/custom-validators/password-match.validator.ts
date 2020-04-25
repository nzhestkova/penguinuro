import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatch(): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    if (!formGroup.get("password").hasError("minlength")) {
      if (formGroup.get("password").value !== formGroup.get("passwordAgain").value) {
        return { "doesntMatch": true };
      }
    }
    return null;
  };
}
