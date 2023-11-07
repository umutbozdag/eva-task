<template>
  <router-view />
</template>
<script setup lang="ts">
import { useNotification } from "@kyvg/vue3-notification";
import { onMounted } from "vue";
import { useStore } from "vuex";
import router from "@/router";

const notification = useNotification()
const store = useStore();
onMounted(async () => {
  const accessToken = sessionStorage.getItem("access_token");
  if (accessToken) {
    store.commit("setAccessToken", accessToken);
    await store.dispatch('fetchUserData');
    await store.dispatch("getDailySalesOverview");
    router.push({ name: 'Home' })
  }
  notification.notify({
    title: "Vue 3 notification 🎉",
  });
})
</script>
<style lang="scss"></style>
