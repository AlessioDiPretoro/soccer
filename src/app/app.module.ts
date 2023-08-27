import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SoccerBoardComponent } from './components/soccer-board/soccer-board.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './Pages/home/home.component';
import { SoccerFieldComponent } from './Pages/soccer-field/soccer-field.component';
import { DraggableDirective } from './draggable.directive';
import { NgFor } from '@angular/common';
import { LoginComponent } from './Pages/auth/login/login.component';
import { RegisterComponent } from './Pages/auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ModaleAddIconsComponent } from './components/modale-add-icons/modale-add-icons.component';
import { IconComponent } from './components/icon/icon.component';

@NgModule({
  declarations: [
    AppComponent,
    SoccerBoardComponent,
    NavBarComponent,
    HomeComponent,
    SoccerFieldComponent,
    DraggableDirective,
    LoginComponent,
    RegisterComponent,
    ModaleAddIconsComponent,
    IconComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgFor,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
