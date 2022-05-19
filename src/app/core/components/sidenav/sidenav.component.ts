import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
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
    { href: '/welcome', icon: 'home_app_logo', text: '', hasDivider: true },
    { href: '/boards', icon: 'grid_view', text: '', hasDivider: true },
    { href: '/user/update', icon: 'person', text: '', hasDivider: false },
  ];

  public nonAuthLinks = [
    { href: '/welcome', icon: 'home_app_logo', text: '', hasDivider: true },
    { href: '/auth/sign-in', icon: 'login', text: '', hasDivider: false },
    { href: '/auth/sign-up', icon: 'how_to_reg', text: '', hasDivider: false },
  ];

  public get isAuth(): Observable<boolean> {
    return this.store.select(selectIsUserAuth);
  }

  constructor(private store: Store, private translate: TranslateService) {
    this.translate.stream('HEADER.BUTTONS.WELCOME').subscribe((res) => {
      this.authLinks[0].text = res;
      this.nonAuthLinks[0].text = res;
    });
    this.translate.stream('HEADER.BUTTONS.BOARDS').subscribe((res) => {
      this.authLinks[1].text = res;
    });
    this.translate.stream('HEADER.BUTTONS.EDIT').subscribe((res) => {
      this.authLinks[2].text = res;
    });
    this.translate.stream('HEADER.BUTTONS.LOG-IN').subscribe((res) => {
      this.nonAuthLinks[1].text = res;
    });
    this.translate.stream('HEADER.BUTTONS.SIGN-UP').subscribe((res) => {
      this.nonAuthLinks[2].text = res;
    });
  }
}
