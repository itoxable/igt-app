import { Component, OnInit, Input, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ProductService } from '../../services/product.service';
import { IProduct } from '../../models/product.model';
import { Page } from 'tns-core-modules/ui/page';
import { RecipeService } from '../../services/recipe.service';
import { IRecipe, INutritionalInfo } from '../../models/recipe.model';
import { takePicture, requestPermissions } from 'nativescript-camera';
import { ImageAsset } from 'tns-core-modules/image-asset/image-asset';
import { ImageSource } from 'tns-core-modules/image-source';
import { layout } from 'tns-core-modules/utils/utils';
import * as app from 'tns-core-modules/application';
import { isAndroid } from 'tns-core-modules/platform';
import * as imagepicker from 'nativescript-imagepicker';
import { LoadingIndicator } from 'nativescript-loading-indicator';
import { AnimationCurve } from 'ui/enums';
// import { Animation, AnimationDefinition } from 'ui/animation';
@Component({
  selector: 'igt-new-recipe',
  templateUrl: 'components/new-recipe/new-recipe.component.html'
})

export class NewRecipeComponent implements OnInit {

  errorMessage: string;
  recipe: IRecipe;
  product: IProduct = {};
  macro: INutritionalInfo = {};
  public saveToGallery = true;
  loadingIndicator: LoadingIndicator = new LoadingIndicator();
  nutritionalInfoList: INutritionalInfo[] = [];

  formData = {
    isReadOnly: false,
    commitMode: 'Immediate',
    validationMode: 'Immediate',
    propertyAnnotations: []
  };
  public showingLongListPicker: any = false;
  @ViewChild('longListPickerContainer') longListPickerContainer: ElementRef;
  @ViewChild('longListPickerDimmer') longListPickerDimmer: ElementRef;

  constructor(private navigationService: NavigationService,
    private changeDetectionRef: ChangeDetectorRef,
    private productService: ProductService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipeService.getAllNutritionalInfo().subscribe(data => {
      this.nutritionalInfoList = data;
      this.recipe = {
        name: '',
        directions: '',
        description: '',
        preparationTime: 0,
        products: [],
        image: '',
        servings: 4,
        nutritionalInfo: []
      };
      this.formData.propertyAnnotations = [
        {
          name: 'name',
          displayName: 'Name',
          index: 0
        },
        {
          name: 'description',
          displayName: 'Description',
          index: 1
        },
        {
          name: 'directions',
          displayName: 'directions',
          index: 2
        },
        {
          name: 'servings',
          displayName: 'Servings',
          index: 3,
          editor: 'Number'
        },
        {
          name: 'preparationTime',
          displayName: 'Preparation Time',
          index: 4
        }
      ];

    });
  }

  save() {
    this.loadingIndicator.show({
      message: 'Saving Recipe'
    });
    this.recipeService.saveRecipe(this.recipe)
    .finally(() => this.loadingIndicator.hide())
    .subscribe((data) => {
      this.recipe = data;
      // this.navigationService.back();
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

  addMacro() {
    this.recipe.nutritionalInfo.push(this.macro);
    this.macro = {};
  }

  removeMacro(i) {
    this.recipe.nutritionalInfo.splice(i, 1);
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
    this.recipe.image = image.android;
  }

  openNutritionList() {
    this.animateLongListPicker('products');
  }

  animateLongListPicker(type) {
    this.showingLongListPicker = type;
    this.longListPickerDimmer.nativeElement.opacity = 0;
    this.longListPickerDimmer.nativeElement.animate({
        opacity: 1,
        duration: 200
    });
    this.longListPickerContainer.nativeElement.opacity = 1;
    this.longListPickerContainer.nativeElement.scaleX = .7;
    this.longListPickerContainer.nativeElement.scaleY = .7;
    this.longListPickerContainer.nativeElement.animate({
        opacity: 1,
        scale: {x: 1, y: 1},
        duration: 400,
        curve: AnimationCurve.cubicBezier(0.1, 0.1, 0.1, 1)
    });
  }

  chooseNutrition(event) {
    this.macro = event;
    this.closeNutritionListPicker();
  }

  closeNutritionListPicker() {
    this.showingLongListPicker = null;
  }

}
