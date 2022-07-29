import { User } from './users.interface';
import { TypeMouvement } from './typeMouvement.interface';
export interface Mouvement {
  id: number;
  motif: string;
  user?: User;
  createdAt: string;
  typeMouvement?: TypeMouvement;
}
