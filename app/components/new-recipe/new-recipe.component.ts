
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
  recipe: IRecipe;

  public saveToGallery = false;
  public cameraImage: ImageAsset;
  items = [];

  constructor(private navigationService: NavigationService,
    private changeDetectionRef: ChangeDetectorRef,
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

  onTakePictureTap(args) {
    requestPermissions().then(
        () => {
            takePicture({ width: 300, height: 300, keepAspectRatio: true, saveToGallery: this.saveToGallery })
                .then((imageAsset: any) => {
                    this.cameraImage = imageAsset;
                    // console.dir(src);
                    // if you need image source
                    console.dir(this.cameraImage);
                    const source = new ImageSource();
                    source.fromAsset(imageAsset).then((imageSource: ImageSource) => {
                        let width = imageSource.width;
                        let height = imageSource.height;
                        if (app.android) {
                          // src.android
                            // the android dimensions are in device pixels
                            width = layout.toDeviceIndependentPixels(width);
                            height = layout.toDeviceIndependentPixels(height);
                        }

                        console.dir(imageSource);
                    });
                }, (error) => {
                    console.log('Error: ' + error);
                });
        },
        () => alert('permissions rejected')
    );
  }

  selectImages() {
    const context = imagepicker.create({
      mode: 'multiple'
    });
    this.startSelection(context);
  }

  startSelection(context) {
    const _that = this;

    context.authorize()
    .then(() => {
        _that.items = [];
        return context.present();
    })
    .then((selection) => {
        console.log('Selection done:');
        selection.forEach(function (selected) {
            console.log('----------------');
            console.log('uri: ' + selected.uri);
            console.log('fileUri: ' + selected.fileUri);
        });
        _that.items = selection;
        console.dir(_that.items[0]);
        _that.changeDetectionRef.detectChanges();
    }).catch(function (e) {
        console.log(e);
    });
}

}
