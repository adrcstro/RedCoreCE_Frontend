<template>
  <div class="flex flex-col bg-white">
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <!-- Make form wider -->
      <div class="max-w-5xl w-full">
        <!-- Header -->
        <div class="text-center mt-12 mb-2">
          <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {{ isEdit ? 'Edit User' : 'Create User Information' }}
          </h2>
          <p class="mt-1 text-sm text-gray-600">
            Manage system users and assign roles.
          </p>
        </div>

        <!-- Form -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl text-start">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            
            <!-- Full Name + Email in same row -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Full Name -->
              <div class="space-y-1">
                <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Enter full name"
                    class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 
                          focus:outline-none focus:ring-2 transition-all duration-200 text-base"
                    :class="errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                  />
                </div>
                <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name[0] }}</p>
              </div>

              <!-- Email -->
              <div class="space-y-1">
                <label for="email" class="block text-sm font-medium text-gray-700">Email Address</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <EnvelopeIcon class="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email address"
                    class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 
                          focus:outline-none focus:ring-2 transition-all duration-200 text-base"
                    :class="errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                  />
                </div>
                <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ errors.email[0] }}</p>
              </div>
            </div>

            <!-- Role -->
            <div class="space-y-1">
              <label for="role" class="block text-sm font-medium text-gray-700">Role</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdentificationIcon class="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="role"
                  v-model="form.role_id"
                  class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm text-gray-900 focus:outline-none 
                        focus:ring-2 transition-all duration-200 text-base"
                  :class="errors.role_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                >
                  <option value="">Select a role</option>
                  <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                </select>
              </div>
              <p v-if="errors.role_id" class="text-sm text-red-600 mt-1">{{ errors.role_id[0] }}</p>
            </div>

            <!-- Password (only on create) -->
            <div class="space-y-1" v-if="!isEdit">
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  v-model="form.password"
                  type="password"
                  placeholder="Enter password"
                  class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 
                        focus:outline-none focus:ring-2 transition-all duration-200 text-base"
                  :class="errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                />
              </div>
              <p v-if="errors.password" class="text-sm text-red-600 mt-1">{{ errors.password[0] }}</p>
              <p class="text-xs text-gray-500 mt-1">Minimum length: 8 characters</p>
            </div>

            <!-- Confirm Password (only on create) -->
            <div class="space-y-1" v-if="!isEdit">
              <label for="password_confirmation" class="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CheckCircleIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password_confirmation"
                  v-model="form.password_confirmation"
                  type="password"
                  placeholder="Confirm password"
                  class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 
                        focus:outline-none focus:ring-2 transition-all duration-200 text-base"
                  :class="errors.password_confirmation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                />
              </div>
              <p v-if="errors.password_confirmation" class="text-sm text-red-600 mt-1">{{ errors.password_confirmation[0] }}</p>
            </div>

            <!-- Alerts -->
            <div v-if="generalErrors.length" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              <div class="flex">
                <ExclamationCircleIcon class="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <ul class="ml-3 text-sm">
                  <li v-for="(err, idx) in generalErrors" :key="idx">{{ err }}</li>
                </ul>
              </div>
            </div>

            <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
              <div class="flex">
                <ClipboardDocumentCheckIcon class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p class="ml-3 text-sm">{{ successMessage }}</p>
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex items-center justify-between gap-4">
              <button
                type="submit"
                :disabled="loading"
                class="w-full group relative flex justify-center items-center py-3 px-6 border border-transparent 
                       text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 
                       hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
                       focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all 
                       duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <ArrowPathIcon v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                <UserPlusIcon v-else class="h-5 w-5 mr-2" />
                <span>{{ loading ? 'Saving...' : (isEdit ? 'Update User' : 'Create User') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { User } from '../types/User'
import { userService, roleService } from '../services/auth'

// Heroicons
import {
  UserIcon,
  EnvelopeIcon,
  IdentificationIcon,
  KeyIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'EditUser')
const userId = computed(() => (isEdit.value ? parseInt(route.params.id as string) : null))

const form = reactive<User>({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  role_id: 0
})

const roles = ref<any[]>([])
const errors = ref<any>({})
const loading = ref(false)
const generalErrors = ref<string[]>([])
const successMessage = ref<string>('')

onMounted(async () => {
  await fetchRoles()
  if (isEdit.value && userId.value) {
    await fetchUser(userId.value)
  }
})

const fetchRoles = async () => {
  try {
    const response = await roleService.getRoles()
    roles.value = response
  } catch (error) {
    console.error('Failed to fetch roles:', error)
  }
}

const fetchUser = async (id: number) => {
  try {
    const user = await userService.getUser(id)
    Object.assign(form, user)
  } catch (error) {
    console.error('Failed to fetch user:', error)
    router.push('/users')
  }
}

const handleSubmit = async () => {
  loading.value = true
  errors.value = {}
  generalErrors.value = []
  successMessage.value = ''

  try {
    if (isEdit.value && userId.value) {
      const { id, password, password_confirmation, ...rest } = form
      const payload: any = { ...rest }

      if (password) payload.password = password
      if (password_confirmation) payload.password_confirmation = password_confirmation

      await userService.updateUser(userId.value, payload)
      successMessage.value = 'User updated successfully!'
    } else {
      await userService.createUser(form)
      successMessage.value = 'User created successfully!'
    }
    setTimeout(() => router.push('/users'), 1000)
  } catch (error: any) {
    if (error.response?.data?.errors) {
      errors.value = error.response.data.errors
    } else if (error.message) {
      generalErrors.value = [error.message]
    } else {
      generalErrors.value = ['An unexpected error occurred']
    }
  } finally {
    loading.value = false
  }
}
</script>
