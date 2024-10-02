import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './auth-layout.component';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { NgModule } from '@angular/core';

export const AuthLayoutRoutes: Routes = [

    {
        path: '',
        component: AuthLayoutComponent,
        children: [
          {
            path: '',
            component: LoginComponent
          }
        ]
      },
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];


