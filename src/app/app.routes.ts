import { Routes } from '@angular/router';
import {SignInComponent} from './pages/sign-in/sign-in.component';
import {RegisterComponent} from './pages/register/register.component';
import {CreateProductComponent} from './pages/create-product/create-product.component';
import {HomeComponent} from './pages/home/home.component';

export const routes: Routes = [
  { path: "login", component: SignInComponent },
  { path: "register", component: RegisterComponent },
  { path: "create", component: CreateProductComponent },
  { path: "", component: HomeComponent }
];
