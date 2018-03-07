import { IProduct } from './product.model';

export interface IRecipe extends IProduct {
  recipeProduct?: any[];
  directions?: string;
}
