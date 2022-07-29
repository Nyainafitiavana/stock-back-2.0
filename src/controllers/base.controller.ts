import { paramsData } from '@/interfaces/paramsData.interface';
import { ApiResponse } from '@/interfaces/response.interface';

class BaseController {
  protected response(success: boolean, message?: string, rows?: object[] | object, totalRows?: number, limit?: number, page?: number): ApiResponse {
    const response: ApiResponse = {
      success: success,
      message: message,
      data: {
        totalRows: totalRows,
        limit: limit,
        page: page,
        rows: rows,
      },
    };

    return response;
  }

  protected argsResponse(args: string, totalRows: number): paramsData {
    let message = '';
    if (totalRows > 0) {
      message = 'Get ' + args + ' success';
    } else {
      message = 'Not ' + args + ' found';
    }
    const paramsResponse: paramsData = { message };

    return paramsResponse;
  }
}

export default BaseController;
