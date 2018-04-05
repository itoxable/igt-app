
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array';
import { RecipeService } from '../../services/recipe.service';
import { ProductService } from '../../services/product.service';
import { RadListView } from 'nativescript-pro-ui/listview';
import { NavigationService } from '../../services/navigation.service';
import { IProduct } from '../../models/product.model';
import { IRecipe } from '../../models/recipe.model';
import { AppService } from '../../services/app.service';
import { RadSideDrawer } from 'nativescript-pro-ui/sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';

@Component({
  selector: 'igt-home',
  templateUrl: 'components/home/home.component.html'
})

export class HomeComponent implements OnInit, AfterViewInit {

  myRecipesArray: IRecipe[] = [];
  featuredRecipesArray: IRecipe[] = [];
  @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
  private drawer: RadSideDrawer;


  constructor(private appService: AppService, private _changeDetectionRef: ChangeDetectorRef,
    private recipeService: RecipeService, private navigationService: NavigationService) { }


  ngAfterViewInit() {
    console.log(this.drawerComponent);
    this.drawer = this.drawerComponent.sideDrawer;
    this._changeDetectionRef.detectChanges();
  }
  ngOnInit() {
    this.recipeService.getMyRecipes().subscribe(recipes => {
      console.dir(recipes);
      this.myRecipesArray = recipes;
    });
    // this.recipeService.getFeaturedRecipes().subscribe(recipes => {
    //   this.featuredRecipesArray = recipes;
    // });
  }

  openSearch() {
    console.log('openSearch');
    this.drawer.showDrawer();
  }

  onIndexChanged($event) {
    // console.log($event);

  }

  addRecipe() {
    this.navigationService.go([`/secure/new-recipe/`]);
  }

  public openDrawer() {
      this.drawer.showDrawer();
  }
}

