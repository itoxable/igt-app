import { Component, OnInit } from '@angular/core';
import { ModalDialogService, ModalDialogOptions } from 'nativescript-angular/modal-dialog';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'igt-logged-in-layout',
  templateUrl: 'components/layouts/logged-in-layout.component.html'
})

export class LoggedInLayoutComponent implements OnInit {

  constructor(page: Page, private modalService: ModalDialogService ) {
    page.actionBarHidden = false;
  }

  ngOnInit() { }


}
