import {Component} from '@angular/core';
import {Router} from '@angular/router';
import { BarcodeScanner } from 'nativescript-barcodescanner';

@Component({
    selector: 'igt-barcode-scanner',
    templateUrl: 'components/barcode-scanner/barcode-scanner.component.html',
})
export class BarcodeScannerComponent {

    private database: any;
    public product: any;

    public constructor(private router: Router, private barcodeScanner: BarcodeScanner) {
      this.product = {
        name: '',
        price: '',
        inventory: '',
        sku: ''
      }
    }

    public scan() {
      this.barcodeScanner.scan({
        cancelLabel: 'Stop scanning',
        message: 'Go scan something',
        preferFrontCamera: false,
        showFlipCameraButton: true
      }).then((result) => {
        this.product = this.database.getDocument(result.text);
      });
    }

    public create() {
      this.router.navigate(['/create-product']);
    }

}