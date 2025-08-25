<template>
  
  <nav class="fixed top-0 left-0 right-0 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg z-50">
    <div class="w-full px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex justify-between items-center py-3 sm:py-4">
       
        <div class="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
         
          <router-link to="/" class="flex items-center space-x-1 sm:space-x-2 text-lg sm:text-xl font-bold text-blue-50 hover:text-white transition-all duration-300 hover:scale-105">
            <UserGroupIcon class="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-100 hover:text-white transition-colors duration-300" />
            <span class="text-white ">User Management</span>
          </router-link>
          
      
          <div class="hidden lg:flex items-center space-x-2 xl:space-x-4">
           
            <router-link 
              v-if="user?.role_id !== 2" 
              to="/users" 
              class="flex items-center space-x-1 xl:space-x-2 px-2 xl:px-4 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-blue-400/30"
              :class="{ 'bg-blue-500/60 text-white border-blue-400/40': $route.path === '/users' }"
            >
              <UserGroupIcon class="text-white w-4 h-4 xl:w-5 xl:h-5 group-hover:scale-110 transition-transform duration-300 group-hover:text-white" />
              <span class="text-white text-sm xl:text-base">Users</span>
            </router-link>
            
       
            <router-link 
              v-if="user?.role_id !== 2" 
              to="/roles" 
              class="flex items-center space-x-1 xl:space-x-2 px-2 xl:px-4 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 group border border-transparent hover:border-blue-400/30"
              :class="{ 'bg-blue-500/60 text-white border-blue-400/40': $route.path === '/roles' }"
            >
              <ShieldCheckIcon class="text-white w-4 h-4 xl:w-5 xl:h-5 group-hover:scale-110 transition-transform duration-300 group-hover:text-white" />
              <span class="text-white text-sm xl:text-base">Roles</span>
            </router-link>
          </div>
        </div>

       
        <div class="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
         
          <div class="hidden md:flex items-center space-x-2 text-xs lg:text-sm xl:text-base text-blue-100">
            <UserIcon class="w-4 h-4 lg:w-5 lg:h-5 text-blue-200" />
            <span class="text-white truncate max-w-[120px] lg:max-w-none">Welcome, {{ user?.name }}</span>
          </div>

         
          <div class="relative">
            <button 
              @click="toggleDropdown"
              class="flex items-center space-x-1 sm:space-x-2 p-1.5 sm:p-2 rounded-lg text-blue-100 hover:text-blue-700 hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 group border border-transparent"
            >  
              <CogIcon class="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300 text-blue-700 group-hover:text-blue-700" />
              <span class="text-blue-700 group-hover:text-blue-700 text-sm sm:text-base hidden sm:inline">Settings</span>
            </button>
            
         
            <div 
              v-if="dropdownOpen" 
              class="absolute right-0 mt-2 w-40 sm:w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-blue-200/30 py-2 z-50 animate-slideDown"
              @click.away="dropdownOpen = false"
            >
              <a href="#" class="flex items-center space-x-2 px-3 sm:px-4 py-2 text-blue-700 hover:bg-blue-50/80 hover:text-blue-800 transition-colors duration-200">
                <UserIcon class="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span class="text-sm sm:text-base">Profile</span>
              </a>
              <a href="#" class="flex items-center space-x-2 px-3 sm:px-4 py-2 text-blue-700 hover:bg-blue-50/80 hover:text-blue-800 transition-colors duration-200">
                <CogIcon class="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span class="text-sm sm:text-base">Settings</span>
              </a>
              <hr class="my-1 border-blue-200/30">
              <button 
                @click="logout" 
                class="flex items-center space-x-2 w-full px-3 sm:px-4 py-2 text-red-600 hover:bg-red-50/80 hover:text-red-700 transition-colors duration-200"
              >
                <ArrowRightOnRectangleIcon class="w-4 h-4 text-red-500 flex-shrink-0" />
                <span class="text-sm sm:text-base">Logout</span>
              </button>
            </div>
          </div>

         
          <button 
            @click="toggleMobileMenu"
            class="lg:hidden p-1.5 sm:p-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-400/30"
          >
            <Bars3Icon v-if="!mobileMenuOpen" class="w-5 h-5 sm:w-6 sm:h-6 text-blue-800 hover:text-blue-700 transition-colors duration-300" />
            <XMarkIcon v-else class="w-5 h-5 sm:w-6 sm:h-6 text-blue-800 hover:text-blue-700 transition-colors duration-300" />
          </button>
        </div>
      </div>

    
      <div 
        v-if="mobileMenuOpen" 
        class="lg:hidden border-t border-blue-400/30 py-3 sm:py-4 animate-slideDown bg-blue-600/20 backdrop-blur-sm"
      >
        <div class="flex flex-col space-y-2">
          
          <div class="md:hidden flex items-center space-x-2 px-4 py-2 text-blue-100 border-b border-blue-400/20 mb-2">
            <UserIcon class="w-5 h-5 text-white" />
            <span class="text-white text-sm truncate">Welcome, {{ user?.name }}</span>
          </div>
          
          <router-link 
            v-if="user?.role_id !== 2" 
            to="/users" 
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-400/30"
          >
            <UserGroupIcon class="w-5 h-5 sm:w-5 sm:h-5 text-blue-200 hover:text-white transition-colors duration-300 flex-shrink-0" />
            <span class="text-white text-sm truncate">Users</span>
          </router-link>
          
          <router-link 
            v-if="user?.role_id !== 2" 
            to="/roles" 
            @click="mobileMenuOpen = false"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-blue-100 hover:text-white hover:bg-blue-500/50 backdrop-blur-sm transition-all duration-300 border border-transparent hover:border-blue-400/30"
          >
            <ShieldCheckIcon class="w-5 h-5 sm:w-5 sm:h-5 text-blue-200 hover:text-white transition-colors duration-300 flex-shrink-0" />
            <span class="text-white text-sm truncate">Roles</span>
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
import {
  UserGroupIcon,
  ShieldCheckIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const router = useRouter();
const user = computed(() => authStore.user);


const dropdownOpen = ref(false);
const mobileMenuOpen = ref(false);

const logout = async () => {
  await authStore.logout();
  router.push('/login');
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
 
  if (mobileMenuOpen.value) {
    mobileMenuOpen.value = false;
  }
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;

  if (dropdownOpen.value) {
    dropdownOpen.value = false;
  }
};


const handleClickOutside = () => {
  dropdownOpen.value = false;
  mobileMenuOpen.value = false;
};


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


.backdrop-blur-sm {
  backdrop-filter: blur(4px);
}

.backdrop-blur-md {
  backdrop-filter: blur(8px);
}
</style>