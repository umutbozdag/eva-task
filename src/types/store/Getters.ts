import { DailySalesSkuListEntity } from "../api/DailySalesSkuListTypes";
import RootState from "./State";

export enum GetterTypes {
  DISPLAYED_TABLE_DATA = "displayedTableData",
  TOTAL_PAGES = "totalPages"
}

export interface GetterDisplayedTableData {
    skuList: DailySalesSkuListEntity[];
    totalSales: number;
    totalSales2: number;
    selectedDate: string;
    selectedDate2: string;
    currency: string;
}

type Getters = {
  [GetterTypes.DISPLAYED_TABLE_DATA](state: RootState): GetterDisplayedTableData;
  [GetterTypes.TOTAL_PAGES](state: RootState, getters: Getters): number;
};

export default Getters;
