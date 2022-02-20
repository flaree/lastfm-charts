<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Footer from './components/Footer.vue'
</script>

<template>
  <div
    class="
      antialiased
      bg-gray-300
      text-gray-800
      dark:bg-gray-800
      dark:text-gray-300
      flex flex-col
      min-h-screen
    "
  >
    <main class="flex-grow mt-52 text-center">
      <router-view></router-view>
    </main>
    <footer><Footer /></footer>
  </div>
</template>

<style>
#app {
  text-align: center;
}
</style>
