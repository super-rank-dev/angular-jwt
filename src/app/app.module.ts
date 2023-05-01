import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthStoreService } from './auth-store.service';
import { StoreModule } from '@ngrx/store';
import { CourseReducer } from 'src/ngrx/reducers/course.reducer';
import { AtmarkPipe } from 'src/pipes/atmark.pipe';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AtmarkPipe
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      course: CourseReducer
    })
  ],
  exports: [
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(
    private http: HttpClient,
    private authStoreService: AuthStoreService,
    private snackBar: MatSnackBar
  ) {
    const token = localStorage.getItem('jwt-access-token');

    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })

      this.http
        .post('http://localhost:8000/api/refresh', {}, { headers })
        .subscribe(({ user, token }: any) => {
          localStorage.setItem('jwt-access-token', token);
          this.authStoreService.setUser(user);
        }, ({ error: { message } }) => {
          this.snackBar.open(message, '', {
            duration: 2000
          });
        });
    }
  }
}
