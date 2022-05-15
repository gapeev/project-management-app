import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

export class Paginator {
  constructor(private readonly translate: TranslateService) {}

  getPaginatorIntl(): MatPaginatorIntl {
    const paginatorIntl = new MatPaginatorIntl();
    this.translate.stream('SEARCH-TASKS-PAGE.PAGINATOR.PER-PAGE').subscribe((res) => {
      paginatorIntl.itemsPerPageLabel = res;
      paginatorIntl.changes.next();
    });
    this.translate.stream('SEARCH-TASKS-PAGE.PAGINATOR.NEXT-PAGE').subscribe((res) => {
      paginatorIntl.nextPageLabel = res;
      paginatorIntl.changes.next();
    });
    this.translate.stream('SEARCH-TASKS-PAGE.PAGINATOR.PREV-PAGE').subscribe((res) => {
      paginatorIntl.previousPageLabel = res;
      paginatorIntl.changes.next();
    });
    this.translate.stream('SEARCH-TASKS-PAGE.PAGINATOR.FIRST-PAGE').subscribe((res) => {
      paginatorIntl.firstPageLabel = res;
      paginatorIntl.changes.next();
    });
    this.translate.stream('SEARCH-TASKS-PAGE.PAGINATOR.LAST-PAGE').subscribe((res) => {
      paginatorIntl.lastPageLabel = res;
      paginatorIntl.changes.next();
    });
    paginatorIntl.getRangeLabel = this.getRangeLabel.bind(this);
    return paginatorIntl;
  }

  private getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('SEARCH-TASKS-PAGE.PAGINATOR.LABEL-0', { length });
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return this.translate.instant('SEARCH-TASKS-PAGE.PAGINATOR.LABEL', {
      startIndex: startIndex + 1,
      endIndex,
      length,
    });
  }
}
