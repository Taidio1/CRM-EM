import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  
  username: string;
  password: string;
  error: string;
  user = new User();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }

  login(user: User) {
    this.authService.login(user).subscribe((token:string) => {
      localStorage.setItem('authToken', token);
      if (token && token.trim() !== '') {
        this.router.navigate(['/dashboard']);
        console.log(token);
        // tutaj możesz wykonać akcje po zalogowaniu
      } else {
        this.error = 'Token is empty or invalid';
      }
    }, error => {
      this.error = 'Error occurred during login: ' + error.message;
    });
  }


  ngOnDestroy() {
  }

}
