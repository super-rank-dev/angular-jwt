import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from '../auth-store.service';
import { User } from 'src/interfaces/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: [
    './navbar.component.css',
    '../../assets/fonts/icomoon/style.css',
    '../../assets/css/owl.carousel.min.css',
    '../../assets/css/bootstrap.min.css',
    '../../assets/css/style.css'
  ]
})
export class NavbarComponent implements OnInit {

  isAuthorized!: boolean | false;
  user!: User | null;

  constructor(private authStoreService: AuthStoreService) { }

  ngOnInit(): void {
    this.authStoreService.$state.subscribe((value: any) => {
      const { user } = value;
      this.isAuthorized = user !== null;
      this.user = user;
    });
  }

  logout(): void {
    localStorage.removeItem('jwt-access-token');
    this.authStoreService.removeUser();
  }
}
