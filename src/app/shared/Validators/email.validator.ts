import { AbstractControl } from '@angular/forms';

export function EmailValidator(control: AbstractControl): { [key: string]: boolean; } | null
{
  const email = control.get('email');
  const verifyEmail = control.get('verifyEmail');

  if (email.pristine || verifyEmail.pristine)
  {
    return null;
  }

  return email && verifyEmail && email.value !== verifyEmail.value ? { misMatch: true } : null;
}
