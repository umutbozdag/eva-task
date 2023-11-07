import { DailySalesOverviewData } from "../api/DailySalesOverviewTypes";
import { DailySalesSkuListData } from "../api/DailySalesSkuListTypes";
import { SkuRefundRateData } from "../api/SkuListRefundRateTypes";
import { UserData } from "../api/UserDataTypes";

interface RootState {
  accessToken: string;
  userData: UserData | null;
  userEmail: string;
  dailySalesOverview: DailySalesOverviewData | [];
  selectedDay: number;
  selectedColumns: string[];
  dailySalesSkuList: DailySalesSkuListData | null;
  currentPage: number;
  itemsPerPage: number;
  isLoading: boolean;
  skuRefundRateData: SkuRefundRateData | null;
}

export enum DayOptionsEnum {
  OneWeek = 7,
  TwoWeek = 14,
  OneMonth = 30,
  TwoMonths = 60,
}

export default RootState;
