export interface DailySalesSkuListResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: DailySalesSkuListData;
}
export interface DailySalesSkuListData {
  Currency: string;
  item: DailySalesSkuDataItem;
}
export interface DailySalesSkuDataItem {
  selectedDate: string;
  TotalSale: number;
  skuList: DailySalesSkuListEntity[];
  selectedDate2: string;
  TotalSale2: number;
}
export interface DailySalesSkuListEntity {
  sku: string;
  productName: string;
  qty: number;
  shippingAmount: number;
  amount: number;
  refundPercantage: number;
  qty2: number;
  amount2: number;
  refundRate?: number;
}

export interface DailySalesSkuListRequestBody {
  marketplace: string;
  sellerId: string;
  salesDate: string;
  salesDate2: string;
  pageSize: number;
  pageNumber: number;
  isDaysCompare: number;
}
