
import { Component, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { RecipeService } from '../../services/recipe.service';
import { ProductService } from '../../services/product.service';
import { RadListView } from 'nativescript-pro-ui/listview';

@Component({
  selector: 'igt-home',
  templateUrl: 'components/home/home.component.html'
})

export class HomeComponent implements OnInit {

  myProductsArray = [];
  myRecipesArray = [];
  featuredRecipesArray = [];
  constructor(private productService: ProductService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.productService.getMyProducts().subscribe(products => {
      this.myProductsArray = products;
    });

    this.recipeService.getMyRecipes().subscribe(recipes => {
      this.myRecipesArray = recipes;
    });
    this.recipeService.getFeaturedRecipes().subscribe(recipes => {
      this.featuredRecipesArray = recipes;
    });
  }

  openSearch() {
    console.log('openSearch');
  }

  onIndexChanged($event) {
    console.log($event);
  }

  addProduct() {
    console.log('addProduct');
  }

}
