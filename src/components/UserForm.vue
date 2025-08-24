<template>
  <div class="py-6">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ isEdit ? 'Edit User' : 'Create User' }}</h3>
      </div>
      
      <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Full Name</label>
          <input v-model="form.name" id="name" type="text" placeholder="Full Name" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.name }">
          <p v-if="errors.name" class="text-red-500 text-xs italic">{{ errors.name[0] }}</p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email Address</label>
          <input v-model="form.email" id="email" type="email" placeholder="Email Address" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.email }">
          <p v-if="errors.email" class="text-red-500 text-xs italic">{{ errors.email[0] }}</p>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="role">Role</label>
          <select v-model="form.role_id" id="role" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.role_id }">
            <option value="">Select a role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
          </select>
          <p v-if="errors.role_id" class="text-red-500 text-xs italic">{{ errors.role_id[0] }}</p>
        </div>
        
        <div class="mb-4" v-if="!isEdit">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input v-model="form.password" id="password" type="password" placeholder="Password" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.password }">
          <p v-if="errors.password" class="text-red-500 text-xs italic">{{ errors.password[0] }}</p>
          <p class="text-gray-600 text-xs mt-1">Minimum length: 8 characters</p>
        </div>
        
        <div class="mb-6" v-if="!isEdit">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password_confirmation">Confirm Password</label>
          <input v-model="form.password_confirmation" id="password_confirmation" type="password" placeholder="Confirm Password" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.password_confirmation }">
          <p v-if="errors.password_confirmation" class="text-red-500 text-xs italic">{{ errors.password_confirmation[0] }}</p>
        </div>
        
        <div class="flex items-center justify-between">
          <button type="submit" :disabled="loading"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
            {{ loading ? 'Saving...' : (isEdit ? 'Update User' : 'Create User') }}
          </button>
          <router-link to="/users" class="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { User } from '../types/User';
import { userService, roleService } from '../services/auth';

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => route.name === 'EditUser');
const userId = computed(() => isEdit.value ? parseInt(route.params.id as string) : null);

const form = reactive<User>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role_id: 0
});

const roles = ref<any[]>([]);
const errors = ref<any>({});
const loading = ref(false);

onMounted(async () => {
  await fetchRoles();
  
  if (isEdit.value && userId.value) {
    await fetchUser(userId.value);
  }
});

const fetchRoles = async () => {
  try {
    const response = await roleService.getRoles();
    roles.value = response;
  } catch (error) {
    console.error('Failed to fetch roles:', error);
  }
};

const fetchUser = async (id: number) => {
  try {
    const user = await userService.getUser(id);
    Object.assign(form, user);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    router.push('/users');
  }
};

const handleSubmit = async () => {
  loading.value = true;
  errors.value = {};

  try {
    if (isEdit.value && userId.value) {
      await userService.updateUser(userId.value, form);
    } else {
      await userService.createUser(form);
    }
    
    router.push('/users');
  } catch (error: any) {
    if (error.errors) {
      errors.value = error.errors;
    } else {
      alert(error.message || 'An error occurred');
    }
  } finally {
    loading.value = false;
  }
};
</script>