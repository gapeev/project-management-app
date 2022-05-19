import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectError = createFeatureSelector<string>('error');
