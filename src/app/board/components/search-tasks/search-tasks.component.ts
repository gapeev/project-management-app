import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { TaskSearch } from '@shared/models/board.model';
import { getAllTasks } from '@store/actions/board.actions';
import { selectAllTasks, selectIsBoardPending } from '@store/selectors/board.selectors';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-tasks',
  templateUrl: './search-tasks.component.html',
  styleUrls: ['./search-tasks.component.scss'],
})
export class SearchTasksComponent implements OnInit, OnDestroy, AfterViewInit {
  public searchForm!: FormGroup;

  public tasks$!: Observable<TaskSearch[]>;

  public subscriptions$: Subscription[] = [];

  public displayedColumns: string[] = ['position', 'title', 'description', 'done', 'user'];

  public dataSource!: MatTableDataSource<TaskSearch>;

  @ViewChild(MatPaginator)
  public paginator!: MatPaginator;

  public ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      type: 'title',
      query: '',
    });

    this.tasks$ = this.store.select(selectAllTasks);

    this.subscriptions$.push(
      this.searchForm.valueChanges.subscribe(({ type, query }) => {
        this.dataSource.filterPredicate = (task: TaskSearch, query: string): boolean => {
          switch (type) {
            case 'title':
              return task.title.toLowerCase().includes(query.toLowerCase());
            case 'description':
              return task.description.toLowerCase().includes(query.toLowerCase());
            case 'user':
              return task.user.name.toLowerCase().includes(query.toLowerCase());
          }
          return false;
        };
        this.dataSource.filter = query;
      })
    );

    this.subscriptions$.push(
      this.store.select(selectAllTasks).subscribe((tasks) => {
        this.dataSource = new MatTableDataSource<TaskSearch>(tasks);
      })
    );

    this.store.dispatch(getAllTasks());
  }

  public ngAfterViewInit(): void {
    this.subscriptions$.push(
      this.store.select(selectAllTasks).subscribe((tasks) => {
        this.dataSource.paginator = this.paginator;
      })
    );
  }

  public getTableDataSource(tasks: TaskSearch[]): MatTableDataSource<TaskSearch> {
    return new MatTableDataSource<TaskSearch>(tasks);
  }

  public ngOnDestroy(): void {
    this.subscriptions$.forEach((subscription$) => subscription$.unsubscribe());
  }

  public get isPending(): Observable<boolean> {
    return this.store.select(selectIsBoardPending);
  }

  constructor(private store: Store, private formBuilder: FormBuilder) {}
}
