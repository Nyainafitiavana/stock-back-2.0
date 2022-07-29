import { Produit } from '@/interfaces/produits.interface';
import { Double } from 'typeorm';
import { Mouvement } from '@/interfaces/mouvement.interface';
export interface DetailMouvement {
  id?: number;
  mouvement?: Mouvement;
  produit?: Produit;
  quantite?: number;
  prixTotal?: Double;
}
