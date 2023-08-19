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
  maxH: number = window.innerHeight;

  constructor(
    private lavagnaState: LavagnaStateService,
    private renderer: Renderer2,
    private authSrv: AuthService
  ) {}

  private startPositionAll: ElementPosition[] = [
    { id: 1, x: '3%', y: '45%' },
    { id: 2, x: '16%', y: '45%' },
    { id: 3, x: '20%', y: '15%' },
    { id: 4, x: '20%', y: '75%' },
    { id: 5, x: '43%', y: '45%' },
    { id: 6, x: '95%', y: '45%' },
    { id: 7, x: '80%', y: '45%' },
    { id: 8, x: '75%', y: '75%' },
    { id: 9, x: '75%', y: '15%' },
    { id: 10, x: '60%', y: '45%' },
    { id: 11, x: '8.4%', y: '40%' },
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
        this.renderer.setStyle(element.nativeElement, 'left', `${pos.x}`);
        this.renderer.setStyle(element.nativeElement, 'top', `${pos.y}`);
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
