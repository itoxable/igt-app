
import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoadingIndicator } from 'nativescript-loading-indicator';

@Injectable()
export class AppService {

  private loadingIndicator: LoadingIndicator = new LoadingIndicator();

  constructor() { }

  startLoader(message = 'Loading') {
    this.loadingIndicator.show({
      message: 'Loading'
    });
  }

  hideLoader() {
    this.loadingIndicator.hide();
  }

}
