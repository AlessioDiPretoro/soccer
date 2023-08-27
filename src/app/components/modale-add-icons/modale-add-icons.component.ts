import { ElementPosition } from './../../Interfaces/element-position';
import { LavagnaStateService } from 'src/app/lavagna-state.service';
import { Component, EventEmitter, Output } from '@angular/core';
import { Iicon } from 'src/app/Interfaces/iicon';

@Component({
  selector: 'app-modale-add-icons',
  templateUrl: './modale-add-icons.component.html',
  styleUrls: ['./modale-add-icons.component.scss'],
})
export class ModaleAddIconsComponent {
  constructor(private lavagnaSrv: LavagnaStateService) {}
  @Output() closeModal = new EventEmitter<void>();

  iconsList: Iicon[] = [
    {
      class: 'fa-solid fa-shirt',
      colorClass: 'blu',
    },
    {
      class: 'fa-solid fa-shirt',
      colorClass: 'red',
      value: '',
    },
    {
      class: 'fa-solid fa-up-long',
      colorClass: 'black',
    },
    {
      class: 'fa-solid fa-down-long',
      colorClass: 'black',
    },
    {
      class: 'fa-solid fa-left-long',
      colorClass: 'black',
    },
    {
      class: 'fa-solid fa-right-long',
      colorClass: 'black',
    },
  ];

  onCloseModal() {
    this.closeModal.emit();
  }
  addToTable(iconInfo: Iicon) {
    // console.log('clicked, info:', iconInfo);
    // console.log(
    //   'this.lavagnaSrv.newTattic.positions:',
    //   this.lavagnaSrv.newTattic.positions.length
    // );
    const iconPos: ElementPosition = {
      id:
        this.lavagnaSrv.newTattic.positions[
          this.lavagnaSrv.newTattic.positions.length - 1
        ].length + 1,
      x: '50%',
      y: '50%',
      info: iconInfo,
    };
    // console.log('clicked, iconPos:', iconPos);

    //NUOVO BOH
    this.lavagnaSrv.tempPositions = [];
    this.lavagnaSrv.newTattic.positions[
      this.lavagnaSrv.newTattic.positions.length - 1
    ].forEach((p) => {
      this.lavagnaSrv.tempPositions.push({ ...p });
    });
    this.lavagnaSrv.tempPositions.push(iconPos);

    //vecchio OK

    // this.lavagnaSrv.newTattic.positions[
    //   this.lavagnaSrv.newTattic.positions.length - 1
    // ].push(iconPos);

    this.onCloseModal();
  }
}
