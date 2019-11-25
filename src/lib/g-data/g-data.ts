import {ReplaySubject} from 'rxjs';

export interface GDataI<T> {
  snapshot: T;
  get: () => ReplaySubject<T>;
  set: (data: T) => void;
  delete: () => void;
}

export class GData<T> implements DataI<T> {
  public snapshot: T;
  private data: ReplaySubject<T> = new ReplaySubject<T>(1);
  constructor(data?: T) {
    if (data) {
      this.set(data);
    }
  }

  public getSnapshot(): T {
    return this.snapshot;
  }

  public get(): ReplaySubject<T> {
    return this.data;
  }

  public set(data: T): void {
    this.snapshot = data;
    this.data.next(data);
  }

  public delete() {
    this.snapshot = undefined;
    this.data.next(undefined);
  }

  public append(data: T): void {
    const newData = Object.assign([], this.snapshot);
    newData.push(data);
    this.snapshot = newData;
    this.data.next(newData);
  }
}
