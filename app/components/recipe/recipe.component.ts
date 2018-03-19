import { Component, OnInit, Input } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { IRecipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipe.service';
import { API_URL } from '../../constants';

@Component({
  selector: 'igt-recipe',
  templateUrl: 'components/recipe/recipe.component.html'
})

export class RecipeComponent implements OnInit {

  @Input() recipe: IRecipe;

  constructor(private navigationService: NavigationService, private recipeService: RecipeService) { }

  ngOnInit() {
    if (this.recipe.image) {
      this.recipe.image = `${API_URL}/api/util/image/${this.recipe.image}`;
    }
   }

  goToRecipe() {
    this.navigationService.go([`/secure/recipe/${this.recipe.id}`]);
  }
}