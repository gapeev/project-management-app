import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signUpFailure, signUpPending } from '@store/actions/user.actions';
import { selectIsUserPending } from '@store/selectors/user.selectors';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  public signUpForm!: FormGroup;

  public isSubmitting!: boolean;

  public ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.isSubmitting = false;
  }

  public get isPending(): Observable<boolean> {
    return this.store.select(selectIsUserPending);
  }

  public get name(): AbstractControl | null {
    return this.signUpForm.get('name');
  }

  public get login(): AbstractControl | null {
    return this.signUpForm.get('login');
  }

  public get password(): AbstractControl | null {
    return this.signUpForm.get('password');
  }

  public onSubmit(): void {
    this.isSubmitting = true;
    this.store.dispatch(signUpPending({ req: this.signUpForm.value }));
  }

  public onErrorConfirm(): void {
    this.isSubmitting = false;
    this.store.dispatch(signUpFailure());
  }

  constructor(private formBuilder: FormBuilder, private store: Store) {}
}
