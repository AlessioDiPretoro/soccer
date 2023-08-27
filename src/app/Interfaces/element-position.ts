import { Iicon } from './../Interfaces/iicon';
export interface ElementPosition {
  id: number;
  x: string;
  y: string;
  info?: Iicon; //levare "?", per ora serve a non rompere tutto
}
