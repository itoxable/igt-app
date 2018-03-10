
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {

  private loading: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  startLoader() {
    this.loading.emit(true);
  }

  endLoader() {
    this.loading.emit(false);
  }

  loader(): Observable<boolean> {
    return this.loading;
  }

}
