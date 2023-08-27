import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modale-add-icons',
  templateUrl: './modale-add-icons.component.html',
  styleUrls: ['./modale-add-icons.component.scss'],
})
export class ModaleAddIconsComponent {
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}
