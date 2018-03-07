import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { IRecipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'igt-recipe',
  templateUrl: 'components/recipe/recipe.component.html'
})

export class RecipeComponent implements OnInit {

  @Input() recipe: IRecipe;

  constructor(private navigationService: NavigationService, private recipeService: RecipeService) { }

  ngOnInit() { }

  goToRecipe() {
    this.navigationService.go([`/secure/recipe/${this.recipe.id}`]);
  }
}