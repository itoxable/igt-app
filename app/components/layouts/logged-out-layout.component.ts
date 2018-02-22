
import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'igt-logged-out-layout',
  templateUrl: 'components/layouts/logged-out-layout.component.html'
})

export class LoggedOutLayoutComponent implements OnInit {

  constructor(page: Page) {
    page.actionBarHidden = true;
  }

  ngOnInit() { }
}
