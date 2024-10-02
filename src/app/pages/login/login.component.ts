import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  username: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(response => {
      this.router.navigate(['/dashboard']);
      console.log(response);
      // tutaj możesz wykonać akcje po zalogowaniu
    }, error => {
      console.error(error);
    });
  }


  ngOnDestroy() {
  }

}
