import { Injectable } from '@angular/core';
import { ElementPosition } from './Interfaces/element-position';
import { AllMoves } from './Interfaces/all-moves';

@Injectable({
  providedIn: 'root',
})
export class LavagnaStateService {
  private elementPositions: ElementPosition[] = [
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

  allTattics: AllMoves[] = []; //da leggere nell'utente
  newTattic: AllMoves = {
    name: '',
    positions: [[]],
  };
  isRecording: boolean = false;

  getElementPositions(): ElementPosition[] {
    return this.elementPositions;
  }

  updateElementPosition(id: number, x: number, y: number): void {
    const index = this.elementPositions.findIndex((el) => el.id === id);

    if (!this.isRecording) {
      console.log('NOT RECORDING');

      this.elementPositions[index].x = x;
      this.elementPositions[index].y = y;
    } else {
      let thisPos: ElementPosition[] = [];
      this.newTattic.positions[this.newTattic.positions.length - 1].forEach(
        (el) => {
          thisPos.push({ ...el });
        }
      );
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

  saveRec() {
    this.allTattics.push({ ...this.newTattic });
    console.log('allTattics', this.allTattics);
    this.isRecording = false;

    //resetta newTattic per poterne farne una nuova
    this.newTattic = {
      name: '',
      positions: [[]],
    };
  }
}
