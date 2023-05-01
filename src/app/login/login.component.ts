import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthStoreService } from '../auth-store.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
    '../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../assets/vendor/animate/animate.css',
    '../../assets/vendor/css-hamburgers/hamburgers.min.css',
    '../../assets/vendor/select2/select2.min.css',
    '../../assets/css/util.css',
    '../../assets/css/main.css'
  ],

})
export class LoginComponent {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private authStoreService: AuthStoreService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.http
      .post('http://localhost:8000/api/login', this.loginForm.value)
      .subscribe(({ user, token, message }: any) => {
        localStorage.setItem('jwt-access-token', token);
        this.authStoreService.setUser(user);
        this.snackBar.open(message, '', {
          duration: 2000
        });
        this.router.navigate(['/']);
      }, ({ error: { message } }) => {
        this.snackBar.open(message, '', {
          duration: 2000
        });
      });
  }
}
