import {Injectable} from '@angular/core';
import {DataI, GData} from './g-data';

@Injectable({providedIn: 'root'})
export class GDataService<T> {
  [key: string]: GData<T>;
}
