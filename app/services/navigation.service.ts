import { Injectable } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';

@Injectable()
export class NavigationService {

  public transitions = {
    curl: 'curl',
    curlUp: 'curlUp',
    curlDown: 'curlDown',
    explode: 'explode',
    fade: 'fade',
    flip: 'flip',
    flipRight: 'flipRight',
    flipLeft: 'flipLeft',
    slide: 'slide',
    slideLeft: 'slideLeft',
    slideRight: 'slideRight',
    slideTop: 'slideTop',
    slideBottom: 'slideBottom'
  };

  constructor(private routerExtensions: RouterExtensions) { }

  go(route: Array<string>, clearHistory = false, name?: string) {
    this.routerExtensions.navigate(route, {
      clearHistory: clearHistory,
      animated: true,
      transition: {
        name: name ? name : this.transitions.slide,
        duration: 200,
        curve: 'linear'
      }
    });
  }

  back() {
    this.routerExtensions.backToPreviousPage();
  }
}
