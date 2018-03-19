
import { Component, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { RecipeService } from '../../services/recipe.service';
import { ProductService } from '../../services/product.service';
import { RadListView } from 'nativescript-pro-ui/listview';
import { NavigationService } from '../../services/navigation.service';
import { IProduct } from '../../models/product.model';
import { IRecipe } from '../../models/recipe.model';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'igt-home',
  templateUrl: 'components/home/home.component.html'
})

export class HomeComponent implements OnInit {

  myRecipesArray: IRecipe[] = [];
  featuredRecipesArray: IRecipe[] = [];

  constructor(private appService: AppService,
    private recipeService: RecipeService, private navigationService: NavigationService) { }

  ngOnInit() {
    // this.recipeService.getMyRecipes().subscribe(recipes => {
    //   console.dir(recipes);
    //   this.myRecipesArray = recipes;
    // });
    // this.recipeService.getFeaturedRecipes().subscribe(recipes => {
    //   this.featuredRecipesArray = recipes;
    // });
  }

  openSearch() {
    console.log('openSearch');
  }

  onIndexChanged($event) {
    // console.log($event);

  }

  addRecipe() {
    this.navigationService.go([`/secure/new-recipe/`]);
  }
}

