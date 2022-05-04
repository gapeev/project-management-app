import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, take, tap } from 'rxjs';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { clearErrorMessage } from '@store/actions/error.actions';
import { selectError } from '@store/selectors/error.selectors';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit, OnDestroy {
  @Output() public confirm: EventEmitter<void> = new EventEmitter<void>();

  public ngOnInit(): void {
    this.subscription$ = this.store
      .select(selectError)
      .pipe(
        tap((errorMessage) => {
          if (!errorMessage) {
            return;
          }
          const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.matSnackBar.open(
            errorMessage,
            'Close'
          );
          snackBarRef
            .onAction()
            .pipe(
              take(1),
              tap(() => {
                this.confirm.emit();
                this.store.dispatch(clearErrorMessage());
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private subscription$!: Subscription;

  constructor(private matSnackBar: MatSnackBar, private store: Store) {}
}
