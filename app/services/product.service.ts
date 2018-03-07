

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../constants';
import { IProduct } from '../models/product.model';
import { AuthService } from './auth.service';

@Injectable()
export class ProductService {

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getProduct(id): Observable<IProduct> {
    return this.httpClient.get(`${API_URL}/api/product-repo/${id}`).map(data => data as IProduct);
  }

  getMyProducts(): Observable<IProduct[]> {
    return this.httpClient.get(`${API_URL}/api/product/user`).map((data) => data as IProduct[]);
  }

  removeProduct(productId): Observable<IProduct> {
    console.log(`${API_URL}/api/product/remove-user/${productId}`);
    return this.httpClient.delete(`${API_URL}/api/product/remove-user/${productId}`).map((data) => data as IProduct);
  }

  saveProduct(product: IProduct): Observable<IProduct> {
    if (product.id) {
      return this.httpClient.put(`${API_URL}/api/product/add`, product);
    } else {
      return this.httpClient.post(`${API_URL}/api/product/save`, product);
    }
  }

}
