import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModeToggleModule } from "./mode-toggle-btn/mode-toggle/mode-toggle.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ModeToggleModule
],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
