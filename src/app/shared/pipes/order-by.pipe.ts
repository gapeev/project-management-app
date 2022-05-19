import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  public transform<T>(array: Array<T> | null, sortBy: string, order?: 'asc' | 'desc'): Array<T> {
    return array ? orderBy(array, [sortBy], [order ?? 'asc']) : [];
  }
}
