import { NextFunction, Request, Response } from 'express';
import { TypeMouvement } from '@/interfaces/typeMouvement.interface';
import TypeMouvementService from '../services/typeMouvement.service';
import { TypeMouvementDto } from '../dtos/typeMouvement.dto';
import BaseController from './base.controller';
import { ApiResponse } from '@/interfaces/response.interface';

class TypeMouvementController extends BaseController {
  public typeMouvementService = new TypeMouvementService();

  public getTypeMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const query = req.query;
      const limit: number = +query.limit;
      const page: number = +query.page;
      const offset: number = limit * (page - 1);
      const findAllType: TypeMouvement[] = await this.typeMouvementService.findAllType(null, null);
      const findAllTypeData: TypeMouvement[] = await this.typeMouvementService.findAllType(limit, offset);

      const totalRows: number = findAllType.length;
      const message = this.argsResponse('all type mouvement', totalRows).message;

      const data: ApiResponse = this.response(true, message, findAllTypeData, totalRows, limit, page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public createTypeMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeMouvementData: TypeMouvementDto = req.body;
      const createmvtData: TypeMouvement = await this.typeMouvementService.createTypeMouvement(typeMouvementData);

      res.status(201).json({ data: createmvtData, message: 'created type mouvement success' });
    } catch (error) {
      next(error);
    }
  };

  public updateTypeMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeMouvementId = Number(req.params.id);
      const typeMouvementData: TypeMouvementDto = req.body;
      const updateTypeMouvementData: TypeMouvement = await this.typeMouvementService.updateTypeMouvement(typeMouvementId, typeMouvementData);

      res.status(200).json({ data: updateTypeMouvementData, message: 'type mouvement updated success' });
    } catch (error) {
      next(error);
    }
  };

  public findTypeMouvementById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeMouvementId = Number(req.params.id);
      const findMouvementByIdData: TypeMouvement[] = await this.typeMouvementService.findTypeById(typeMouvementId);
      const totalRows: number = findMouvementByIdData.length;
      const message = this.argsResponse('one type mouvement', totalRows).message;

      const data: ApiResponse = this.response(true, message, findMouvementByIdData, totalRows, null, 1);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public deleteTypeMouvement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const typeMouvementId = Number(req.params.id);
      //console.log(produitId);
      const deleteTypeMouvementData: TypeMouvement = await this.typeMouvementService.deleteTypeMouvement(typeMouvementId);

      res.status(200).json({ data: deleteTypeMouvementData, message: 'typeMouvement deleted success' });
    } catch (error) {
      next(error);
    }
  };
}

export default TypeMouvementController;
