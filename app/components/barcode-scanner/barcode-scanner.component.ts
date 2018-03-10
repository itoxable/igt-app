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
    barCodeIcon = String.fromCharCode(0xE84E);

    public constructor(private router: Router, private barcodeScanner: BarcodeScanner) {
      this.product = {
        name: '',
        price: '',
        inventory: '',
        sku: ''
      };
    }

    public scan() {
      this.barcodeScanner.scan({
        cancelLabel: 'Cnacel',
        message: 'Barcode',
        preferFrontCamera: false,
        showFlipCameraButton: false
      }).then((result) => {
        this.product = this.database.getDocument(result.text);
      });
    }

    public create() {
      this.router.navigate(['/create-product']);
    }

}