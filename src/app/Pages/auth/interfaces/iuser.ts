import { ICitySingleResponse } from './icity-single-response';
export interface IUser {
  id: number;

  email: string;
  uName?: string;
  surname?: string;
  prefers?: [ICitySingleResponse];
}
