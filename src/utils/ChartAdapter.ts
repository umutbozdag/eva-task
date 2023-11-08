import { DailySalesOverviewItemEntity } from "@/types/api/DailySalesOverviewTypes";
import {
  ChartAdapterSeriesItem,
  ChartAdapterSeriesObject,
} from "@/types/chart/ChartAdapterTypes";

const xAxisKeys: ChartAdapterSeriesItem[] = [
  {
    name: "profit",
    label: "Profit",
  },
  {
    name: "fbaAmount",
    label: "FBA Sales",
  },
  {
    name: "fbmAmount",
    label: "FBM Sales",
  },
];

const mockData = [
  { x: 0, y: 10 },
  { x: 1, y: 20 },
  { x: 2, y: 15 },
  { x: 3, y: 25 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
];

class ChartAdapter {
  getSeries(data: DailySalesOverviewItemEntity[]): ChartAdapterSeriesObject[] {
    const getSeriesResult: ChartAdapterSeriesObject[] = [];
    xAxisKeys.forEach((xAxisKey) => {
      const seriesObject: ChartAdapterSeriesObject = {
        name: xAxisKey.label,
        legendColor: "black",
        data: mockData as any,
      };
      getSeriesResult.push(seriesObject);
    });

    return getSeriesResult;
  }

  getCategories(
    data: DailySalesOverviewItemEntity[]
  ): DailySalesOverviewItemEntity["date"][] {
    return data && data.map((sale: DailySalesOverviewItemEntity) => sale.date);
  }
}

export default ChartAdapter;
