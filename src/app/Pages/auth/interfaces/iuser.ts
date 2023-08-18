import { AllMoves } from 'src/app/Interfaces/all-moves';

export interface IUser {
  id: number;

  email: string;
  uName?: string;
  surname?: string;
  allTattics: AllMoves[];
}
