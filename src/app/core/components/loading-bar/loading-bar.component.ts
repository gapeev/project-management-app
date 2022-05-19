import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsBoardPending } from '@store/selectors/board.selectors';
import { selectIsUserPending } from '@store/selectors/user.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss'],
})
export class LoadingBarComponent implements OnInit {
  public isUserPending!: Observable<boolean>;

  public isBoardPending!: Observable<boolean>;

  public ngOnInit(): void {
    this.isUserPending = this.store.select(selectIsUserPending);
    this.isBoardPending = this.store.select(selectIsBoardPending);
  }

  constructor(private store: Store) {}
}
