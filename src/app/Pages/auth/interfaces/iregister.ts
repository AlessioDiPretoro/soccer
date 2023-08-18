import { ICitySingleResponse } from './icity-single-response';

export interface IRegister {
  passwordConf: string;
  password: string;

  email?: string;
  uName?: string;
  surname?: string;
  prefers?: ICitySingleResponse[];
}
