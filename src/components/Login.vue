<template>
  <div class="flex flex-col lg:flex-row bg-white">
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-md w-full">
        <div class="text-center mb-2">
        <div class="mb-6 sm:mb-8 flex justify-center">
          <div class="relative">
            <div class="w-20 sm:w-24 lg:w-32 h-20 sm:h-24 lg:h-32 bg-white bg-opacity-20 rounded-2xl sm:rounded-3xl flex items-center justify-center backdrop-blur-lg border border-white border-opacity-20 shadow-2xl">
              <UserGroupIcon class="w-10 sm:w-12 lg:w-16 h-10 sm:h-12 lg:h-16 text-gray-800" />
            </div>
            <div class="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-6 sm:w-8 h-6 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
              <CheckBadgeIcon class="w-3 sm:w-4 h-3 sm:h-4 text-yellow-900" />
            </div>
            <div class="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-6 sm:w-8 h-6 sm:h-8 bg-green-400 rounded-full flex items-center justify-center shadow-lg">
              <ShieldCheckIcon class="w-3 sm:w-4 h-3 sm:h-4 text-green-900" />
            </div>
          </div>
        </div> 
          <h2 class="mt-4 sm:mt-6 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">User Role Management System</h2>
          <p class="mt-1 sm:mt-2 text-sm text-gray-600">Please sign in to your account</p>
        </div>
        <div class="bg-white p-6 sm:p-8 rounded-2xl text-start">
          <form class="space-y-4 sm:space-y-6" @submit.prevent="handleLogin">
            
            <div class="space-y-1 sm:space-y-2">
              <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <EnvelopeIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input 
                  id="email" 
                  v-model="form.email" 
                  name="email" 
                  type="email" 
                  autocomplete="email" 
                  required
                  class="block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all duration-200 text-sm sm:text-base"
                  :class="errorsMap.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                  placeholder="Enter your email" 
                />
              </div>
              <p v-if="errorsMap.email" class="text-xs sm:text-sm text-red-600 mt-1">{{ errorsMap.email }}</p>
            </div>
            <div class="space-y-1 sm:space-y-2">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon class="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                </div>
                <input 
                  id="password" 
                  v-model="form.password" 
                  name="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  autocomplete="current-password" 
                  required
                  class="block w-full pl-9 sm:pl-10 pr-3 sm:pr-12 py-2.5 sm:py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all duration-200 text-sm sm:text-base"
                  :class="errorsMap.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                  placeholder="Enter your password" 
                />
              </div>
              <p v-if="errorsMap.password" class="text-xs sm:text-sm text-red-600 mt-1">{{ errorsMap.password }}</p>
            </div>
            <div v-if="errors.length" class="bg-red-50 border border-red-200 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl">
              <div class="flex">
                <ExclamationCircleIcon class="h-4 w-4 sm:h-5 sm:w-5 text-red-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                <ul class="ml-2 sm:ml-3 text-xs sm:text-sm">
                  <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
                </ul>
              </div>
            </div>
            <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl">
              <div class="flex">
                <ShieldCheckIcon class="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" />
                <p class="ml-2 sm:ml-3 text-xs sm:text-sm">{{ successMessage }}</p>
              </div>
            </div>
            <div>
              <button 
                type="submit" 
                :disabled="loading"
                class="group relative w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-transparent text-sm sm:text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <ArrowPathIcon v-if="loading" class="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" />
                <ArrowRightOnRectangleIcon v-else class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span v-if="loading">Signing in...</span>
                <span v-else>Sign in</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import type { LoginData } from '../types/User';

import { 
  LockClosedIcon, 
  EnvelopeIcon, 
  ExclamationCircleIcon, 
  ArrowRightOnRectangleIcon,
  ArrowPathIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const router = useRouter();

const form = reactive<LoginData>({
  email: '',
  password: ''
});

const errors = ref<string[]>([]);
const errorsMap = reactive<{ email?: string; password?: string }>({});
const successMessage = ref('');
const loading = ref(false);
const showPassword = ref(false);

const handleLogin = async () => {
  errors.value = [];
  errorsMap.email = '';
  errorsMap.password = '';
  successMessage.value = '';
  loading.value = true;

  // Basic frontend validation
  if (!form.email) {
    errorsMap.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errorsMap.email = 'Enter a valid email address';
  }
  if (!form.password) {
    errorsMap.password = 'Password is required';
  }

  if (errorsMap.email || errorsMap.password) {
    loading.value = false;
    return;
  }

  try {
    await authStore.login(form);
    successMessage.value = 'Login successful! Redirecting...';
    setTimeout(() => router.push('/'), 1200); // Redirect after a short delay
  } catch (error: any) {
    if (error.error) {
      errors.value = [error.error];
    } else if (error.message) {
      errors.value = [error.message];
    } else if (error.errors) {
      for (const key in error.errors) {
        errors.value.push(...error.errors[key]);
      }
    } else {
      errors.value = ['Wrong email or password. Please try again.'];
    }
  } finally {
    loading.value = false;
  }
};
</script>