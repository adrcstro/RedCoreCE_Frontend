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
            
            <!-- Full Name and Email in same row -->
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
                <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ getEmailErrorMessage() }}</p>
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

            <!-- Password (only on create or when editing with password change) -->
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
                  @blur="validatePassword"
                  @input="validatePassword"
                  class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 
                        focus:outline-none focus:ring-2 transition-all duration-200 text-base"
                  :class="(errors.password || validationErrors.password) ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                />
              </div>
              <p v-if="errors.password" class="text-sm text-red-600 mt-1">{{ errors.password[0] }}</p>
              <p v-else-if="validationErrors.password" class="text-sm text-red-600 mt-1">{{ validationErrors.password }}</p>
              <div class="flex items-center mt-1 space-x-4">
                <p class="text-xs text-gray-500">Minimum length: 8 characters</p>
                <div v-if="form.password" class="flex items-center">
                  <div class="w-2 h-2 rounded-full mr-1" :class="passwordStrengthColor"></div>
                  <span class="text-xs" :class="passwordStrengthColor.replace('bg-', 'text-')">
                    {{ passwordStrengthText }}
                  </span>
                </div>
              </div>
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
                  @blur="validatePasswordConfirmation"
                  @input="validatePasswordConfirmation"
                  class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 
                        focus:outline-none focus:ring-2 transition-all duration-200 text-base"
                  :class="(errors.password_confirmation || validationErrors.password_confirmation) ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                />
              </div>
              <p v-if="errors.password_confirmation" class="text-sm text-red-600 mt-1">{{ errors.password_confirmation[0] }}</p>
              <p v-else-if="validationErrors.password_confirmation" class="text-sm text-red-600 mt-1">{{ validationErrors.password_confirmation }}</p>
              <div v-if="form.password_confirmation && !validationErrors.password_confirmation && !errors.password_confirmation" class="flex items-center mt-1">
                <CheckCircleIcon class="h-4 w-4 text-green-500 mr-1" />
                <span class="text-xs text-green-600">Passwords match</span>
              </div>
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
                :disabled="loading || !isFormValid"
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
const validationErrors = ref<any>({})
const loading = ref(false)
const generalErrors = ref<string[]>([])
const successMessage = ref<string>('')

// Password strength indicator
const passwordStrengthColor = computed(() => {
  const password = form.password
  if (!password) return 'bg-gray-300'
  if (password.length < 8) return 'bg-red-500'
  if (password.length >= 8 && password.length < 12) return 'bg-yellow-500'
  return 'bg-green-500'
})

const passwordStrengthText = computed(() => {
  const password = form.password
  if (!password) return ''
  if (password.length < 8) return 'Too short'
  if (password.length >= 8 && password.length < 12) return 'Good'
  return 'Strong'
})

// Form validation computed property
const isFormValid = computed(() => {
  if (isEdit.value) {
    // For edit mode, basic validation
    return form.name && form.email && form.role_id && !Object.keys(validationErrors.value).length
  } else {
    // For create mode, include password validation
    return (
      form.name &&
      form.email &&
      form.role_id &&
      form.password &&
      form.password_confirmation &&
      !Object.keys(validationErrors.value).length
    )
  }
})

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

// Password validation function
const validatePassword = () => {
  const password = form.password
  validationErrors.value = { ...validationErrors.value }
  
  if (!isEdit.value) { // Only validate on create mode
    if (!password) {
      validationErrors.value.password = 'Password is required'
    } else if (password.length < 8) {
      validationErrors.value.password = 'Password must be at least 8 characters long'
    } else {
      delete validationErrors.value.password
    }
  }
  
  // Also validate password confirmation when password changes
  if (form.password_confirmation) {
    validatePasswordConfirmation()
  }
}

// Password confirmation validation function
const validatePasswordConfirmation = () => {
  const password = form.password
  const passwordConfirmation = form.password_confirmation
  validationErrors.value = { ...validationErrors.value }
  
  if (!isEdit.value) { // Only validate on create mode
    if (!passwordConfirmation) {
      validationErrors.value.password_confirmation = 'Password confirmation is required'
    } else if (password !== passwordConfirmation) {
      validationErrors.value.password_confirmation = 'Passwords do not match'
    } else {
      delete validationErrors.value.password_confirmation
    }
  }
}

// Function to get custom email error message
const getEmailErrorMessage = () => {
  if (!errors.value.email) return ''
  
  const emailError = errors.value.email[0]
  
  // Check if the error indicates email already exists
  if (emailError && (
    emailError.toLowerCase().includes('already') ||
    emailError.toLowerCase().includes('exists') ||
    emailError.toLowerCase().includes('taken') ||
    emailError.toLowerCase().includes('duplicate')
  )) {
    return 'This email already exists'
  }
  
  // Return original error message for other email validation errors
  return emailError
}

const handleSubmit = async () => {
  // Clear previous errors
  errors.value = {}
  validationErrors.value = {}
  generalErrors.value = []
  successMessage.value = ''

  // Run client-side validation
  if (!isEdit.value) {
    validatePassword()
    validatePasswordConfirmation()
    
    // Check if there are validation errors
    if (Object.keys(validationErrors.value).length > 0) {
      generalErrors.value = ['Please fix the validation errors before submitting']
      return
    }
  }

  // Basic required field validation
  if (!form.name) {
    validationErrors.value.name = ['Full name is required']
  }
  if (!form.email) {
    validationErrors.value.email = ['Email is required']
  }
  if (!form.role_id) {
    validationErrors.value.role_id = ['Role is required']
  }

  if (Object.keys(validationErrors.value).length > 0) {
    generalErrors.value = ['Please fill in all required fields']
    return
  }

  loading.value = true

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
    } else if (error.response?.status === 422) {
      // Handle specific 422 errors
      if (error.response?.data?.message) {
        // Check if it's an email duplicate error
        const message = error.response.data.message.toLowerCase()
        if (message.includes('email') && (message.includes('already') || message.includes('exists') || message.includes('taken'))) {
          errors.value = { email: ['This email already exists'] }
        } else {
          generalErrors.value = [error.response.data.message]
        }
      } else {
        generalErrors.value = ['This email already exists. Please choose another.']
      }
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