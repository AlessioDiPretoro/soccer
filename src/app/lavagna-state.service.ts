import { Injectable } from '@angular/core';
import { ElementPosition } from './Interfaces/element-position';
import { AllMoves } from './Interfaces/all-moves';
import { AuthService } from './Pages/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LavagnaStateService {
  constructor(private authSrv: AuthService) {}
  private elementPositions: ElementPosition[] = [
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

  allTattics: AllMoves[] = []; //da leggere nell'utente
  newTattic: AllMoves = {
    name: '',
    positions: [[]],
  };
  isRecording: boolean = false;

  getElementPositions(): ElementPosition[] {
    return this.elementPositions;
  }

  updateElementPosition(id: number, x: string, y: string): void {
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
