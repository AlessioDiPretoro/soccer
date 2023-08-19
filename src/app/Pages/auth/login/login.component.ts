import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ILogin } from '../interfaces/ilogin';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
// import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { IMessage } from '../interfaces/imessage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @ViewChild('f', { static: true }) form!: NgForm;

  formData: ILogin = {
    email: '',
    password: '',
  };

  staticAlertClosed = false;
  showMessage!: IMessage;
  alertsList: IMessage[] = [
    {
      type: 'success',
      message: 'OK Login Stai per essere redirezionato alla tua home page.',
    },
    {
      type: 'danger',
      message: 'Utente o password errati',
    },
  ];
  constructor(private authSrv: AuthService, private router: Router) {}

  submit(f: NgForm) {
    this.formData = f.form.value;
    console.log('this Form', this.formData, typeof this.formData);

    this.authSrv.login(this.formData).subscribe((res) => {
      console.log('NEWWW', res);
      this.displayMessage(this.alertsList[0]);
      // this.staticAlertClosed = true; //Apre il messaggio

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 3000),
        console.log('loggato');
    });
  }

  displayMessage(message: IMessage) {
    this.staticAlertClosed = true;
    this.showMessage = message;
  }

  logOut() {
    this.authSrv.logout();
    console.log('Ok log out');
  }
}
