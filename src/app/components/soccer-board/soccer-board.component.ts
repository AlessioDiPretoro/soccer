import { AllMoves } from './../../Interfaces/all-moves';
import { ElementPosition } from './../../Interfaces/element-position';
import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  ViewChildren,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/Pages/auth/auth.service';
import { IUser } from 'src/app/Pages/auth/interfaces/iuser';
import { LavagnaStateService } from 'src/app/lavagna-state.service';

@Component({
  selector: 'app-soccer-board',
  templateUrl: './soccer-board.component.html',
  styleUrls: ['./soccer-board.component.scss'],
})
export class SoccerBoardComponent implements AfterViewInit {
  @ViewChildren('elemento') elementi: QueryList<ElementRef> =
    new QueryList<ElementRef>();

  @ViewChild('f', { static: true }) form!: NgForm;

  isNewInput: boolean = false;
  isSave: boolean = false;
  isLoad: boolean = false;
  allTattics: AllMoves[] = [];

  constructor(
    private lavagnaState: LavagnaStateService,
    private renderer: Renderer2,
    private authSrv: AuthService
  ) {}

  private startPositionAll: ElementPosition[] = [
    { id: 1, x: 37, y: 219 },
    { id: 2, x: 179, y: 225 },
    { id: 3, x: 231, y: 70 },
    { id: 4, x: 240, y: 373 },
    { id: 5, x: 388, y: 225 },
    { id: 6, x: 906, y: 231 },
    { id: 7, x: 776, y: 225 },
    { id: 8, x: 790, y: 396 },
    { id: 9, x: 781, y: 60 },
    { id: 10, x: 629, y: 225 },
    { id: 11, x: 84, y: 196 },
  ];

  ngAfterViewInit(): void {
    this.elementi.changes.subscribe(() => {
      this.updateElementPositions();
    });

    // Aggiorna le posizioni iniziali una volta che gli elementi sono pronti
    this.updateElementPositions();
  }

  //carica da lavagna-service la posizione
  private updateElementPositions(): void {
    const elementPositions = this.lavagnaState.getElementPositions();
    this.updatePlayersPosition(elementPositions);
  }

  //aggiorna la posizione di ogni giocatore a seconda della mossa attuale
  private updatePlayersPosition(elementPositions: ElementPosition[]): void {
    elementPositions.forEach((pos) => {
      const element = this.elementi.find(
        (el) => el.nativeElement.getAttribute('data-id') === `${pos.id}`
      );
      if (element) {
        this.renderer.setStyle(element.nativeElement, 'left', `${pos.x}px`);
        this.renderer.setStyle(element.nativeElement, 'top', `${pos.y}px`);
      }
    });
  }

  //bottoni:
  clear() {
    this.updatePlayersPosition(this.startPositionAll);
  }

  newRec() {
    this.isNewInput = true;
  }

  startRec(form: NgForm) {
    this.isNewInput = false;
    this.isSave = true;
    // console.log(form.form.value.nome);
    this.lavagnaState.startRec(form.form.value.nome);
  }

  save() {
    this.isSave = false;
    this.lavagnaState.saveRec();
    this.clear();
  }

  delet() {
    this.lavagnaState.newTattic.positions = [];
    console.log('deleted:', this.lavagnaState.newTattic.positions);
    this.clear();
  }
  loadAllTattics() {
    this.isLoad = true;
    this.authSrv.user$.subscribe((res) => {
      console.log('res User', res?.user.allTattics);
      this.allTattics = res!.user.allTattics;
    });
    console.log('LOAD', this.allTattics);
  }

  loadThisTattic(tattic: AllMoves) {
    this.isLoad = false;
    tattic.positions.forEach((move) => {
      setTimeout(() => {
        this.updatePlayersPosition(move);
      }, 500);
    });
  }
}
