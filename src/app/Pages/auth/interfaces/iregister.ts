import { AllMoves } from 'src/app/Interfaces/all-moves';

export interface IRegister {
  passwordConf: string;
  password: string;

  email?: string;
  uName?: string;
  surname?: string;
  allTattics: AllMoves[];
}
