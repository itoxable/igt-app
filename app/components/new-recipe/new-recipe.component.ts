
import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { Page } from 'tns-core-modules/ui/page';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/recipe.model';

@Component({
  selector: 'igt-new-recipe',
  templateUrl: 'components/new-recipe/new-recipe.component.html'
})

export class NewRecipeComponent implements OnInit {

  errorMessage: string;
  recipe: IRecipe;

  constructor(private navigationService: NavigationService,
    private productService: ProductService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipe = {};
  }

  save() {
    this.recipeService.saveRecipe(this.recipe).subscribe((data) => {
      this.recipe = data;
      this.navigationService.go([`/secure/home`]);
    }, err => {
      console.dir(err);
      this.errorMessage = 'error!';
    });
  }

  goHome() {
    this.navigationService.go([`/secure/home`]);
  }

}
