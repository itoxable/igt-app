import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { LoggedOutLayoutComponent } from './components/layouts/logged-out-layout.component';
import { IsLoggedOutGuard } from './services/is-logged-out.guard';
import { LoggedInLayoutComponent } from './components/layouts/logged-in-layout.component';
import { IsLoggedInGuard } from './services/is-logged-in.guard';
import { EmailLoginComponent } from './components/login/email-login/email-login.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ApiErrorComponent } from './components/api-error/api-error.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';


const routes: Routes = [
  {
    path: '', component: LoggedOutLayoutComponent, canActivate: [IsLoggedOutGuard],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'email-login', component: EmailLoginComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },
  {
    path: 'secure', component: LoggedInLayoutComponent, canActivate: [IsLoggedInGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'new-recipe', component: NewRecipeComponent },
      { path: 'recipe/:id', component: NewRecipeComponent},
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  {  path: 'api-error', component: ApiErrorComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
