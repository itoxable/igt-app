
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { Page, Color } from 'tns-core-modules/ui/page';
import * as page from 'tns-core-modules/ui/page';
import { FlexboxLayout } from 'tns-core-modules/ui/layouts/flexbox-layout/flexbox-layout';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { BarcodeScanner } from 'nativescript-barcodescanner';
declare var android;

@Component({
  selector: 'igt-new-product',
  templateUrl: 'components/new-product/new-product.component.html'
})

export class NewProductComponent implements OnInit {

  @Output() productSave: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @ViewChild('newProdLayout') newProdLayout: ElementRef;
  product: IProduct = {};
  errorMessage: string;

  loadingIndicator: LoadingIndicator = new LoadingIndicator();

  constructor(thisPage: Page, private navigationService: NavigationService,
    private barcodeScanner: BarcodeScanner,
    private productService: ProductService) {
  }

  ngOnInit() {
    const layout: FlexboxLayout = this.newProdLayout.nativeElement as FlexboxLayout;
    // layout.nativeView.setShadowLayer(5, 0.1, 1, android.graphics.Color.parseColor('#CCCCCC'));
  }

  public barcodeScan() {
    this.barcodeScanner.scan({
      cancelLabel: 'Cancel',
      message: 'Barcode',
      preferFrontCamera: false,
      showFlipCameraButton: false
    }).then((result) => {
      console.log(result);
    });
  }

  save() {
    this.loadingIndicator.show({
      message: 'Saving'
    });
    this.productService.saveProduct(this.product)
    .finally(() => this.loadingIndicator.hide())
    .subscribe((data) => {
      this.product = data;
      this.productSave.emit(this.product);
      this.product = {};
    }, err => {
      console.dir(err);
      this.errorMessage = 'error!';
    });
  }
}

