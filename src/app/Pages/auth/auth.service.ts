import { AllMoves } from './../../Interfaces/all-moves';
import { Injectable } from '@angular/core';
import { IAccessData } from './interfaces/iaccess-data';
import { BehaviorSubject, map, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IRegister } from './interfaces/iregister';
import { ILogin } from './interfaces/ilogin';
import { IResponse } from './interfaces/iresponse';
import { IUser } from './interfaces/iuser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private jwtHelper: JwtHelperService = new JwtHelperService(); //ci permette di lavorare facilmente con i jwt

  apiUrl: string = 'http://localhost:3000';
  registerUrl: string = this.apiUrl + '/register';
  loginUrl: string = this.apiUrl + '/login';
  usersUrl: string = this.apiUrl + '/users';

  private authSubject = new BehaviorSubject<null | IAccessData>(null); //null è il valore di default, quindi si parte con utente non loggato
  user$ = this.authSubject.asObservable(); //contiene dati sull'utente se è loggato
  isLoggedIn$ = this.user$.pipe(map((user) => !!user)); //serve per la verifica, capta la presenza(o meno) dello user e mi restituisce un bool (false se il subject riceve null)

  // tatticUserUrl: string =
  //   this.apiUrl + '/users/' + this.authSubject.value.user.id + '/allTattics';

  autoLogoutTimer: any; //riferimento al timer che slogga l'utente quando il jwt è scaduto

  constructor(private http: HttpClient, private router: Router) {
    this.restoreUser();
  }

  restoreUser() {
    const userJson: string | null = localStorage.getItem('accessData');
    if (!userJson) return;

    const accessData: IAccessData = JSON.parse(userJson);
    if (this.jwtHelper.isTokenExpired(accessData.accessToken)) return;
    this.authSubject.next(accessData);
  }

  signUp(data: IRegister) {
    console.log('data:', data);
    return this.http.post<IAccessData>(this.registerUrl, data);
  }

  login(data: ILogin) {
    return this.http.post<IAccessData>(this.loginUrl, data).pipe(
      tap((data) => {
        console.log('data', data);
        this.authSubject.next(data); //invio lo user al subject
        localStorage.setItem('accessData', JSON.stringify(data)); //salvo lo user per poterlo recuperare se si ricarica la pagina

        // salvo la data di scadenza del token
        const expDate = this.jwtHelper.getTokenExpirationDate(
          data.accessToken
        ) as Date;
        this.autoLogout(expDate); //un metodo per il logout automatico
      })
    );
  }

  logout() {
    this.authSubject.next(null); //comunico al behaviorsubject che il valore da propagare è null
    localStorage.removeItem('accessData'); //elimino i dati salvati in localstorage
    this.router.navigate(['/login']); //redirect al login
  }

  autoLogout(expDate: Date) {
    const expMs = expDate.getTime() - new Date().getTime(); //sottraggo i ms della data attuale da quelli della data del jwt
    this.autoLogoutTimer = setTimeout(() => {
      //avvio un timer che fa logout allo scadere del tempo
      this.logout();
    }, expMs);
  }

  updateUser(data: IResponse) {
    return this.http.put(this.usersUrl + '/' + data.id, data);
  }

  updateTattics(newT: AllMoves) {
    // console.log('this.authSubject.value', this.authSubject.value); //ricevuto
    // console.log(
    //   'this.authSubject.value?.user.allTattics',
    //   this.authSubject.value?.user.allTattics
    // );
    // if (this.authSubject.value?.user.allTattics) {
    //   let len = this.authSubject.value!.user.allTattics.length;
    //   // this.authSubject.value?.user.allTattics[len] = []
    //   console.log('ok crea salvataggio');
    //   console.log('this newT: ', newT);
    //   newT.positions.forEach((el) => {
    //     console.log('this el: ', el);
    //     console.log('last ', this.authSubject.value?.user.allTattics[len]);

    //     // this.authSubject.value?.user.allTattics[len].positions.push({ ...el });
    //   });
    //   this.authSubject.value?.user.allTattics.push({ ...newT });
    //   console.log('Salved?: ', this.authSubject.value?.user.allTattics);

    //   // this.authSubject.value?.user.allTattics = [];
    // } else {
    //   console.log('ERRORE nel DB: Non esiste');
    // }

    console.log(
      this.usersUrl + '/' + this.authSubject.value?.user.id + '/allTattics'
    );
    console.log('this.user$', this.user$);
    console.log('this.auth', this.authSubject);
    this.authSubject.value!.user.allTattics.push(newT);
    this.authSubject.value!.user.uName = '555555555';
    // this.authSubject.value!.user.allTattics[0].name = newT.name;
    // newT.positions.forEach((el) => {
    //   this.authSubject.value!.user.allTattics[0].positions.push({ ...el });
    // });
    console.log('preSave: ', this.authSubject.value!.user);

    return this.http.patch(
      this.usersUrl + '/' + this.authSubject.value!.user.id,
      this.authSubject.value!.user
    );
    // this.authSubject.value?.user.allTattics.push({ ...newT });
    // return this.http.put(
    //   this.usersUrl + '/' + this.authSubject.value?.user.id,
    //   this.authSubject.value?.user
    // );
  }

  readAllUsers() {
    return this.http.get<IUser[]>(this.usersUrl);
  }

  readThisUser(id: string) {
    return this.http.get(this.usersUrl + '/' + id);
  }
}
