import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { deleteUserPending, signOut } from '@store/actions/user.actions';
import { CreateBoardComponent } from '@shared/components/create-board/create-board.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { selectIsUserAuth, selectUserLogin } from '@store/selectors/user.selectors';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLangToggle = false;
  isPageScrolled = false;
  headerClassList: string[] = ['header'];

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        if (!this.headerClassList.includes('scrolled')) this.headerClassList.push('scrolled');
      } else {
        if (this.headerClassList.includes('scrolled')) this.headerClassList.pop();
      }
    });
  }

  public createBoard(): void {
    const dialogRef = this.dialog.open(CreateBoardComponent, {
      width: '400px',
    });
  }

  public logout(): void {
    this.store.dispatch(signOut());
  }

  public deleteUser(username: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { target: username, type: 'user' },
    });

    dialogRef.afterClosed().subscribe(({ isConfirmed }) => {
      if (!isConfirmed) {
        return;
      }
      this.store.dispatch(deleteUserPending());
    });
  }

  public get isAuth(): Observable<boolean> {
    return this.store.select(selectIsUserAuth);
  }

  public get username(): Observable<string> {
    return this.store.select(selectUserLogin);
  }

  getLang() {
    return this.isLangToggle ? 'RU' : 'EN';
  }

  handleChange() {
    const lang = this.isLangToggle ? 'ru' : 'en';
    this.translate.use(lang);
  }
}
