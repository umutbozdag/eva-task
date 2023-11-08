import { GetterTypes } from "@/types/store/Getters";
import RootState from "@/types/store/State";
import { GetterTree } from "vuex";

const getters: GetterTree<RootState, RootState> = {
  [GetterTypes.DISPLAYED_TABLE_DATA](state) {
    const startIndex = (state.currentPage - 1) * state.itemsPerPage;
    const endIndex = startIndex + state.itemsPerPage;
    return {
      skuList: state.dailySalesSkuList?.item.skuList.slice(
        startIndex,
        endIndex
      ),
      totalSales: state.dailySalesSkuList?.item.TotalSale,
      totalSales2: state.dailySalesSkuList?.item.TotalSale2,
      selectedDate: state.dailySalesSkuList?.item.selectedDate,
      selectedDate2: state.dailySalesSkuList?.item.selectedDate2,
      currency: state.dailySalesSkuList?.Currency,
    };
  },
  [GetterTypes.TOTAL_PAGES](state) {
    if (state.dailySalesSkuList) {
      return Math.ceil(
        state.dailySalesSkuList.item.skuList.length / state.itemsPerPage
      );
    }
  },
};

export default getters;
