import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePicker } from 'ui/date-picker';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { NavigationService } from '../../services/navigation.service';
import { LoadingIndicator } from 'nativescript-loading-indicator';

@Component({
  selector: 'igt-product-details',
  templateUrl: 'components/product-details/product-details.component.html'
})

export class ProductDetailsComponent implements OnInit {

  product: IProduct;
  errorMessage: string;
  successMessage: string;
  loadingIndicator: LoadingIndicator = new LoadingIndicator();

  constructor(private route: ActivatedRoute, private productService: ProductService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.loadingIndicator.show({
      message: 'Loading'
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id).subscribe((product: IProduct) => {
        this.product = product;
        this.product.bestBeforeDate = new Date(this.product.bestBeforeDate);
        this.loadingIndicator.hide();
      });
    });

  }

  setDatePicker(event) {
    const datePicker = <DatePicker>event.object;
    let date;
    if (this.product.bestBeforeDate) {
      date = new Date(this.product.bestBeforeDate);
    } else {
      date = new Date();
      date.setDate(date.getDate() + 1);
    }
    datePicker.year = date.getFullYear();
    datePicker.month = date.getMonth();
    datePicker.day = date.getDate();
    datePicker.minDate = new Date();
    datePicker.maxDate = new Date(2045, 4, 12);
  }

  goHome() {
    this.navigationService.back();
  }

  save() {
    this.loadingIndicator.show({
      message: 'Saving'
    });
    this.productService.saveProduct(this.product)
    .finally(() => this.loadingIndicator.hide()).subscribe((data) => {
      this.product = data;
      this.successMessage = 'Product saved!';
    }, err => {
      console.dir(err);
      this.errorMessage = 'error!';
    });
  }
}
