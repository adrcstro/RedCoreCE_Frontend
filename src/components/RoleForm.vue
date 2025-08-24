<template>
  <div class="py-6">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">{{ isEdit ? 'Edit Role' : 'Create Role' }}</h3>
      </div>
      
      <form @submit.prevent="handleSubmit" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name">Role Name</label>
          <input v-model="form.name" id="name" type="text" placeholder="Role Name" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            :class="{ 'border-red-500': errors.name }">
          <p v-if="errors.name" class="text-red-500 text-xs italic">{{ errors.name[0] }}</p>
        </div>
        
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Description</label>
          <textarea v-model="form.description" id="description" placeholder="Role Description" required
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            :class="{ 'border-red-500': errors.description }"></textarea>
          <p v-if="errors.description" class="text-red-500 text-xs italic">{{ errors.description[0] }}</p>
        </div>
        
        <div class="flex items-center justify-between">
          <button type="submit" :disabled="loading"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50">
            {{ loading ? 'Saving...' : (isEdit ? 'Update Role' : 'Create Role') }}
          </button>
          <router-link to="/roles" class="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800">
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
import { roleService } from '../services/auth';

interface Role {
  id?: number;
  name: string;
  description: string;
}

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => route.name === 'EditRole');
const roleId = computed(() => isEdit.value ? parseInt(route.params.id as string) : null);

const form = reactive<Role>({
  name: '',
  description: ''
});

const errors = ref<any>({});
const loading = ref(false);

onMounted(async () => {
  if (isEdit.value && roleId.value) {
    await fetchRole(roleId.value);
  }
});

const fetchRole = async (id: number) => {
  try {
    const role = await roleService.getRole(id);
    Object.assign(form, role);
  } catch (error) {
    console.error('Failed to fetch role:', error);
    router.push('/roles');
  }
};

const handleSubmit = async () => {
  loading.value = true;
  errors.value = {};

  try {
    if (isEdit.value && roleId.value) {
      await roleService.updateRole(roleId.value, form);
    } else {
      await roleService.createRole(form);
    }
    
    router.push('/roles');
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