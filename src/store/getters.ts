import mockData from "@/mock/mockData";
import { GetterTypes } from "@/types/store/Getters";
import RootState from "@/types/store/State";
import { GetterTree } from "vuex";

const getters: GetterTree<RootState, RootState> = {
  // Define your getters here using the Getters type
  [GetterTypes.DISPLAYED_TABLE_DATA](state) {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return {
      skuList: mockData.item.skuList.slice(startIndex, endIndex),
      totalSales: mockData.item.TotalSale,
      totalSales2: mockData.item.TotalSale2,
      selectedDate: mockData.item.selectedDate,
      selectedDate2: mockData.item.selectedDate2,
      currency: mockData.Currency,
    };

    // TODO: use this
    // return state.dailySalesSkuList?.item.skuList!.slice(startIndex, endIndex);
  },
  [GetterTypes.TOTAL_PAGES](state, getters) {
    if (state.dailySalesSkuList) {
      return Math.ceil(
        state.dailySalesSkuList.item.skuList.length / state.itemsPerPage
      );
    }
  },
};

export default getters;
