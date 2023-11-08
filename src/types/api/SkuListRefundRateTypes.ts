export interface SkuListRefundRateResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: SkuRefundRateData;
}
export interface SkuRefundRateData {
  item?: SkuRefundRateItemEntity[] | null;
}
export interface SkuRefundRateItemEntity {
  sku: string;
  refundRate: number;
}

export interface SkuListRefundRateRequestBody {
  marketplace?: string;
  sellerId?: string;
  skuList?: string[] | null;
  requestedDay: number;
}
