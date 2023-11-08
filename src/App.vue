<template>
  <router-view />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import { ActionTypes } from "./types/store/Actions";
import { MutationTypes } from "./types/store/Mutations";

const store = useStore();
onMounted(async () => {
  const accessToken = sessionStorage.getItem("access_token");
  if (accessToken) {
    store.commit(MutationTypes.SET_ACCESS_TOKEN, accessToken);
    await store.dispatch(ActionTypes.FETCH_USER_DATA);
    await store.dispatch(ActionTypes.GET_DAILY_SALES_OVERVIEW);
    router.push({ name: 'Home' });
  }
})
</script>
