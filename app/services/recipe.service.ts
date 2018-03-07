
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IRecipe } from '../models/recipe.model';
import { API_URL } from '../constants';

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
    if (recipe.id) {
      return this.httpClient.put(`${API_URL}/api/recipe/save`, recipe);
    } else {
      return this.httpClient.post(`${API_URL}/api/recipe/add`, recipe);
    }
  }

}
