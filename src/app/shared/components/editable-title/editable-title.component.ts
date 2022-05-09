import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-editable-title',
  templateUrl: './editable-title.component.html',
  styleUrls: ['./editable-title.component.scss'],
})
export class EditableTitleComponent implements OnInit {
  @Input() public content!: string;

  @Output() public save: EventEmitter<string> = new EventEmitter<string>();

  public editForm!: FormGroup;

  public isEditable!: boolean;

  public ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      title: [this.content, [Validators.required]],
    });
    this.isEditable = false;
  }

  public get title(): AbstractControl | null {
    return this.editForm.get('title');
  }

  public onCancel(): void {
    this.editForm.reset({ title: this.content });
    this.isEditable = false;
  }

  public onSubmit(): void {
    const { title } = this.editForm.value;
    this.save.emit(title);
    this.isEditable = false;
  }

  constructor(private formBuilder: FormBuilder) {}
}
