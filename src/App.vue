<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar v-if="isAuthenticated" />
    <main class="container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from './store/auth';
import Navbar from './components/Navbar.vue';

const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>