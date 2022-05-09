import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { createBoard } from '@store/actions/board.actions';

@Component({
  selector: 'app-create-board',
  templateUrl: './create-board.component.html',
  styleUrls: ['./create-board.component.scss'],
})
export class CreateBoardComponent implements OnInit {
  public createBoardForm!: FormGroup;

  public ngOnInit(): void {
    this.createBoardForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  public get title(): AbstractControl | null {
    return this.createBoardForm.get('title');
  }

  public get description(): AbstractControl | null {
    return this.createBoardForm.get('description');
  }

  public onCancelClick(): void {
    this.dialogRef.close();
  }

  public onCreateClick(): void {
    this.dialogRef.close();
    this.store.dispatch(createBoard(this.createBoardForm.value));
    this.router.navigateByUrl('/boards');
  }

  constructor(
    private dialogRef: MatDialogRef<CreateBoardComponent>,
    private store: Store,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}
}
