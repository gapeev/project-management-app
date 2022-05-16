import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteUserPending, signOut } from '@store/actions/user.actions';
import { selectIsUserAuth } from '@store/selectors/user.selectors';
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {
  public get isUserAuth(): Observable<boolean> {
    return this.store.select(selectIsUserAuth);
  }

  public signOut(): void {
    this.store.dispatch(signOut());
    this.router.navigateByUrl('/auth/sign-in');
  }

  public deleteUser(): void {
    this.store.dispatch(deleteUserPending());
  }

  constructor(private store: Store, private router: Router, private viewportScroller: ViewportScroller) {}

  public scrollTo() {
    this.viewportScroller.scrollToAnchor('team-page');

  }
}
