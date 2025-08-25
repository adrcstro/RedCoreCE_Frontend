<template>
  <!-- Fixed positioning with full width -->
  <nav class="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg z-50">
    <div class="w-full px-6 lg:px-8">
      <div class="flex justify-between items-center py-4">
        <!-- Left side - Logo and Navigation -->
        <div class="flex items-center space-x-6">
          <!-- Logo with icon -->
          <router-link to="/" class="flex items-center space-x-2 text-xl font-bold text-blue-50 hover:text-white transition-all duration-300 hover:scale-105">
            <svg class="w-8 h-8 text-blue-100 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span>User Management</span>
          </router-link>
          
          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-4">
            <!-- Users Link -->
            <router-link 
              v-if="user?.role_id !== 2" 
              to="/users" 
              class="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-blue-400/30"
              :class="{ 'bg-blue-500/60 text-white border-blue-400/40': $route.path === '/users' }"
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-blue-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              <span>Users</span>
            </router-link>
            
            <!-- Roles Link -->
            <router-link 
              v-if="user?.role_id !== 2" 
              to="/roles" 
              class="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-blue-400/30"
              :class="{ 'bg-blue-500/60 text-white border-blue-400/40': $route.path === '/roles' }"
            >
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform duration-300 text-blue-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Roles</span>
            </router-link>
          </div>
        </div>

        <!-- Right side - User info and actions -->
        <div class="flex items-center space-x-4">
          <!-- User greeting -->
          <div class="hidden sm:flex items-center space-x-2 text-sm lg:text-base text-blue-100">
            <svg class="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Welcome, {{ user?.name }}</span>
          </div>

          <!-- Settings dropdown button -->
          <div class="relative">
            <button 
              @click="toggleDropdown"
              class="flex items-center space-x-2 p-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-blue-400/30"
            >
              <svg class="w-5 h-5 group-hover:rotate-180 transition-transform duration-300 text-blue-200 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <!-- Dropdown menu -->
            <div 
              v-if="dropdownOpen" 
              class="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-blue-200/30 py-2 z-50 animate-slideDown"
              @click.away="dropdownOpen = false"
            >
              <a href="#" class="flex items-center space-x-2 px-4 py-2 text-blue-700 hover:bg-blue-50/80 hover:text-blue-800 transition-colors duration-200">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </a>
              <a href="#" class="flex items-center space-x-2 px-4 py-2 text-blue-700 hover:bg-blue-50/80 hover:text-blue-800 transition-colors duration-200">
                <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </a>
              <hr class="my-1 border-blue-200/30">
              <button 
                @click="logout" 
                class="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50/80 hover:text-red-700 transition-colors duration-200"
              >
                <svg class="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <button 
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-400/30"
          >
            <svg v-if="!mobileMenuOpen" class="w-6 h-6 text-blue-200 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-6 h-6 text-blue-200 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      <div 
        v-if="mobileMenuOpen" 
        class="md:hidden border-t border-blue-400/30 py-4 animate-slideDown bg-blue-600/20 backdrop-blur-sm"
      >
        <div class="flex flex-col space-y-2">
          <router-link 
            v-if="user?.role_id !== 2" 
            to="/users" 
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-400/30"
          >
            <svg class="w-5 h-5 text-blue-200 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span>Users</span>
          </router-link>
          
          <router-link 
            v-if="user?.role_id !== 2" 
            to="/roles" 
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-400/30"
          >
            <svg class="w-5 h-5 text-blue-200 hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Roles</span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const router = useRouter();
const user = computed(() => authStore.user);

// Reactive state for interactive elements
const dropdownOpen = ref(false);
const mobileMenuOpen = ref(false);

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
  // Close mobile menu if open
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
  }
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  // Close dropdown if open
  if (dropdownOpen.value) {
    dropdownOpen.value = false;
  }
};

// Close dropdowns when clicking outside
const handleClickOutside = () => {
  dropdownOpen.value = false;
  mobileMenuOpen.value = false;
};

// You might want to add this to handle outside clicks
// onMounted(() => {
//   document.addEventListener('click', handleClickOutside);
// });
</script>

<style scoped>
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slideDown {
  animation: slideDown 0.3s ease-out;
}

/* Smooth backdrop blur effect */
.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-md {
  backdrop-filter: blur(8px);
}
</style>