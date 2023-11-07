import { Store, createStore } from "vuex";
import RootState from "@/types/store/State";
import mutations from "./mutations";
import state from "./state";
import actions from "./actions";
import getters from "./getters";

const store = createStore<RootState>({
  state,
  mutations,
  actions,
  getters
});

export default store as Store<RootState>;
