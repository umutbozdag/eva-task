import { DailySalesOverviewData } from "../api/DailySalesOverviewTypes";
import { DailySalesSkuListData } from "../api/DailySalesSkuListTypes";
import { SkuRefundRateData } from "../api/SkuListRefundRateTypes";
import { UserData } from "../api/UserDataTypes";
import RootState, { DayOptionsEnum } from "./State";

export enum MutationTypes {
  SET_ACCESS_TOKEN = "setAccessToken",
  SET_USER_DATA = "setUserData",
  SET_USER_EMAIL = "setUserEmail",
  SET_DAILY_SALES_OVERVIEW = "setDailySalesOverview",
  SET_SELECTED_DAY = "setSelectedDay",
  SET_SELECTED_COLUMNS = "setSelectedColumns",
  RESET_SELECTED_COLUMNS = "resetSelectedColumns",
  SET_DAILY_SALES_SKU_LIST = "setDailySalesSkuList",
  SET_CURRENT_PAGE = "setCurrentPage",
  SET_IS_LOADING = "setIsLoading",
  CLEAR_ACCESS_TOKEN = "clearAccessToken",
  SET_SKU_REFUND_RATE_DATA = "setSkuRefundRateData",
}

type Mutations = {
  [MutationTypes.SET_ACCESS_TOKEN](state: RootState, token: string): void;
  [MutationTypes.SET_USER_DATA](state: RootState, data: UserData): void;
  [MutationTypes.SET_USER_EMAIL](state: RootState, email: string): void;
  [MutationTypes.SET_DAILY_SALES_OVERVIEW](
    state: RootState,
    data: DailySalesOverviewData
  ): void;
  [MutationTypes.SET_SELECTED_DAY](state: RootState, day: DayOptionsEnum): void;
  [MutationTypes.SET_SELECTED_COLUMNS](state: RootState, column: string): void;
  [MutationTypes.RESET_SELECTED_COLUMNS](state: RootState): void;
  [MutationTypes.SET_DAILY_SALES_SKU_LIST](
    state: RootState,
    data: DailySalesSkuListData
  ): void;
  [MutationTypes.SET_CURRENT_PAGE](state: RootState, page: number): void;
  [MutationTypes.SET_IS_LOADING](state: RootState, loading: boolean): void;
  [MutationTypes.CLEAR_ACCESS_TOKEN](state: RootState): void;
  [MutationTypes.SET_SKU_REFUND_RATE_DATA](
    state: RootState,
    data: SkuRefundRateData
  ): void;
};

export default Mutations;
