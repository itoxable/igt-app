
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'igt-product',
  templateUrl: 'components/product/product.component.html'
})

export class ProductComponent implements OnInit {

  @Input() product: any;

  constructor() { }

  ngOnInit() { }
}