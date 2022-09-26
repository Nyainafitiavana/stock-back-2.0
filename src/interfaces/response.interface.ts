export interface ApiResponse {
  success: boolean;
  message?: string;
  emailNotFound?: boolean;
  data?: DataApiResponse
}

export interface DataApiResponse {
  totalRows?: number;
    limit?: number;
    page?: number;
    rows?: object[] | object;
}
