import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { selectIsUserAuth } from '@store/selectors/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input()
  public sidenav!: MatSidenav;

  public authLinks = [
    { href: '/welcome', icon: 'home_app_logo', text: 'Welcome', hasDivider: true },
    { href: '/boards', icon: 'grid_view', text: 'Boards', hasDivider: true },
    { href: '/user/update', icon: 'person', text: 'Edit profile', hasDivider: false },
  ];

  public nonAuthLinks = [
    { href: '/welcome', icon: 'home_app_logo', text: 'Welcome', hasDivider: true },
    { href: '/auth/sign-in', icon: 'login', text: 'Log In', hasDivider: false },
    { href: '/auth/sign-up', icon: 'how_to_reg', text: 'Sign Up', hasDivider: false },
  ];

  public get isAuth(): Observable<boolean> {
    return this.store.select(selectIsUserAuth);
  }

  constructor(private store: Store) {}
}
