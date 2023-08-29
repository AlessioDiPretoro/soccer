import { ModaleAddIconsComponent } from './../modale-add-icons/modale-add-icons.component';
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
import { Iicon } from 'src/app/Interfaces/iicon';

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
  isLoaded: boolean = false;
  allTattics: AllMoves[] = [];
  tatticToPlay!: AllMoves;
  tatticToPlayIndex: number = 0;
  maxH: number = window.innerHeight;
  isModalOpen: boolean = false;

  constructor(
    private lavagnaState: LavagnaStateService,
    private renderer: Renderer2,
    private authSrv: AuthService
  ) {}

  startPositionAll: ElementPosition[] = [
    {
      id: 1,
      x: '3%',
      y: '40%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'blu',
        value: '1',
      },
    },
    {
      id: 2,
      x: '16%',
      y: '40%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'blu',
        value: '2',
      },
    },
    {
      id: 3,
      x: '20%',
      y: '10%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'blu',
        value: '3',
      },
    },
    {
      id: 4,
      x: '20%',
      y: '75%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'blu',
        value: '4',
      },
    },
    {
      id: 5,
      x: '40%',
      y: '40%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'blu',
        value: '5',
      },
    },
    {
      id: 6,
      x: '87%',
      y: '40%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'red',
        value: '1',
      },
    },
    {
      id: 7,
      x: '75%',
      y: '40%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'red',
        value: '2',
      },
    },
    {
      id: 8,
      x: '70%',
      y: '75%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'red',
        value: '3',
      },
    },
    {
      id: 9,
      x: '70%',
      y: '10%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'red',
        value: '4',
      },
    },
    {
      id: 10,
      x: '55%',
      y: '40%',
      info: {
        class: 'fa-solid fa-shirt',
        colorClass: 'red',
        value: '5',
      },
    },
    {
      id: 11,
      x: '8.4%',
      y: '35%',
      info: { class: 'fa-solid fa-futbol', colorClass: 'yellow' },
    },
  ];

  nowPositionAll: ElementPosition[] = [];

  ngAfterViewInit(): void {
    this.startPositionAll.forEach((pos) => {
      this.nowPositionAll.push(pos);
    });

    //   //viene chiamato ogni volta che cambia il numero di elementi evocati...non lo sto usando
    // this.elementi.changes.subscribe(() => {
    //   // this.updateElementPositions();
    //   // console.log('ElementiChanged');
    // });

    // Aggiorna le posizioni iniziali una volta che gli elementi sono pronti
    // era attivo, sembra funzioni anche senza
    this.updateElementPositions();
    // console.log('startPositionAll', this.startPositionAll);
  }

  //carica da lavagna-service la posizione
  private updateElementPositions(): void {
    const elementPositions = this.lavagnaState.getElementPositions();
    this.updatePlayersPosition(elementPositions);
    // console.log('updateElementPositions', elementPositions);
  }
  newX!: string;
  newY!: string;
  //aggiorna la posizione di ogni giocatore a seconda della mossa attuale/ricevuta
  private updatePlayersPosition(elementPositions: ElementPosition[]): void {
    console.log('elementPositions UpdatePlayersPosition', elementPositions);
    elementPositions.forEach((pos) => {
      // console.log('pos:', pos);
      if (pos.id > this.nowPositionAll.length) {
        console.log('Ok new IF push new item_id');

        this.nowPositionAll.push({ ...pos });
        console.log('this.nowPositionAll', this.nowPositionAll);
      }
      setTimeout(() => {
        const element = this.elementi.find(
          (el) => el.nativeElement.getAttribute('id') === `${pos.id}`
        );
        if (element) {
          // this.newX = pos.x; //deve essere in pixel
          // console.log('this.ele', element, pos.x, pos.y);
          this.renderer.setStyle(element.nativeElement, 'left', `${pos.x}`);
          this.renderer.setStyle(element.nativeElement, 'top', `${pos.y}`);
        } else {
          console.error('elemento non trovato', pos, 'element:', element);
        }
      }, 300);
    });
  }

  //bottoni:
  clear() {
    this.updatePlayersPosition(this.startPositionAll);
    this.isLoaded = false;
    this.tatticToPlayIndex = 0;
    this.nowPositionAll.length = 0;
    console.log('this.nowPositionAll1', this.nowPositionAll);
    this.startPositionAll.forEach((p) => {
      this.nowPositionAll.push({ ...p });
    });
    console.log('this.nowPositionAll2', this.nowPositionAll);
  }

  //viene chiamata dopo aver inserito il nome della nuova tattica
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

  // delet() {
  //   this.lavagnaState.newTattic.positions = [];
  //   console.log('deleted:', this.lavagnaState.newTattic.positions);
  //   this.clear();
  // }
  loadAllTattics() {
    this.isLoad = !this.isLoad;
    this.authSrv.user$.subscribe((res) => {
      // console.log('res User', res?.user.allTattics);
      this.allTattics = res!.user.allTattics;
    });
    // console.log('LOAD', this.allTattics);
  }
  loadThisTattic(tattic: AllMoves) {
    this.isLoad = false;
    this.isLoaded = true;
    this.tatticToPlay = tattic;
    this.updatePlayersPosition(
      this.tatticToPlay.positions[this.tatticToPlayIndex]
    );
    this.tatticToPlayIndex = 1;
    // console.log('this.tatt', tattic);
  }

  playTattic() {
    this.tatticToPlayIndex = 0;
    let time = 700;
    this.tatticToPlay.positions.forEach((move, i) => {
      console.log('TimeOut', time);
      setTimeout(() => {
        this.updatePlayersPosition(move);
        this.tatticToPlayIndex += 1;
      }, time * i);
    });
  }
  nextMove() {
    if (this.tatticToPlayIndex < this.tatticToPlay.positions.length) {
      // this.nowPositionAll = [];
      // this.tatticToPlay.positions[this.tatticToPlayIndex].forEach((pos) => {
      //   this.nowPositionAll.push({ ...pos });
      // });
      console.log('Now nowPositionAll', this.nowPositionAll);

      //con set timeout funziona, come se ci mette troppo tempo a fare ngFor e prima parte la funzione

      this.updatePlayersPosition(
        this.tatticToPlay.positions[this.tatticToPlayIndex]
      );
      // console.log(
      //   'Now tatticToPlayIndex',
      //   this.tatticToPlay.positions[this.tatticToPlayIndex]
      // );
      this.tatticToPlayIndex += 1;
    } else return;
  }
  prevMove() {
    if (this.tatticToPlayIndex > 1) {
      this.tatticToPlayIndex -= 1;
      this.updatePlayersPosition(
        this.tatticToPlay.positions[this.tatticToPlayIndex - 1]
      );
    } else return;
  }

  showAddIcons() {
    this.isModalOpen = true;
  }

  updateNowPositionAll() {
    this.nowPositionAll = [];
    this.lavagnaState.newTattic.positions[
      this.lavagnaState.newTattic.positions.length - 1
    ].forEach((pos) => {
      this.nowPositionAll.push({ ...pos });
    });
  }

  closeModal() {
    this.isModalOpen = false;
    console.log(
      'newTattCloseModalBefore',
      this.lavagnaState.newTattic.positions
    );
    console.log('lavagnaState tempPositions', this.lavagnaState.tempPositions);
    // this.updateNowPositionAll();

    //aggiorna i valori di nowPositionAll... cos'era??? - forse usate in this.up---al posto di temp...
    this.nowPositionAll.length = 0;
    this.lavagnaState.tempPositions.forEach((p) => {
      this.nowPositionAll.push({ ...p });
    });

    this.updatePlayersPosition(this.lavagnaState.tempPositions);
    // console.log(
    //   'newTattCloseModalAfter',
    //   this.lavagnaState.newTattic.positions
    // );
    // vecchio OK
    // this.updatePlayersPosition(
    //   this.lavagnaState.newTattic.positions[
    //     this.lavagnaState.newTattic.positions.length - 1
    //   ]
    // );
  }
}
