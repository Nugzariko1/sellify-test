import { Routes } from '@angular/router';
import { LogIn } from './features/auth/log-in/log-in';
import { SignUp } from './features/auth/sign-up/sign-up';
import { Category } from './features/category/category';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LogIn },
  { path: 'signup', component: SignUp },
  { path: 'categories', component: Category },
];
