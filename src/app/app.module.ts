import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    SoccerBoardComponent,
    NavBarComponent,
    HomeComponent,
    SoccerFieldComponent,
    DraggableDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, NgFor],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
