import { Produit } from '@/interfaces/produits.interface';

export interface Stock {
  id?: number;
  quantite: number;
  produit?: Produit;
}
