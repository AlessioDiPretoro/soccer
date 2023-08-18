import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IRegister } from '../interfaces/iregister';
import { IResponse } from '../interfaces/iresponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  thisUser!: IRegister;
  responseUser!: IResponse;
  isId: boolean = false;
  isLoading: boolean = false;
  staticAlertClosed = true;
  createdMessage = true;

  constructor(
    private fb: FormBuilder,
    private authSrv: AuthService,
    private router: Router,
    private _Activatedroute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: this.fb.control(null, [Validators.required]),
      password: this.fb.control(null, [Validators.required]),
      uName: this.fb.control(null),
      surname: this.fb.control(null),
      passwordConf: this.fb.control(null, [Validators.required]),
      id: this.fb.control(null),
    });

    //server per modificare
    // if (this._Activatedroute.snapshot.paramMap.get('id')) {
    //   this.isId = true;
    //   this.isLoading = true;
    //   this.form.disable();
    //   this.authSrv
    //     .readThisUser(this._Activatedroute.snapshot.paramMap.get('id')!)
    //     .subscribe((res) => {
    //       console.log('res', res);
    //       this.responseUser = res as IResponse;
    //       this.form.setValue({
    //         email: this.responseUser.email,
    //         uName: this.responseUser.uName,
    //         surname: this.responseUser.surname,
    //         password: '',
    //         passwordConf: '',
    //         id: this.responseUser.id,
    //       });
    //       this.isLoading = false;
    //       this.form.enable();
    //     });
    // }
  }

  sendUser() {
    if (this.form.status === 'VALID') {
      console.log('VALID', this.form);
      this.form.disable();
      this.thisUser = this.form.value;
      this.thisUser.allTattics = [];

      //PROVA Per creare utente con tattica, ok funziona
      // this.thisUser.allTattics = [
      //   {
      //     name: 'prova',
      //     positions: [
      //       [
      //         { id: 1, x: 37, y: 219 },
      //         { id: 2, x: 179, y: 225 },
      //         { id: 3, x: 231, y: 70 },
      //         { id: 4, x: 240, y: 373 },
      //         { id: 5, x: 388, y: 225 },
      //         { id: 6, x: 906, y: 231 },
      //         { id: 7, x: 776, y: 225 },
      //         { id: 8, x: 790, y: 396 },
      //         { id: 9, x: 781, y: 60 },
      //         { id: 10, x: 629, y: 225 },
      //         { id: 11, x: 84, y: 196 },
      //       ],
      //     ],
      //   },
      // ];

      this.authSrv.signUp(this.thisUser).subscribe((res) => {
        // console.log('registrato');
        this.createdMessage = false;
        //this.authSrv.isLoggedIn$ = true //non aggiorna la navBAR
        localStorage.setItem('accessData', JSON.stringify(res));
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      });
      this.form.reset();
      // console.log('userthisUser: ', this.thisUser);
    } else {
      console.log('NON VALID');
      // return
    }
  }

  editUser() {
    if (this.form.status === 'VALID') {
      this.form.disable();
      this.responseUser = this.form.value;
      console.log('this user NEW', this.responseUser);
      this.staticAlertClosed = false;
      this.isLoading = true;
      this.authSrv.updateUser(this.responseUser).subscribe((res) => {
        console.log('Utente aggiornato', res);
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000);
      });
    }
  }

  isValid(fieldName: string) {
    return this.form.get(fieldName)?.valid;
  }
  isTouched(fieldName: string) {
    return this.form.get(fieldName)?.touched; //true se il campo cercato ha subito interazioni dall'utente
  }

  getMessage(form: FormGroup) {
    return this.form.errors!['message']; //restituisce il messaggio di errore dei custom validators
  }

  isPassword(fieldName: string, otherName: string) {
    return this.form.get(fieldName)?.value === this.form.get(otherName)?.value;
  }
  passwordConfirm = (formC: FormControl): ValidationErrors | null => {
    if (formC.value.passwordConf !== formC.value.authData.password) {
      return {
        invalid: true,
        message: 'Le password sono differenti',
      };
    }
    return null;
  };
}
