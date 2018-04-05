import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { IRecipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { API_URL } from '../../constants';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'igt-recipe-details',
  templateUrl: 'components/recipe-details/recipe-details.component.html'
})

export class RecipeDetailsComponent implements OnInit {

  recipe: IRecipe;
  loadingIndicator: LoadingIndicator = new LoadingIndicator();

  constructor(private route: ActivatedRoute, private navigationService: NavigationService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.loadingIndicator.show({
      message: 'Loading'
    });
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.recipeService.getRecipe(id).subscribe((recipe: IRecipe) => {
        this.recipe = recipe;
        this.loadingIndicator.hide();
      });
    });
   }

  goToRecipe() {
    this.navigationService.go([`/secure/recipe/${this.recipe.id}`]);
  }
}