import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { Page } from 'tns-core-modules/ui/page';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe } from '../../models/recipe.model';
import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { ImageSource } from 'tns-core-modules/image-source';
import { layout } from 'tns-core-modules/utils/utils';
import * as app from 'tns-core-modules/application';
import { isAndroid } from 'tns-core-modules/platform';
import * as imagepicker from 'nativescript-imagepicker';


@Component({
  selector: 'igt-new-recipe',
  templateUrl: 'components/new-recipe/new-recipe.component.html'
})

export class NewRecipeComponent implements OnInit {

  errorMessage: string;
  recipe: IRecipe = {
    products: []
  };
  product: IProduct = {};

  public saveToGallery = false;

  constructor(private navigationService: NavigationService,
    private changeDetectionRef: ChangeDetectorRef,
    private productService: ProductService, private recipeService: RecipeService) { }

  ngOnInit() {
  }

  save() {
    this.recipeService.saveRecipe(this.recipe).subscribe((data) => {
      this.recipe = data;
      this.navigationService.back();
    }, err => {
      console.dir(err);
      this.errorMessage = 'error!';
    });
  }

  addProduct() {
    this.recipe.products.push(this.product);
    this.product = {};
  }

  removeProduct(i) {
    this.recipe.products.splice(i, 1);
  }

  goHome() {
    this.navigationService.back();
  }


  onTakePictureTap(args) {
    requestPermissions().then(() => {
      takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: this.saveToGallery })
        .then(this.setImage.bind(this), (error) => {
            console.log('Error: ' + error);
        });
      },
      () => alert('permissions rejected')
    );
  }

  selectImages() {
    const context = imagepicker.create({
      mode: 'single'
    });
    this.startSelection(context);
  }

  startSelection(context) {
    const _that = this;
    context.authorize().then(() => {
      return context.present();
    })
    .then(this.setImage.bind(this))
    .catch(function (e) {
        console.log(e);
    });
  }

  setImage(image) {
    if (image.constructor === Array && image.length) {
      image = image[0];
    }
    console.log('*******************');
    console.dir(image);
    this.recipe.image = image.android;
  }

}
