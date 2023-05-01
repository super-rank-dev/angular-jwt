import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
    '../../assets/vendor/bootstrap/css/bootstrap.min.css',
    '../../assets/fonts/font-awesome-4.7.0/css/font-awesome.min.css',
    '../../assets/vendor/animate/animate.css',
    '../../assets/vendor/css-hamburgers/hamburgers.min.css',
    '../../assets/vendor/select2/select2.min.css',
    '../../assets/css/util.css',
    '../../assets/css/main.css'
  ],

})
export class RegisterComponent {

  loginForm = this.formBuilder.group({
    email: '',
    password: '',
    name: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) { }

  onSubmit(): void {
    console.log(this.loginForm.value);
    this.http
      .post('http://localhost:8000/api/register', this.loginForm.value)
      .subscribe(({ message }: any) => {
        this.snackBar.open(message, '', {
          duration: 2000
        });
        this.router.navigate(['/login']);
      }, ({ error: { message } }) => {
        this.snackBar.open(message, '', {
          duration: 2000
        });
      });
  }
}
