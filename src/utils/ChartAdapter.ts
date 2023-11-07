import { DailySalesOverviewItemEntity } from "@/types/api/DailySalesOverviewTypes";
import {
  ChartAdapterSeriesItem,
  ChartAdapterSeriesObject,
} from "@/types/chart/ChartAdapterTypes";

const keys: ChartAdapterSeriesItem[] = [
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
  getSeries(data: DailySalesOverviewItemEntity[]) {
    const getSeriesResult: ChartAdapterSeriesObject[] = [];
    console.log(data);
    keys.forEach((key) => {
      const seriesObject: ChartAdapterSeriesObject = {
        name: key.label,
        legendColor: 'black',
        data: data && data.map((sale: DailySalesOverviewItemEntity) => {
          return {
            // TODO: remove ts ignore
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            y: sale[key.name],
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

  getCategories(data: DailySalesOverviewItemEntity[]) {
    return data && data.map((sale: DailySalesOverviewItemEntity) => sale.date);
  }
}

export default ChartAdapter;
