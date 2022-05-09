import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLangToggle = false;
  isPageScrolled = false;
  headerClassList: string[] = ['header'];

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 0) {
        if (!this.headerClassList.includes('scrolled')) this.headerClassList.push('scrolled');
      } else {
        if (this.headerClassList.includes('scrolled')) this.headerClassList.pop();
      }
      console.log(this.headerClassList);
    });
  }

  getLang() {
    return this.isLangToggle ? 'RU' : 'EN';
  }
}
