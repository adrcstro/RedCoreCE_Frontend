<template>
  <div class="py-6">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Users</h3>
        <router-link
          to="/users/create"
          class="inline-flex items-center px-4 py-2 bg-gray-100 sahdow-md border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-blue-700 active:bg-blue-900 focus:outline-none focus:border-blue-900 focus:ring ring-blue-300 disabled:opacity-25 transition ease-in-out duration-150"
        >
          <PlusIcon class="w-4 h-4 mr-2" /> Add User
        </router-link>
      </div>

      <!-- Feedback Message -->
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

      <!-- Search Bar -->
      <div class="flex items-center mb-4">
        <div class="relative w-full">
          <div
            class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
          >
            <MagnifyingGlassIcon class="w-5 h-5 text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search users..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      <!-- Table -->
      <div
        class="mt-5 shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
      >
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in paginatedUsers" :key="user.id">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ user.name }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-500">{{ user.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"
                >
                  {{ user.role?.name }}
                </span>
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm font-medium flex space-x-3"
              >
                <router-link
                  :to="`/users/edit/${user.id}`"
                  class="text-blue-600 hover:text-blue-900 flex items-center"
                >
                  <PencilSquareIcon class="w-4 h-4 mr-1" /> Edit
                </router-link>
                <button
                  @click="deleteUser(user.id!)"
                  class="text-red-600 hover:text-red-900 flex items-center"
                >
                  <TrashIcon class="w-4 h-4 mr-1" /> Delete
                </button>
              </td>
            </tr>
            <tr v-if="paginatedUsers.length === 0">
              <td
                colspan="4"
                class="px-6 py-4 text-center text-sm text-gray-500"
              >
                No users found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
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
import type { User } from "../types/User";
import { userService } from "../services/auth";
import { useAuthStore } from "../store/auth";
import { useRouter } from "vue-router";

// Heroicons
import {
  MagnifyingGlassIcon,
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";

const authStore = useAuthStore();
const router = useRouter();
const users = ref<User[]>([]);
const searchQuery = ref("");
const message = ref("");
const messageType = ref<"success" | "error">("success");

// Pagination
const currentPage = ref(1);
const itemsPerPage = 5;

onMounted(async () => {
  await fetchUsers();
});

const fetchUsers = async () => {
  try {
    const response = await userService.getUsers();
    users.value = response;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};

// Filtered Users
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value;
  return users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      u.role?.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Pagination logic
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(start, start + itemsPerPage);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

// Delete User with validation
const deleteUser = async (id: number) => {
  if (!confirm("Are you sure you want to delete this user?")) return;

  try {
    await userService.deleteUser(id);
    await fetchUsers();
    message.value = "User deleted successfully!";
    messageType.value = "success";
  } catch (error: any) {
    console.error("Failed to delete user:", error);
    message.value = error.message || "Failed to delete user. Please try again.";
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
