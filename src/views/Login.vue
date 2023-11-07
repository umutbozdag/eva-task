<template>
  <div class="h-screen bg-gray-50">
    <section class="h-full grid place-items-center">
      <div class="w-full lg:w-4/12 px-4 mx-auto pt-6">
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div class="flex-auto px-4 lg:px-10 py-10 pt-12">
            <form>
              <div class="relative w-full mb-6">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="grid-password">Email</label>
                <input type="email" v-model="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email">
              </div>
              <div class="relative w-full mb-3">
                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  for="grid-password">Password</label>
                <input type="password" v-model="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password">
              </div>
              <div class="text-center mt-6">
                <button @click="handleLogin"
                  class="bg-blueGray-800 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="button"> Sign In </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import router from '@/router';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';


const email = ref('');
const password = ref('');
const store = useStore();

const handleLogin = async () => {
  try {
    // TODO: update later
    await store.dispatch('login', {
      email: email.value || 'homework@eva.guru',
      password: password.value || 'Homeworkeva1**',
    });

    // accessToken is available here, and you can use it to fetch user data
    await store.dispatch('fetchUserData');
    await store.dispatch('getDailySalesOverview');

    // Do something with the user data
    router.push({ name: 'Home' })
  } catch (error) {
    console.error('Component handling of login error:', error);
  }
};
</script>