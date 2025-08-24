<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Roles</h3>
        <router-link to="/roles/create" class="inline-flex items-center px-4 py-2 bg-blue-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150">
          Add Role
        </router-link>
      </div>
      
      <div class="mt-5 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="role in roles" :key="role.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ role.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ role.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <router-link :to="`/roles/edit/${role.id}`" class="text-blue-600 hover:text-blue-900 mr-3">Edit</router-link>
                <button @click="deleteRole(role.id!)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { roleService } from '../services/auth';

interface Role {
  id?: number;
  name: string;
  description: string;
}

const roles = ref<Role[]>([]);

onMounted(async () => {
  await fetchRoles();
});

const fetchRoles = async () => {
  try {
    const response = await roleService.getRoles();
    roles.value = response;
  } catch (error) {
    console.error('Failed to fetch roles:', error);
  }
};

const deleteRole = async (id: number) => {
  if (!confirm('Are you sure you want to delete this role?')) return;
  
  try {
    await roleService.deleteRole(id);
    await fetchRoles();
  } catch (error: any) {
    console.error('Failed to delete role:', error);
    alert(error.message || 'Failed to delete role. Please try again.');
  }
};
</script>