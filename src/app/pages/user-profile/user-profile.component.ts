import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  name: string;

  constructor(private authService: AuthService) { }

  getme() {
    this.authService.getMe().toPromise().then((name: string) => {
      this.name = name;
    }).catch((error) => {
      console.error(error);
    });
  }

  ngOnInit() {
    this.getme()
  }

}
