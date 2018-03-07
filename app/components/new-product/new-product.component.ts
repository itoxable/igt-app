
import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { Page } from 'tns-core-modules/ui/page';

@Component({
  selector: 'igt-new-product',
  templateUrl: 'components/new-product/new-product.component.html'
})

export class NewProductComponent implements OnInit {

  product: IProduct = {};
  errorMessage: string;

  constructor(private navigationService: NavigationService, private productService: ProductService) {
   }

  ngOnInit() {
   }

  save() {
    this.productService.saveProduct(this.product).subscribe((data) => {
      this.product = data;
      this.navigationService.go([`/secure/home`]);
    }, err => {
      console.dir(err);
      this.errorMessage = 'error!';
    });
  }

  goHome() {
    this.navigationService.go([`/secure`]);
  }

}
