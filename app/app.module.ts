import './rxjs-extensions';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { ItemService } from './item/item.service';
import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import { LoginComponent } from './components/login.component';
import { AuthService } from './services/auth.service';
import { LoggedInLayoutComponent } from './components/layouts/logged-in-layout.component';
import { LoggedOutLayoutComponent } from './components/layouts/logged-out-layout.component';
import { IsLoggedInGuard } from './services/is-logged-in.guard';
import { IsLoggedOutGuard } from './services/is-logged-out.guard';
import { HomeComponent } from './components/home.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from 'nativescript-angular/forms';

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from 'nativescript-angular/http';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        ItemDetailComponent,
        LoginComponent,
        LoggedInLayoutComponent,
        LoggedOutLayoutComponent,
        HomeComponent
    ],
    providers: [
        ItemService,
        AuthService,
        IsLoggedInGuard,
        IsLoggedOutGuard
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
