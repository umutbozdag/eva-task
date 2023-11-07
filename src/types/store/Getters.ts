import { SkuListEntity } from "../api/DailySalesSkuListTypes";
import RootState from "./State";

export enum GetterTypes {
  DISPLAYED_TABLE_DATA = "displayedTableData",
  TOTAL_PAGES = "totalPages",
}

type Getters = {
  [GetterTypes.DISPLAYED_TABLE_DATA](state: RootState): {
    skuList: SkuListEntity[]; // Replace SomeType with the actual type of mockData.item.skuList
    totalSales: number; // Adjust the type as needed
    totalSales2: number; // Adjust the type as needed
    selectedDate: string; // Adjust the type as needed
    selectedDate2: string; // Adjust the type as needed
    currency: string; // Adjust the type as needed
  };
  [GetterTypes.TOTAL_PAGES](state: RootState, getters: Getters): number;
};

export default Getters;
