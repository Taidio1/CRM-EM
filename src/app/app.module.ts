import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { MatDialogModule} from '@angular/material/dialog';
import { PopupDetailComponent } from './components/popup-detail/popup-detail.component';
import { PopupAddComponent } from './components/popup-add/popup-add.component';
import { LibModule } from "./components/mode-toggle-btn/lib.module";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    MatDialogModule,
    BrowserModule,
    LibModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PopupDetailComponent,
    PopupAddComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
