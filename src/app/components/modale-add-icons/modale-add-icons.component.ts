import { Component, EventEmitter, Output } from '@angular/core';
import { Iicon } from 'src/app/Interfaces/iicon';

@Component({
  selector: 'app-modale-add-icons',
  templateUrl: './modale-add-icons.component.html',
  styleUrls: ['./modale-add-icons.component.scss'],
})
export class ModaleAddIconsComponent {
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
  ];

  onCloseModal() {
    this.closeModal.emit();
  }
  addToTable(iconInfo: any) {}
}
