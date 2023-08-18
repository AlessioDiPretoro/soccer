import { SoccerFieldComponent } from './Pages/soccer-field/soccer-field.component';
import { HomeComponent } from './Pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { EditComponent } from './Pages/auth/edit/edit.component';
import { LoginComponent } from './Pages/auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'soccerField',
    component: SoccerFieldComponent,
  },
  {
    path: 'signup',
    component: RegisterComponent,
    // canActivate: [!AuthGuard],
  },
  {
    path: 'edit/:id',
    component: EditComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [!AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
