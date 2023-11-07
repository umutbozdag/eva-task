export interface ChartAdapterSeriesItem {
  name: string;
  label: string;
}
export interface ChartAdapterSeriesObject {
  name: string;
  data: ChartAdapterSeriesObjectData[];
  legendColor: string;
}

export interface ChartAdapterSeriesObjectData {
  y: number;
  custom: ChartAdapterSeriesObjectCustomData;
}

export interface ChartAdapterSeriesObjectCustomData {
  totalSales: number;
  shipping: number;
  profit: number;
  fbaSales: number;
  fbmSales: number;
}