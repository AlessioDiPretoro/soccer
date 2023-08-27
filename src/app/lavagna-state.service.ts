import { Injectable } from '@angular/core';
import { ElementPosition } from './Interfaces/element-position';
import { AllMoves } from './Interfaces/all-moves';
import { AuthService } from './Pages/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LavagnaStateService {
  constructor(private authSrv: AuthService) {}
  elementPositions: ElementPosition[] = [
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

  allTattics: AllMoves[] = []; //da leggere nell'utente
  newTattic: AllMoves = {
    name: '',
    positions: [[]],
  };

  tempPositions: ElementPosition[] = [];

  isRecording: boolean = false;

  getElementPositions(): ElementPosition[] {
    if (!this.isRecording) {
      return this.elementPositions;
    } else {
      return this.newTattic.positions[this.newTattic.positions.length - 1];
    }
  }

  updateElementPosition(id: number, x: string, y: string): void {
    if (!this.isRecording) {
      const index = this.elementPositions.findIndex((el) => el.id === id);
      console.log('NOT RECORDING');

      this.elementPositions[index].x = x;
      this.elementPositions[index].y = y;
    } else {
      //se id oggetto non presente in newTattic lo pusha alla fine
      if (
        id >
        this.newTattic.positions[this.newTattic.positions.length - 1].length
      ) {
        const newEl = this.tempPositions.findIndex((_el) => _el.id === id);
        this.newTattic.positions[this.newTattic.positions.length - 1].push({
          ...this.tempPositions[newEl],
        });
        console.log('Aggiunto nuovo', this.newTattic.positions);
      }
      const index = this.newTattic.positions[
        this.newTattic.positions.length - 1
      ].findIndex((el) => el.id === id);
      console.log(
        'index',
        index,
        id,
        'newTattic.positions',
        this.newTattic.positions[this.newTattic.positions.length - 1]
      );
      let thisPos: ElementPosition[] = [];

      this.newTattic.positions[this.newTattic.positions.length - 1].forEach(
        (el) => {
          thisPos.push({ ...el });
        }
      );
      console.log('this.elementPositions', thisPos, 'x:', x);

      thisPos[index].x = x;
      thisPos[index].y = y;
      let len = this.newTattic.positions.length;
      this.newTattic.positions[len] = [];
      thisPos.forEach((el) => {
        this.newTattic.positions[len].push({ ...el });
      });
    }
  }

  startRec(tName: string) {
    this.newTattic.name = tName;
    //inserisce la posizione iniziale
    this.elementPositions.forEach((el, i) => {
      this.newTattic.positions[0].push({ ...el });
    });
    this.isRecording = true;
  }

  //viene chiamato per ultimare il salvataggio della tattica
  saveRec() {
    console.log(this.newTattic.positions.length);

    //verifica che non ci siano un errore nel salvataggio nelle posizioni
    if (this.newTattic.positions.length == 0) return console.log('ERROR');

    this.allTattics.push({ ...this.newTattic });
    console.log('allTattics', this.allTattics);
    this.isRecording = false;

    //salva nello user:
    this.authSrv.updateTattics(this.newTattic).subscribe((res) => {
      console.log('ok salvato: ', res);
    });

    //resetta newTattic per poterne farne una nuova
    this.newTattic = {
      name: '',
      positions: [[]],
    };
  }
}
