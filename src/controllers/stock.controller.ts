import { NextFunction, Request, Response } from 'express';
import StockService from '../services/stock.service';
import { Stock } from '@/interfaces/stock.interface';
import { CreatestockDto } from '../dtos/stock.dto';
import SeuilSecurityService from '@/services/seuilSecurity.service';
import { seuilSecurity } from '@/interfaces/seuilSecurity.interface';
import { ApiResponse } from '@/interfaces/response.interface';
import BaseController from './base.controller';

class StockController extends BaseController {
  public stockService = new StockService();
  public seuilSecurityService = new SeuilSecurityService();
  public getAllStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = limit * (page - 1);
      const findAllStockData: Stock[] = await this.stockService.findAllStock(limit, offset);
      const findAllStock: Stock[] = await this.stockService.findAllStock(null, null);
      const totalRows: number = findAllStock.length;
      const message = this.argsResponse('all stocks', totalRows).message;

      const data: ApiResponse = this.response(true, message, findAllStockData, totalRows, limit, page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public getStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockId = Number(req.params.id);
      const findStock: Stock = await this.stockService.findStockById(stockId);

      res.status(200).json({ data: findStock, message: 'findStock data success' });
    } catch (error) {
      next(error);
    }
  };

  public getStockRupture = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit: number = +req.query.limit;
      const page: number = +req.query.page;
      const offset: number = limit * (page - 1);
      const stockSeuil: seuilSecurity = await this.seuilSecurityService.findSeuilById();
      const findStock: Stock[] = await this.stockService.findStockProduitSeuil(stockSeuil.seuil, null, null);
      const findStockData: Stock[] = await this.stockService.findStockProduitSeuil(stockSeuil.seuil, limit, offset);
      const totalRows: number = findStock.length;
      const message = this.argsResponse('all rupture stock', totalRows).message;

      const data: ApiResponse = this.response(true, message, findStockData, totalRows, limit, page);
      res.json(data);
    } catch (error) {
      next(error);
    }
  };

  public createStock = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const stockData: CreatestockDto = req.body;
      const createStockData: Stock = await this.stockService.createStock(stockData);

      res.status(201).json({ data: createStockData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
export default StockController;
