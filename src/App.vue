<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { onMounted } from 'vue'
import { useUserStore } from './stores/users';

const userStore = useUserStore()

onMounted(async () => {
  await userStore.getUser()
})

</script>

<template>
  <main>
    <Navbar />
    <RouterView />
  </main>
</template>

<style scoped></style>
