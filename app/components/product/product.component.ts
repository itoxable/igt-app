
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'igt-product',
  templateUrl: 'components/product/product.component.html'
})

export class ProductComponent implements OnInit {

  @Input() product: IProduct;
  @Output() removed: EventEmitter<IProduct> = new EventEmitter<IProduct> ();

  constructor(private productService: ProductService, private navigationService: NavigationService) { }

  ngOnInit() { }

  editProduct() {
    this.navigationService.go([`/secure/product-details/${this.product.id}`], false);
  }

  removeProduct() {
    this.productService.removeProduct(this.product.id).subscribe(data => {
      this.removed.emit(data);
    }
    , err => {
      console.dir(err);
    });
  }

}
