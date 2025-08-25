<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Welcome to the User Management System</p>
      </div>
      
      <!-- Only show analytics cards for role_id = 1 -->
      <div v-if="user?.role_id === 1" class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ stats.users }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <router-link to="/users" class="font-medium text-blue-600 hover:text-blue-500"> View all users </router-link>
            </div>
          </div>
        </div>

        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">Total Roles</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">{{ stats.roles }}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-4 sm:px-6">
            <div class="text-sm">
              <router-link to="/roles" class="font-medium text-blue-600 hover:text-blue-500"> View all roles </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Show welcome message only for role_id = 2 -->
      <div v-else class="mt-5 bg-white overflow-hidden shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900">Welcome, {{ user?.name }}</h3>
            <p class="mt-2 text-sm text-gray-500">You are logged in as a regular user.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { userService, roleService } from '../services/auth';
import { useAuthStore } from '../store/auth';

interface Stats {
  users: number;
  roles: number;
}

const stats = ref<Stats>({
  users: 0,
  roles: 0
});

const authStore = useAuthStore();
const user = computed(() => authStore.user);

onMounted(async () => {
  // Only fetch stats if user has role_id = 1
  if (user.value?.role_id === 1) {
    try {
      const [users, roles] = await Promise.all([
        userService.getUsers(),
        roleService.getRoles()
      ]);
      
      stats.value = {
        users: users.length,
        roles: roles.length
      };
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  }
});
</script>