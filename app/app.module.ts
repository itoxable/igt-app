import './rxjs-extensions';
import { NgModule, NO_ERRORS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import * as ApplicationSettings from 'application-settings';
import * as nsFacebook from 'nativescript-facebook';
import * as application from 'tns-core-modules/application';

import { ItemService } from './item/item.service';
import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
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

application.on(application.launchEvent, function (args) {
//   nsFacebook.init('2074423572770618');
});

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
      NativeScriptModule,
      NativeScriptRouterModule,
      NativeScriptFormsModule,
      AppRoutingModule,
      HttpClientModule
    ],
    declarations: [
      AppComponent,
      ItemsComponent,
      ItemDetailComponent,
      LoginComponent,
      EmailLoginComponent,
      LoggedInLayoutComponent,
      LoggedOutLayoutComponent,
      HomeComponent,
      ApiErrorComponent,
      ProfileComponent,
      RecipeFilterComponent,
      RecipeComponent,
      ProductComponent
    ],
    providers: [
      { provide: APP_INITIALIZER, useFactory: initializer, deps: [AuthService], multi: true },
      NavigationService,
      ItemService,
      AuthService,
      IsLoggedInGuard,
      IsLoggedOutGuard,
      UserService,
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
