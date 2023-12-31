import {
  DailySalesSkuListEntity,
  DailySalesSkuListRequestBody,
  DailySalesSkuListResponse,
} from "@/types/api/DailySalesSkuListTypes";
import { AxiosResponse } from "axios";
import Actions, { ActionTypes } from "@/types/store/Actions";
import {
  OAUTHTokenRequestBody,
  OAUTHTokenResponse,
} from "@/types/api/OauthTokenTypes";
import api from "@/api";
import endpoints from "@/api/endpoints";
import { ActionTree } from "vuex";
import RootState from "@/types/store/State";
import {
  UserDataStoreEntity,
  UserInformationRequestBody,
  UserInformationResponse,
} from "@/types/api/UserDataTypes";
import {
  DailySalesOverviewRequestBody,
  DailySalesOverviewResponse,
} from "@/types/api/DailySalesOverviewTypes";
import router from "@/router";
import { MutationTypes } from "@/types/store/Mutations";
import {
  SkuListRefundRateRequestBody,
  SkuListRefundRateResponse,
  SkuRefundRateItemEntity,
} from "../types/api/SkuListRefundRateTypes";
import { isAxiosError } from "@/utils/isAxiosError";

const actions: ActionTree<RootState, RootState> & Actions = {
  async [ActionTypes.LOGIN]({ commit }, { email, password }) {
    try {
      commit(MutationTypes.SET_IS_LOADING, true);

      const requestBody: OAUTHTokenRequestBody = {
        Email: email,
        Password: password,
        GrantType: "password",
        Scope: "amazon_data",
        ClientId: "C0001",
        ClientSecret: "SECRET0001",
        RedirectUri: "https://api.eva.guru",
      };
      const response: AxiosResponse<OAUTHTokenResponse> = await api.post(
        endpoints.OAUTH_TOKEN,
        requestBody
      );

      const accessToken = response.data.Data.AccessToken;
      sessionStorage.setItem("access_token", accessToken);
      sessionStorage.setItem("email", email);

      commit(MutationTypes.SET_ACCESS_TOKEN, accessToken);
      commit(MutationTypes.SET_USER_EMAIL, email);
      commit(MutationTypes.SET_IS_LOADING, false);

      router.push({ name: "Home" });

      return accessToken;
    } catch (error: unknown) {
      if (isAxiosError<OAUTHTokenResponse>(error)) {
        throw error;
      }
    }
  },
  async [ActionTypes.LOGOUT]({ commit }) {
    commit(MutationTypes.CLEAR_ACCESS_TOKEN);
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("email");
    router.go(0);
  },
  async [ActionTypes.FETCH_USER_DATA]({ commit, state }) {
    try {
      commit(MutationTypes.SET_USER_EMAIL, sessionStorage.getItem("email"));
      const requestBody: UserInformationRequestBody = {
        email: state.userEmail,
      };
      const response: AxiosResponse<UserInformationResponse> = await api.post(
        endpoints.USER_INFORMATION,
        requestBody
      );

      const userData = response.data.Data.user;

      commit(MutationTypes.SET_USER_DATA, userData);
      return userData;
    } catch (error) {
      console.error("Fetching user data failed:", error);
      throw error;
    }
  },
  async [ActionTypes.GET_DAILY_SALES_OVERVIEW]({ state, commit }) {
    try {
      let userInformationStore: UserDataStoreEntity | null = null;
      if (state.userData && state.userData.store) {
        userInformationStore = state.userData.store[0];
      }

      const requestBody: DailySalesOverviewRequestBody = {
        marketplace: userInformationStore?.marketplaceName || "",
        sellerId: userInformationStore?.storeId || "",
        day: state.selectedDay,
        excludeYoYData: true,
        requestStatus: 0,
      };
      commit(MutationTypes.SET_IS_LOADING, true);
      const response: AxiosResponse<DailySalesOverviewResponse> =
        await api.post(endpoints.DAILY_SALES_OVERVIEW, requestBody);
      const data = response.data.Data;

      commit(MutationTypes.SET_DAILY_SALES_OVERVIEW, data);
      commit(MutationTypes.RESET_SELECTED_COLUMNS);
      commit(MutationTypes.SET_IS_LOADING, false);
      return data;
    } catch (error) {
      console.error("Error fetching daily sales overview:", error);
      throw error;
    }
  },
  [ActionTypes.SET_SELECTED_DAY]({ commit }, day) {
    commit(MutationTypes.SET_SELECTED_DAY, day);
  },
  async [ActionTypes.SET_SELECTED_COLUMNS](
    { commit, dispatch, state },
    column
  ) {
    commit(MutationTypes.SET_SELECTED_COLUMNS, column);
    await dispatch(ActionTypes.GET_DAILY_SALES_SKU_LIST, state.selectedColumns);
  },
  async [ActionTypes.GET_DAILY_SALES_SKU_LIST]({ commit, state, dispatch }) {
    let userInformationStore: UserDataStoreEntity | null = null;
    if (state.userData && state.userData.store) {
      userInformationStore = state.userData.store[0];
    }

    const pageNumber = state.currentPage / 3;
    const isDaysCompare = state.selectedColumns.length === 2 ? 1 : 0;

    const requestBody: DailySalesSkuListRequestBody = {
      isDaysCompare,
      marketplace: userInformationStore?.marketplaceName || "",
      sellerId: userInformationStore?.storeId || "",
      pageSize: state.itemsPerPage,
      pageNumber,
      salesDate: state.selectedColumns[0],
      salesDate2: isDaysCompare ? state.selectedColumns[1] : "",
    };

    const baseSkuRefundRateRequestBody = {
      marketplace: userInformationStore?.marketplaceName,
      requestedDay: state.selectedDay,
      sellerId: userInformationStore?.storeId,
    };
    let isFetchedBefore = false;
    let skuRefundRateRequestBody: SkuListRefundRateRequestBody;

    const mapSkuRefundRatesToSkuList = (
      refundRates: SkuRefundRateItemEntity[],
      skuList: DailySalesSkuListEntity[]
    ) => {
      return skuList.map((item) => {
        const idx = refundRates.findIndex(
          (refundRate) => item.sku === refundRate.sku
        );
        if (idx > -1) {
          return {
            ...item,
            refundRate: refundRates[idx].refundRate,
          };
        }

        return {
          ...item,
        };
      });
    };
    if (state.currentPage % 3 === 0 && isFetchedBefore) {
      const response: AxiosResponse<DailySalesSkuListResponse> = await api.post(
        endpoints.DAILY_SALES_SKU_LIST,
        requestBody
      );

      const data = response.data.Data;

      if (state.dailySalesSkuList) {
        state.dailySalesSkuList.item.skuList = [
          ...state.dailySalesSkuList.item.skuList,
          ...data.item.skuList,
        ];
        commit(MutationTypes.SET_DAILY_SALES_SKU_LIST, state.dailySalesSkuList);
        skuRefundRateRequestBody = {
          skuList: state.dailySalesSkuList.item.skuList.map((item) => item.sku),
          ...baseSkuRefundRateRequestBody,
        };
        await dispatch(
          ActionTypes.GET_SKU_REFUND_RATE,
          skuRefundRateRequestBody
        );

        if (state.skuRefundRateData && state.skuRefundRateData.item) {
          state.dailySalesSkuList.item.skuList = mapSkuRefundRatesToSkuList(
            state.skuRefundRateData.item,
            data.item.skuList
          );
        }
      } else {
        commit(MutationTypes.SET_DAILY_SALES_SKU_LIST, data);
      }
    } else {
      const response: AxiosResponse<DailySalesSkuListResponse> = await api.post(
        endpoints.DAILY_SALES_SKU_LIST,
        requestBody
      );

      const data = response.data.Data;
      commit(MutationTypes.SET_DAILY_SALES_SKU_LIST, data);

      skuRefundRateRequestBody = {
        skuList: data.item.skuList.map((item) => item.sku),
        ...baseSkuRefundRateRequestBody,
      };

      await dispatch(ActionTypes.GET_SKU_REFUND_RATE, skuRefundRateRequestBody);

      if (
        state.skuRefundRateData &&
        state.skuRefundRateData.item &&
        state.dailySalesSkuList
      ) {
        state.dailySalesSkuList.item.skuList = mapSkuRefundRatesToSkuList(
          state.skuRefundRateData.item,
          data.item.skuList
        );
      }
      isFetchedBefore = true;
    }
  },

  async [ActionTypes.GET_SKU_REFUND_RATE]({ commit }, requestBody) {
    const response: AxiosResponse<SkuListRefundRateResponse> = await api.post(
      endpoints.GET_SKU_REFUND_RATE,
      requestBody
    );
    commit(MutationTypes.SET_SKU_REFUND_RATE_DATA, response.data.Data.item);
  },
};

export default actions;
