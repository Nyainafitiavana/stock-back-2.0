import { NextFunction, Request, Response } from 'express';
import MouvementService from '../services/mouvement.service';
import { DetailMouvement } from '../interfaces/detailMouvement.interface';
import ProduitService from '@/services/produits.service';
import DetailmouvementService from '../services/detailMouvement.service';
import BaseController from './base.controller';
import { ApiResponse } from '@/interfaces/response.interface';

class DetailMouvementController extends BaseController {
  public mouvementService = new MouvementService();
  public produitService = new ProduitService();
  public detaiService = new DetailmouvementService();

  public getAllDetail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllDetailMouvementsData: DetailMouvement[] = await this.detaiService.findAllDetailMouvement(limit, offset);
      const findAllDetailMouvements: DetailMouvement[] = await this.detaiService.findAllDetailMouvement(null, null);

      const totalRows: number = findAllDetailMouvements.length;
      const message = this.argsResponse('all details mouvements', totalRows).message;

      const data: ApiResponse = this.response(true, message, findAllDetailMouvementsData, totalRows, limit, page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public getDetailById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id: number = +req.params.id;
      const findAllDetailMouvementsData: DetailMouvement[] = await this.detaiService.findByIdDetail(id);

      const totalRows: number = findAllDetailMouvementsData.length;
      const message = this.argsResponse('One Detail', totalRows).message;

      const data: ApiResponse = this.response(true, message, findAllDetailMouvementsData, totalRows, null, 1);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public getQuantityProductByDay = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllDetailMouvementsData: DetailMouvement[] = await this.detaiService.findQuantityProductByDay();

      res.status(200).json({ data: findAllDetailMouvementsData, message: 'findAll detail mouvement' });
    } catch (error) {
      next(error);
    }
  };
}

export default DetailMouvementController;
