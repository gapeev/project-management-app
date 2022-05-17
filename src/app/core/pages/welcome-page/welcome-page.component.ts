import { Component } from '@angular/core';
import { ViewportScroller } from "@angular/common";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss'],
})
export class WelcomePageComponent {

  constructor(private viewportScroller: ViewportScroller) {}

  public scrollTo() {
    this.viewportScroller.scrollToAnchor('team-page');

  }
}
