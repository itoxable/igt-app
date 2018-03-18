
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'igt-products',
  templateUrl: 'components/products/products.component.html'
})

export class ProductsComponent implements OnInit {

  myProductsArray: IProduct[];

  constructor(private productService: ProductService, private appService: AppService) { }

  ngOnInit() {
    this.getMyProducts();
   }

  refreshProducts() {
    this.getMyProducts();
  }

  getMyProducts() {
    this.appService.startLoader();
    this.productService.getMyProducts()
    .finally(() => this.appService.hideLoader())
    .subscribe((products: IProduct[]) => {
      this.myProductsArray = products;
    }, err => {
      this.myProductsArray = [];
    });
  }
}
