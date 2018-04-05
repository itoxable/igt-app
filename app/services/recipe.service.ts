
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRecipe, INutritionalInfo } from '../models/recipe.model';
import { API_URL, AUTHORIZATION_KEY } from '../constants';
import { NSHttp } from 'nativescript-angular/http';
import * as ApplicationSettings from 'application-settings';
import * as FileSystem from 'tns-core-modules/file-system';
import * as imageSource from 'tns-core-modules/image-source';
import { ImageSource } from 'tns-core-modules/image-source';
import { session, Session } from 'nativescript-background-http';


@Injectable()
export class RecipeService {

  constructor(private httpClient: HttpClient) { }

  getFeaturedRecipes(): Observable<any> {
    return this.httpClient.get(`${API_URL}/api/recipe/featured`).map((data) => data as IRecipe[]);
  }

  getRecipe(recipeId): Observable<IRecipe> {
    return this.httpClient.get(`${API_URL}/api/recipe/${recipeId}`);
  }

  getMyRecipes(): Observable<any> {
    return this.httpClient.get(`${API_URL}/api/recipe/user`).map((data) => data as IRecipe[]);
  }


  like(recipeId): Observable<any> {
    return this.httpClient.post(`${API_URL}/api/like`, recipeId);
  }

  removeRecipe(recipeId): Observable<IRecipe> {
    return this.httpClient.delete(`${API_URL}/api/recipe/remove-user/${recipeId}`).map((data) => data as IRecipe);
  }

  getAllNutritionalInfo(): Observable<INutritionalInfo[]> {
    return this.httpClient.get(`${API_URL}/api/recipe/nutrition-list/`).map((data) => data as INutritionalInfo[]);
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
  }
}

