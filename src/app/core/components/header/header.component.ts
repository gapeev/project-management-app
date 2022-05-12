import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CreateBoardComponent } from '@shared/components/create-board/create-board.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLangToggle = false;
  isPageScrolled = false;
  headerClassList: string[] = ['header'];

  constructor(private translate: TranslateService, private dialog: MatDialog) {}

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

  getLang() {
    return this.isLangToggle ? 'RU' : 'EN';
  }

  handleChange() {
    const lang = this.isLangToggle ? 'ru' : 'en';
    this.translate.use(lang);
  }
}
