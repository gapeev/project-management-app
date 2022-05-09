import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTasksPageComponent } from './search-tasks-page.component';

describe('SearchTasksPageComponent', () => {
  let component: SearchTasksPageComponent;
  let fixture: ComponentFixture<SearchTasksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchTasksPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
