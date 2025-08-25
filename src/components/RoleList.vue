<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Roles Information Table</h3>
<router-link
    to="/roles/create"
  class="group relative flex justify-center items-center py-2 px-3 border border-transparent 
         text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 
         hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
         focus:ring-blue-500 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] 
         shadow-lg hover:shadow-xl"
>
  <PlusIcon class=" text-white h-5 w-5 mr-2" />
  <span class="text-white">Add Role</span>
</router-link>
      </div>
      
      <div v-if="message" class="mb-4">
        <div
          :class="[
            'p-3 rounded-md text-sm font-medium',
            messageType === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          ]"
        >
          {{ message }}
        </div>
      </div>


<div class="flex items-center mb-4">
  <div class="relative w-full">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
    </div>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search roles..."
      class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
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
            <tr v-for="role in paginatedRoles" :key="role.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ role.name }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ role.description }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3">
                <router-link
                  :to="`/roles/edit/${role.id}`"
                  class="text-blue-600 hover:text-blue-900 flex items-center"
                >
                  <PencilSquareIcon class="w-4 h-4 mr-1" /> Edit
                </router-link>
                <button
                  @click="deleteRole(role.id)"
                  class="text-red-600 hover:text-red-900 flex items-center"
                >
                  <TrashIcon class="w-4 h-4 mr-1" /> Delete
                </button>
              </td>
            </tr>
            <tr v-if="paginatedRoles.length === 0">
              <td colspan="3" class="px-6 py-4 text-center text-sm text-gray-500">
                No roles found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    
      <div class="flex justify-between items-center mt-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 flex items-center"
        >
          Prev
        </button>
        <span class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50 flex items-center"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from "vue";
import { roleService } from "../services/auth";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

// Heroicons
import { MagnifyingGlassIcon, PlusIcon, PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/outline";

interface Role {
  id: number;
  name: string;
  description: string;
}

const authStore = useAuthStore();
const router = useRouter();
const roles = ref<Role[]>([]);
const searchQuery = ref("");
const message = ref("");
const messageType = ref<"success" | "error">("success");

// Pagination state
const currentPage = ref(1);
const itemsPerPage = 5;

onMounted(async () => {
  await fetchRoles();
});

const fetchRoles = async () => {
  try {
    const response = await roleService.getRoles();
    roles.value = response;
  } catch (error) {
    console.error("Failed to fetch roles:", error);
  }
};

// Filter roles by search
const filteredRoles = computed(() => {
  if (!searchQuery.value) return roles.value;
  return roles.value.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Pagination logic
const totalPages = computed(() =>
  Math.ceil(filteredRoles.value.length / itemsPerPage)
);

const paginatedRoles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredRoles.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Delete Role with validation message
const deleteRole = async (id: number) => {
  if (!confirm("Are you sure you want to delete this role?")) return;

  try {
    await roleService.deleteRole(id);
    await fetchRoles();
    message.value = "Role deleted successfully!";
    messageType.value = "success";
  } catch (error: any) {
    console.error("Failed to delete role:", error);
    message.value = error.message || "Failed to delete role. Please try again.";
    messageType.value = "error";
  }
};

// Redirect if not admin
watch(
  () => authStore.user,
  (val) => {
    if (val?.role_id !== 1) router.push("/");
  },
  { immediate: true }
);
</script>
