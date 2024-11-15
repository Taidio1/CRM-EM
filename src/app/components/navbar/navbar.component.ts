import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  name: string;

  constructor(location: Location,  private element: ElementRef, private router: Router, private authService: AuthService) {
    this.location = location;
  }
  getme() {
    this.authService.getMe().toPromise().then((name: string) => {
      this.name = name;
    }).catch((error) => {
      console.error(error);
    });
  }
  
  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.getme()
  }


  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
