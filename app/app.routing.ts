import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ItemsComponent } from './item/items.component';
import { ItemDetailComponent } from './item/item-detail.component';
import { LoginComponent } from './components/login.component';
import { LoggedOutLayoutComponent } from './components/layouts/logged-out-layout.component';
import { IsLoggedOutGuard } from './services/is-logged-out.guard';
import { LoggedInLayoutComponent } from './components/layouts/logged-in-layout.component';
import { IsLoggedInGuard } from './services/is-logged-in.guard';
import { HomeComponent } from './components/home.component';

const routes: Routes = [
    {
      path: '', component: LoggedOutLayoutComponent, canActivate: [IsLoggedOutGuard],
      children: [
        { path: 'login', component: LoginComponent },
        { path: '', redirectTo: 'login', pathMatch: 'full' }
      ]
    },

    {
      path: 'secure', component: LoggedInLayoutComponent, canActivate: [IsLoggedInGuard],
      children: [
        { path: 'home', component: HomeComponent },
        { path: '', redirectTo: 'home', pathMatch: 'full' }
      ]
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }