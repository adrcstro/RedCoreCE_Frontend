<template>
  <nav class="bg-blue-600 text-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center py-4">
        <div class="flex space-x-4">
          <router-link to="/" class="text-xl font-bold">User Management</router-link>
          <router-link to="/users" class="px-3 py-2 rounded hover:bg-blue-700">Users</router-link>
          <router-link to="/roles" class="px-3 py-2 rounded hover:bg-blue-700">Roles</router-link>
        </div>
        <div class="flex items-center space-x-4">
          <span>Welcome, {{ user?.name }}</span>
          <button @click="logout" class="px-3 py-2 rounded hover:bg-blue-700">Logout</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const router = useRouter();
const user = computed(() => authStore.user);

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};
</script>