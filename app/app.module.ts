import './rxjs-extensions';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER, NgModuleFactoryLoader  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import * as ApplicationSettings from 'application-settings';
import * as nsFacebook from 'nativescript-facebook';
import * as application from 'tns-core-modules/application';
import { BarcodeScanner } from 'nativescript-barcodescanner';
import { NgShadowModule } from 'nativescript-ng-shadow';

import { AuthService } from './services/auth.service';
import { LoggedInLayoutComponent } from './components/layouts/logged-in-layout.component';
import { LoggedOutLayoutComponent } from './components/layouts/logged-out-layout.component';
import { IsLoggedInGuard } from './services/is-logged-in.guard';
import { IsLoggedOutGuard } from './services/is-logged-out.guard';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { LoginComponent } from './components/login/login.component';
import { EmailLoginComponent } from './components/login/email-login/email-login.component';
import { HomeComponent } from './components/home/home.component';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from 'nativescript-angular/http';
import { ApiErrorComponent } from './components/api-error/api-error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavigationService } from './services/navigation.service';
import { TokenInterceptor } from './services/token.interceptor';
import { RecipeFilterComponent } from './components/recipe-filter/recipe-filter.component';
import { ProductComponent } from './components/product/product.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { UserService } from './services/user.service';
import { NativeScriptUIListViewModule } from 'nativescript-pro-ui/listview/angular';
import { RecipeService } from './services/recipe.service';
// import { CommonDirectivesModule } from './navigation/directives/common-directives.module';

// import { TNSFrescoModule } from 'nativescript-fresco/angular';
// import * as frescoModule from 'nativescript-fresco';
import { ProductService } from './services/product.service';
import { BarcodeScannerComponent } from './components/barcode-scanner/barcode-scanner.component';
import { VetricalHomeComponent } from './components/vertical-home/vertical-home.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { AppService } from './services/app.service';
import { FontPipe } from './pipes/font.pipe';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

application.on(application.launchEvent, function (args) {
  nsFacebook.init('2074423572770618');
});

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
      CommonModule,
      // CommonDirectivesModule,
      // TNSFrescoModule,
      NgShadowModule,
      NativeScriptModule,
      NativeScriptRouterModule,
      NativeScriptFormsModule,
      NativeScriptUIListViewModule,
      AppRoutingModule,
      HttpClientModule
    ],
    declarations: [
      AppComponent,
      LoginComponent,
      EmailLoginComponent,
      LoggedInLayoutComponent,
      LoggedOutLayoutComponent,
      HomeComponent,
      VetricalHomeComponent,
      ApiErrorComponent,
      ProfileComponent,
      RecipeFilterComponent,
      RecipeComponent,
      ProductComponent,
      NewProductComponent,
      NewRecipeComponent,
      BarcodeScannerComponent,
      ProductDetailsComponent,
      FontPipe
    ],
    providers: [
      { provide: APP_INITIALIZER, useFactory: initializer, deps: [AuthService], multi: true },
      NavigationService,
      AuthService,
      IsLoggedInGuard,
      IsLoggedOutGuard,
      UserService,
      RecipeService,
      ProductService,
      BarcodeScanner,
      AppService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenInterceptor,
        multi: true
      }
    ],
    schemas: [
      NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/

export class AppModule { }

export function initializer(authService: AuthService) {
  return () => authService.loadUser();
}
