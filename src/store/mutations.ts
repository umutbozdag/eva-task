import Mutations, { MutationTypes } from "@/types/store/Mutations";
import RootState from "@/types/store/State";
import { MutationTree } from "vuex";

const mutations: MutationTree<RootState> & Mutations = {
  [MutationTypes.SET_ACCESS_TOKEN](state, token) {
    state.accessToken = token;
  },
  [MutationTypes.SET_USER_DATA](state, data) {
    state.userData = data;
  },
  [MutationTypes.SET_USER_EMAIL](state, email) {
    state.userEmail = email;
  },
  [MutationTypes.SET_DAILY_SALES_OVERVIEW](state, data) {
    state.dailySalesOverview = data;
  },
  [MutationTypes.SET_SELECTED_DAY](state, day) {
    state.selectedDay = day;
  },
  [MutationTypes.SET_SELECTED_COLUMNS](state, column) {
    if (state.selectedColumns.length < 2) {
      state.selectedColumns.push(column);
    } else {
      state.selectedColumns.shift();
      state.selectedColumns.push(column);
    }
  },
  [MutationTypes.RESET_SELECTED_COLUMNS](state) {
    state.selectedColumns = [];
  },
  [MutationTypes.SET_DAILY_SALES_SKU_LIST](state, data) {
    state.dailySalesSkuList = data;
  },
  [MutationTypes.SET_CURRENT_PAGE](state, page) {
    state.currentPage = page;
  },
  [MutationTypes.SET_IS_LOADING](state, loading) {
    state.isLoading = loading;
  },
  [MutationTypes.CLEAR_ACCESS_TOKEN](state) {
    state.accessToken = "";
  },
  [MutationTypes.SET_SKU_REFUND_RATE_DATA](state, data) {
    state.skuRefundRateData = data;
  },
};

export default mutations;
