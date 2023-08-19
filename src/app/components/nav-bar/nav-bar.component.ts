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
  uName!: string;
  ngOnInit() {
    this.authSrv.isLoggedIn$.subscribe((res) => {
      this.isLogged = res;
    });
    this.authSrv.user$.subscribe((res) => {
      this.uName = res!.user.uName!;
    });
  }
  logout() {
    this.authSrv.logout();
    this.isUserShow = false;
    console.log('LOG OUT');
  }
}
