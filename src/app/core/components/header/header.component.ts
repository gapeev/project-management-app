import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLangToggle = false;
  isPageScrolled = false;
  headerClassList: string[] = ['header'];

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        if (!this.headerClassList.includes('scrolled')) this.headerClassList.push('scrolled');
      } else {
        if (this.headerClassList.includes('scrolled')) this.headerClassList.pop();
      }
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
