import RootState, { DayOptionsEnum } from "@/types/store/State";

const state: RootState = {
  accessToken: "", // Store the access token here
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
