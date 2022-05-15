import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { signInFailure, signInPending } from '@store/actions/user.actions';
import { selectIsUserPending } from '@store/selectors/user.selectors';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
})
export class SignInPageComponent implements OnInit {
  public signInForm!: FormGroup;

  public isSubmitting!: boolean;

  public ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
    this.isSubmitting = false;
  }

  public get login(): AbstractControl | null {
    return this.signInForm.get('login');
  }

  public get password(): AbstractControl | null {
    return this.signInForm.get('password');
  }

  public onSubmit(): void {
    this.isSubmitting = true;
    this.store.dispatch(signInPending({ req: this.signInForm.value }));
  }

  public onErrorConfirm(): void {
    this.isSubmitting = false;
    this.store.dispatch(signInFailure());
  }

  constructor(private formBuilder: FormBuilder, private store: Store) {}
}
