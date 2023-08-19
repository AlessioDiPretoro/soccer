import { Component } from '@angular/core';
import { AuthService } from 'src/app/Pages/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(private authSrv: AuthService) {}

  isLogged!: boolean;
  isUserShow: boolean = false;

  ngOnInit() {
    this.authSrv.isLoggedIn$.subscribe((res) => {
      this.isLogged = res;
    });
  }
  logout() {
    this.authSrv.logout();
    this.isUserShow = false;
    console.log('LOG OUT');
  }
}
