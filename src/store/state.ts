import RootState, { DayOptionsEnum } from "@/types/store/State";

const state: RootState = {
  accessToken: "",
  userData: null,
  userEmail: "",
  dailySalesOverview: null,
  selectedDay: DayOptionsEnum.OneMonth,
  selectedColumns: [],
  dailySalesSkuList: null,
  currentPage: 1,
  itemsPerPage: 10,
  isLoading: false,
  skuRefundRateData: null
};

export default state;
