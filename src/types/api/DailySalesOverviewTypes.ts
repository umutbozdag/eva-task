export interface DailySalesOverviewResponse {
  ApiStatus: boolean;
  ApiStatusCode: string;
  ApiStatusMessage: string;
  Data: DailySalesOverviewData;
}
export interface DailySalesOverviewData {
  Currency: string;
  item?: DailySalesOverviewItemEntity[] | null;
  isYoyExist: boolean;
}
export interface DailySalesOverviewItemEntity {
  date: string;
  amount: number;
  orderCount: number;
  unitCount: number;
  avgSalesPrev30Days: number;
  prevYearDate: string;
  prevYearAmount: number;
  prevYearOrderCount: number;
  prevYearUnitCount: number;
  prevYearAvgSalesPrev30Days: number;
  profit: number;
  fbaAmount: number;
  fbmAmount: number;
  fbaShippingAmount: number;
  yoy30DailySalesGrowth: number;
  acos: number;
}

export interface DailySalesOverviewRequestBody {
  marketplace: string;
  sellerId: string;
  requestStatus: number;
  day: number;
  excludeYoYData: boolean;
}
