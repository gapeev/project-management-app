import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectBoards, selectIsBoardPending } from '@store/selectors/board.selectors';
import { Board } from '@shared/models/board.model';
import { deleteBoard, fetchBoards } from '@store/actions/board.actions';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '@shared/components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-boards-page',
  templateUrl: './boards-page.component.html',
  styleUrls: ['./boards-page.component.scss'],
})
export class BoardsPageComponent implements OnInit {
  public boards$!: Observable<readonly Board[]>;

  public ngOnInit(): void {
    this.boards$ = this.store.select(selectBoards);
    this.store.dispatch(fetchBoards());
  }

  public deleteBoard(boardId: string, boardTitle: string): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '400px',
      data: { target: boardTitle, type: 'board' },
    });

    dialogRef.afterClosed().subscribe(({ isConfirmed }) => {
      if (!isConfirmed) {
        return;
      }
      this.store.dispatch(deleteBoard({ boardId }));
    });
  }

  constructor(private store: Store, private dialog: MatDialog) {}
}
