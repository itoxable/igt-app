
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from '../models/recipe.model';
import { API_URL, AUTHORIZATION_KEY } from '../constants';
import { NSHttp } from 'nativescript-angular/http';
import * as ApplicationSettings from 'application-settings';
import * as FileSystem from 'tns-core-modules/file-system';
import * as imageSource from 'tns-core-modules/image-source';
import { ImageSource } from 'tns-core-modules/image-source';
// const  BackgroundHttp = require('nativescript-background-http');
// import * as BackgroundHttp from 'nativescript-background-http';
import { session, Session } from 'nativescript-background-http';

@Injectable()
export class RecipeService {

  constructor(private httpClient: HttpClient) { }

  getFeaturedRecipes(): Observable<any> {
    return this.httpClient.get(`${API_URL}/api/recipe/featured`).map((data) => data as IRecipe[]);
  }

  getMyRecipes(): Observable<any> {
    return this.httpClient.get(`${API_URL}/api/recipe/user`).map((data) => data as IRecipe[]);
  }

  removeRecipe(recipeId): Observable<IRecipe> {
    console.log(`${API_URL}/api/recipe/remove-user/${recipeId}`);
    return this.httpClient.delete(`${API_URL}/api/recipe/remove-user/${recipeId}`).map((data) => data as IRecipe);
  }

  saveRecipe(recipe: IRecipe): Observable<IRecipe> {
    let url = `${API_URL}/api/recipe/add`;
    if (recipe.id) {
      url = `${API_URL}/api/recipe/save`;
    }
    if (recipe.image) {
      return new Observable((observer: any) => {
        const sess: Session = session('file-upload');
        const request = {
            url: `${API_URL}/api/recipe/add-image`,
            method: 'POST'
        };
        const params = [{ 'name': 'image', 'filename': recipe.image, 'mimeType': 'image/jpg' }];
        const task = sess.multipartUpload(params, request);
        task.on('responded', (event) => {
          observer.next(event.data);
        });
        task.on('complete', (event) => {
          observer.complete();
        });
        task.on('error', event => {
          observer.error(event);
        });
      }).flatMap((imgUrl: string) => {
        console.log('imgUrl: ' + imgUrl);
        recipe.image = imgUrl;
        return this.httpClient.post(`${API_URL}/api/recipe/add`, recipe).map(data => data as any);
      });
    } else {
      return this.httpClient.post(url, recipe).map(data => data as any);
    }
    
    // const headers: HttpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/octet-stream',
    //   'File-Name': recipe.image
    // });
    // return this.httpClient.post(`${API_URL}/api/recipe/add`, {recipe}, {headers: headers}).map(data => data as any);

    // if (recipe.id) {
    //   return this.httpClient.put(`${API_URL}/api/recipe/save`, recipe);




    // } else {
    //   const xmlHttpRequest: XMLHttpRequest = new XMLHttpRequest();

    //   xmlHttpRequest.open('post', `${API_URL}/api/recipe/add`, true);
    //   const formData: FormData = new FormData();

    //   const image: ImageSource = imageSource.fromFile(recipe.image);
    //   formData.append('image', file.file);
    //   for (const key in recipe) {
    //     if (1 === 1) {
    //       formData.append(key, recipe[key]);
    //     }
    //   }
    //   xmlHttpRequest.removeEventListener('error', (ev: Event) => console.dir(ev));
    //   xmlHttpRequest.removeEventListener('progress', (ev: Event) => console.dir(ev));
    //   xmlHttpRequest.removeEventListener('load', (ev: Event) => console.dir(ev));

    //   const token = ApplicationSettings.getString(AUTHORIZATION_KEY);
    //   xmlHttpRequest.setRequestHeader('Authorization', `Bearer ${token}`);
    //   xmlHttpRequest.send(formData);


    //   // return this.httpClient.post(, recipe);
    // }
  }

}
