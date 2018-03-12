import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePicker } from 'ui/date-picker';
import { IProduct } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'igt-product-details',
  templateUrl: 'components/product-details/product-details.component.html'
})

export class ProductDetailsComponent implements OnInit {

  product: IProduct = {};
  errorMessage: string;
  successMessage: string;
  saving: boolean;

  constructor(private route: ActivatedRoute, private productService: ProductService, private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.productService.getProduct(id).subscribe((product: IProduct) => {
        this.product = product;
      });
    });

  }

  setDatePicker(event) {
    const datePicker = <DatePicker>event.object;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    datePicker.year = tomorrow.getFullYear();
    datePicker.month = tomorrow.getMonth();
    datePicker.day = tomorrow.getDate();
    datePicker.minDate = new Date();
    datePicker.maxDate = new Date(2045, 4, 12);
  }
  goHome() {
    this.navigationService.go([`/secure/home`], false);
  }
  save() {
    this.saving = true;
    this.productService.saveProduct(this.product).finally(() => this.saving = false).subscribe((data) => {
      this.product = data;
      this.product = {};
      this.successMessage = 'Product saved!';
    }, err => {
      console.dir(err);
      this.errorMessage = 'error!';
    });
  }
}
