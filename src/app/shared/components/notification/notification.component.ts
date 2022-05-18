import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, take, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
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
          this.translate
            .get([errorMessage, 'BACKEND.CLOSE'])
            .pipe(take(1))
            .subscribe((data) => {
              const [errorMessage, close] = Object.values(data);
              const snackBarRef: MatSnackBarRef<TextOnlySnackBar> = this.matSnackBar.open(
                errorMessage,
                close
              );
              snackBarRef
                .onAction()
                .pipe(
                  tap(() => {
                    this.confirm.emit();
                    this.store.dispatch(clearErrorMessage());
                  })
                )
                .subscribe();
            });
        })
      )
      .subscribe();
  }

  public ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }

  private subscription$!: Subscription;

  constructor(
    private matSnackBar: MatSnackBar,
    private store: Store,
    private readonly translate: TranslateService
  ) {}
}
