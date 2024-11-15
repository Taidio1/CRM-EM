import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablesComponent } from './pages/tables/tables.component';
import { AuthGuard } from './services/auth.guard';
import { DocComponent } from './pages/doc/doc.component';
import { RaportComponent } from './pages/raport/raport.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

const routes: Routes =[
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ],
    pathMatch: 'full',
  }, 
  {
    path: 'dashboard',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard'
      },
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'tables',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'tables'
      },
      {
        path: '',
        component: TablesComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'doc',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'doc'
      },
      {
        path: '',
        component: DocComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'raport',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'raport'
      },
      {
        path: '',
        component: RaportComponent,
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'user-profile',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-profile'
      },
      {
        path: '',
        component: UserProfileComponent,
        canActivate: [AuthGuard]
      },
    ]
  },

   {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }, {
    //Ściezka nieznanego
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule
  ],
})
export class AppRoutingModule { }