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

  ngAfterViewInit(): void {
    this.elementi.changes.subscribe(() => {
      this.updateElementPositions();
    });

    // Aggiorna le posizioni iniziali una volta che gli elementi sono pronti
    this.updateElementPositions();
    console.log('startPositionAll', this.startPositionAll);
  }

  //carica da lavagna-service la posizione
  private updateElementPositions(): void {
    const elementPositions = this.lavagnaState.getElementPositions();
    this.updatePlayersPosition(elementPositions);
  }
  newX!: string;
  newY!: string;
  //aggiorna la posizione di ogni giocatore a seconda della mossa attuale
  private updatePlayersPosition(elementPositions: ElementPosition[]): void {
    elementPositions.forEach((pos) => {
      const element = this.elementi.find(
        (el) => el.nativeElement.getAttribute('id') === `${pos.id}`
      );
      if (element) {
        // this.newX = pos.x; //deve essere in pixel
        // console.log('this.newX', this.newX);
        // this.newY = pos.y;
        this.renderer.setStyle(element.nativeElement, 'left', `${pos.x}`);
        this.renderer.setStyle(element.nativeElement, 'top', `${pos.y}`);
      }
    });
  }

  //bottoni:
  clear() {
    this.updatePlayersPosition(this.startPositionAll);
    this.isLoaded = false;
    this.tatticToPlayIndex = 0;
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
      this.updatePlayersPosition(
        this.tatticToPlay.positions[this.tatticToPlayIndex]
      );
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

  closeModal() {
    this.isModalOpen = false;
  }
}
