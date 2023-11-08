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

class ChartAdapter {
  getSeries(data: DailySalesOverviewItemEntity[]): ChartAdapterSeriesObject[] {
    const getSeriesResult: ChartAdapterSeriesObject[] = [];
    xAxisKeys.forEach((xAxisKey) => {
      const seriesObject: ChartAdapterSeriesObject = {
        name: xAxisKey.label,
        legendColor: "black",
        data:
          data &&
          data.map((sale: DailySalesOverviewItemEntity) => {
            return {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              y: sale[xAxisKey.name],
              custom: {
                totalSales: sale.fbaAmount + sale.fbmAmount,
                shipping: sale.fbaShippingAmount,
                profit: sale.profit,
                fbaSales: sale.fbaAmount,
                fbmSales: sale.fbmAmount,
              },
            };
          }),
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
