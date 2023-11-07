import { ActionContext, ActionTree, Commit } from "vuex";
import RootState, { DayOptionsEnum } from "./State";
import { UserData } from "../api/UserDataTypes";
import { DailySalesOverviewData } from "../api/DailySalesOverviewTypes";
import { SkuListRefundRateRequestBody, SkuListRefundRateResponse } from "../api/SkuListRefundRateTypes";
import { AxiosResponse } from "axios";

export enum ActionTypes {
  LOGIN = "login",
  LOGOUT = "logout",
  FETCH_USER_DATA = "fetchUserData",
  GET_DAILY_SALES_OVERVIEW = "getDailySalesOverview",
  SET_SELECTED_DAY = "setSelectedDay",
  SET_SELECTED_COLUMNS = "setSelectedColumns",
  GET_DAILY_SALES_SKU_LIST = "getDailySalesSkuList",
  GET_SKU_REFUND_RATE = "getSkuRefundRate",
}

type Actions = {
  [ActionTypes.LOGIN](
    context: ActionContext<RootState, RootState>,
    data: { email: string; password: string }
  ): Promise<string>;
  [ActionTypes.LOGOUT](context: ActionContext<RootState, RootState>): void;
  [ActionTypes.FETCH_USER_DATA](
    context: ActionContext<RootState, RootState>
  ): Promise<UserData>;
  [ActionTypes.GET_DAILY_SALES_OVERVIEW](
    context: ActionContext<RootState, RootState>
  ): Promise<DailySalesOverviewData>;
  [ActionTypes.SET_SELECTED_DAY](
    context: ActionContext<RootState, RootState>,
    day: DayOptionsEnum
  ): void;
  [ActionTypes.SET_SELECTED_COLUMNS](
    context: ActionContext<RootState, RootState>,
    column: string
  ): void;
  [ActionTypes.GET_DAILY_SALES_SKU_LIST](
    context: ActionContext<RootState, RootState>,
    column: string
  ): Promise<void>;
  [ActionTypes.GET_SKU_REFUND_RATE](
    context: ActionContext<RootState, RootState>,
    skuList: SkuListRefundRateRequestBody
  ): Promise<void>;
};

export default Actions;
