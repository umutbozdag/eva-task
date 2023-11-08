import RootState from "@/types/store/State";
import { Store } from "vuex";
import Highcharts from "highcharts";
import { formatDate } from "./date";
import { DailySalesOverviewItemEntity } from "@/types/api/DailySalesOverviewTypes";
import ChartAdapter from "./ChartAdapter";
import { ActionTypes } from "@/types/store/Actions";

export default class HighchartsFacade {
  private currencyValue: string;
  public hcInstance: Highcharts.Chart | undefined;
  private store: Store<RootState>;
  private chartAdapter: ChartAdapter;
  private selectedPoints: Highcharts.Point[] = [];
  constructor(currencyValue: string, store: Store<RootState>) {
    this.currencyValue = currencyValue;
    this.store = store;
    this.chartAdapter = new ChartAdapter(); // Initialize the chart adapter
  }

  public updateChart(data: DailySalesOverviewItemEntity[]): void {
    const updatedSeries = this.chartAdapter.getSeries(data);
    const updatedCategories = this.chartAdapter.getCategories(data);

    if (this.hcInstance) {
      this.hcInstance.update({
        xAxis: { categories: updatedCategories },
        // @ts-expect-error https://assets.highcharts.com/errors/17/?missingModuleFor=xrange
        series: updatedSeries,
      });
    }
  }

  public createChart(
    containerId: string,
    data: DailySalesOverviewItemEntity[] | null | undefined
  ): Highcharts.Chart {
    this.hcInstance = Highcharts.chart(containerId, this.createOptions());
    if (data) {
      const seriesData = this.chartAdapter.getSeries(data);

      seriesData.map((item) => {
        // @ts-expect-error https://assets.highcharts.com/errors/17/?missingModuleFor=xrange
        this.hcInstance?.addSeries(item);
      });
    }
    return this.hcInstance;
  }

  private createOptions(): Highcharts.Options {
    return {
      title: { text: "" },
      chart: { type: "column", backgroundColor: "#fff" },
      xAxis: this.createXAxis(),
      yAxis: this.createYAxis(),
      tooltip: this.createTooltip(),
      plotOptions: this.createPlotOptions(),
      series: [],
    };
  }

  private createXAxis(): Highcharts.XAxisOptions {
    return {
      categories: [],
      type: "datetime",
      labels: this.createXAxisLabels(),
    };
  }

  private createXAxisLabels(): Highcharts.XAxisLabelsOptions {
    return {
      style: { color: "black", fontSize: "12px", fontWeight: "bold" },
      formatter: function () {
        return formatDate(this.value);
      }
    };
  }

  private createYAxis(): Highcharts.YAxisOptions {
    return {
      min: 0,
      gridLineWidth: 1,
      gridLineDashStyle: "LongDashDot",
      title: {
        text: `Amount (${this.currencyValue})`,
        style: { color: "black", fontSize: "14px", fontWeight: "bold" },
      },
      labels: this.createYAxisLabels(),
    };
  }

  private createYAxisLabels(): Highcharts.YAxisLabelsOptions {
    return {
      formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
        return this.value ? `${this.value}k` : `${this.value}`;
      },
      style: { color: "black" }
    };
  }

  private createTooltip(): Highcharts.TooltipOptions {
    return {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: `Total Sales: {point.custom.totalSales}<br/>Shipping: {point.custom.shipping}<br/>Profit: {point.custom.profit}<br/>FBA Sales: {point.custom.fbaSales}<br/>FBM Sales: {point.custom.fbmSales}<br/>`,
    };
  }

  private createPlotOptions(): Highcharts.PlotOptions {
    return {
      column: this.createColumnOptions() as Highcharts.PlotColumnOptions,
      series: this.createSeriesOptions() as Highcharts.PlotSeriesOptions,
    };
  }

  private createColumnOptions(): Highcharts.PlotColumnOptions {
    return {
      stacking: "normal",
      minPointLength: 3,
      dataLabels: this.createDataLabels(),
      allowPointSelect: false,
    };
  }

  private createDataLabels(): Highcharts.PlotColumnDataLabelsOptions {
    return {
      enabled: true,
      rotation: -90,
      color: "#fff",
      backgroundColor: "red",
      align: "right",
      y: 10,
      style: { fontSize: "13px" },
    };
  }

  private createSeriesOptions(): Highcharts.PlotSeriesOptions {
    return {
      cursor: "pointer",
      allowPointSelect: false,
      // pointWidth: 25,
      states: { select: { enabled: false } },
      dataLabels: { format: `${this.currencyValue}{y}` },
      point: this.createPointEvents(),
    };
  }

  private createPointEvents(): Highcharts.PointOptionsObject {
    return {
      events: {
        click: async (event) => await this.handlePointClick(event),
      },
    };
  }

  private async handlePointClick(event: Highcharts.PointClickEventObject) {
    const category = event.point.category;
    if (this.store.state.selectedColumns.length === 2) {
      const nearestSelectedPoint = this.selectedPoints.shift();
      nearestSelectedPoint?.update({
        color: "rgb(124,181,236)", // Update with default color
      });
      event.point.update({
        color: "#a81629",
      });
      this.selectedPoints.push(event.point);
      await this.store.dispatch(ActionTypes.SET_SELECTED_COLUMNS, category);
    } else {
      await this.store.dispatch(ActionTypes.SET_SELECTED_COLUMNS, category);
      this.selectedPoints.push(event.point);
      event.point.update({
        color: "#a81629",
      });
    }
  }
}
