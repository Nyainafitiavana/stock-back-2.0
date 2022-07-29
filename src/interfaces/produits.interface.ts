import { Category } from '@/interfaces/category.interface';
export interface Produit {
  id: number;
  designation: string;
  prix: number;
  category?: Category;
}
