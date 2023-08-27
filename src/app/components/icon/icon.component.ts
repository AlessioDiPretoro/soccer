import { ElementPosition } from './../../Interfaces/element-position';
import { Iicon } from './../../Interfaces/iicon';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
  @Input() iconInfoInput!: Iicon;

  iconInfo!: ElementPosition;

  addToTable(info: ElementPosition) {
    console.log('Clck addToTable, info:', info);
  }
}
