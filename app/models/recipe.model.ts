import { IProduct } from './product.model';

export interface IRecipe  {
  recipeProduct?: any[];
  directions?: string;
  products?: IProduct[];
  id?: string;
  name?: string;
  image?: string;
  description?: string;
  calories?: string;
  carbs?: string;
  unsaturatedFat?: string;
  saturatedFat?: string;
  polyunsaturatedFat?: string;
  transFat?: string;
  vitamins?: string;
  quantity?: number;
  nutritionalInfo?: INutritionalInfo[];
}

export interface INutritionalInfo  {
  name?: string;
  description?: string;
  value?: string;
}