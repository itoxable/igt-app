import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'igt-recipe',
  templateUrl: 'components/recipe/recipe.component.html'
})

export class RecipeComponent implements OnInit {

  @Input() recipe: any;

  constructor() { }

  ngOnInit() { }
}