import { IProduct } from './product.model';

export interface IRecipe  {
  id?: string;
  name?: string;
  directions?: string;
  image?: string;
  description?: string;
  preparationTime?: number;
  servings?: number;
  products?: IProduct[];
  nutritionalInfo?: INutritionalInfo[];
  likes?: any[];
}

export interface INutritionalInfo  {
  name?: string;
  description?: string;
  value?: string;
}