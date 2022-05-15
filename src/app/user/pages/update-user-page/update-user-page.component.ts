import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription, take, tap } from 'rxjs';
import { updateUserFailure, updateUserPending } from '@store/actions/user.actions';
import { selectIsUserPending, selectUser } from '@store/selectors/user.selectors';

@Component({
  selector: 'app-update-user-page',
  templateUrl: './update-user-page.component.html',
  styleUrls: ['./update-user-page.component.scss'],
})
export class UpdateUserPageComponent implements OnInit, OnDestroy {
  public updateUserForm!: FormGroup;

  public isSubmitting!: boolean;

  public ngOnInit(): void {
    this.store
      .select(selectUser)
      .pipe(
        take(1),
        tap((user) => {
          const { name, login } = user;
          this.updateUserForm = this.formBuilder.group({
            name: [name, [Validators.required]],
            login: [login, [Validators.required]],
            password: ['', [Validators.required]],
          });
        })
      )
      .subscribe();

    this.subscription$ = this.store
      .select(selectIsUserPending)
      .pipe(tap((isPending) => (this.isSubmitting = isPending)))
      .subscribe();

    this.isSubmitting = false;
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  public get name(): AbstractControl | null {
    return this.updateUserForm.get('name');
  }

  public get login(): AbstractControl | null {
    return this.updateUserForm.get('login');
  }

  public get password(): AbstractControl | null {
    return this.updateUserForm.get('password');
  }

  public onSubmit(): void {
    this.updateUserForm.markAsPristine();
    this.store.dispatch(updateUserPending({ req: this.updateUserForm.value }));
  }

  public onErrorConfirm(): void {
    this.isSubmitting = false;
    this.updateUserForm.markAsDirty();
    this.store.dispatch(updateUserFailure());
  }

  private subscription$!: Subscription;

  constructor(private formBuilder: FormBuilder, private store: Store) {}
}
