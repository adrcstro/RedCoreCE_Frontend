<template>
  <div class="flex flex-col bg-white">
    <div class="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
      <div class="max-w-3xl w-full">
        <!-- Header -->
        <div class="text-center mt-12 mb-2">
          <h2 class="mt-2 text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {{ isEdit ? 'Edit Role' : 'Create User Role' }}
          </h2>
          <p class="mt-1 text-sm text-gray-600">
            Define access roles and permissions for users in the system.
          </p>
        </div>

        <!-- Form -->
        <div class="bg-white p-6 sm:p-8 rounded-2xl text-start">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <!-- Role Name -->
            <div class="space-y-1">
              <label for="name" class="block text-sm font-medium text-gray-700">Role Name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IdentificationIcon class="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  v-model="form.name"
                  name="name"
                  type="text"
                  placeholder="Enter role name"
                  class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all duration-200 text-base"
                  :class="errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                  @blur="validateField('name')"
                />
              </div>
              <p v-if="errors.name" class="text-sm text-red-600 mt-1">{{ errors.name }}</p>
            </div>

            <!-- Role Description -->
            <div class="space-y-1">
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <div class="relative">
                <div class="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                  <ClipboardDocumentListIcon class="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="description"
                  v-model="form.description"
                  name="description"
                  placeholder="Enter role description"
                  class="block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 transition-all duration-200 text-base h-32"
                  :class="errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'"
                  @blur="validateField('description')"
                ></textarea>
              </div>
              <p v-if="errors.description" class="text-sm text-red-600 mt-1">{{ errors.description }}</p>
            </div>

            <!-- Error Alerts -->
            <div v-if="generalErrors.length" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              <div class="flex">
                <ExclamationCircleIcon class="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <ul class="ml-3 text-sm">
                  <li v-for="(err, idx) in generalErrors" :key="idx">{{ err }}</li>
                </ul>
              </div>
            </div>

            <!-- Success Alert -->
            <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl">
              <div class="flex">
                <ClipboardDocumentCheckIcon class="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <p class="ml-3 text-sm">{{ successMessage }}</p>
              </div>
            </div>

            <!-- Buttons -->
            <div>
              <button
                type="submit"
                :disabled="loading"
                class="w-full group relative flex justify-center items-center py-3 px-6 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                <ArrowPathIcon v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
                <ClipboardDocumentCheckIcon v-else class="h-5 w-5 mr-2" />
                <span>{{ loading ? 'Saving...' : (isEdit ? 'Update Role' : 'Create Role') }}</span>
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
import { roleService } from '../services/auth'

// Heroicons
import {
  IdentificationIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  ExclamationCircleIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

interface Role {
  id?: number
  name: string
  description: string
}

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => route.name === 'EditRole')
const roleId = computed(() => (isEdit.value ? parseInt(route.params.id as string) : null))

const form = reactive<Role>({
  name: '',
  description: ''
})

const errors = ref<Record<string, string>>({})
const generalErrors = ref<string[]>([])
const successMessage = ref<string>('')

const loading = ref(false)

onMounted(async () => {
  if (isEdit.value && roleId.value) {
    await fetchRole(roleId.value)
  }
})

const fetchRole = async (id: number) => {
  try {
    const role = await roleService.getRole(id)
    Object.assign(form, role)
  } catch (error) {
    console.error('Failed to fetch role:', error)
    router.push('/roles')
  }
}

// Validation rules
const validateField = (field: keyof Role) => {
  if (field === 'name') {
    if (!form.name.trim()) {
      errors.value.name = 'Role name is required'
    } else if (form.name.length < 3) {
      errors.value.name = 'Role name must be at least 3 characters'
    } else {
      delete errors.value.name
    }
  }

  if (field === 'description') {
    if (!form.description.trim()) {
      errors.value.description = 'Description is required'
    } else if (form.description.length < 10) {
      errors.value.description = 'Description must be at least 10 characters'
    } else {
      delete errors.value.description
    }
  }
}

const validateForm = () => {
  validateField('name')
  validateField('description')
  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  generalErrors.value = []
  successMessage.value = ''
  if (!validateForm()) return

  loading.value = true
  try {
    if (isEdit.value && roleId.value) {
      await roleService.updateRole(roleId.value, form)
      successMessage.value = 'Role updated successfully!'
    } else {
      await roleService.createRole(form)
      successMessage.value = 'Role created successfully!'
    }
    setTimeout(() => router.push('/roles'), 1000)
  } catch (error: any) {
    // Handle validation errors
    if (error.response && error.response.status === 422) {
      // check backend response
      if (error.response.data?.errors?.name) {
        errors.value.name = 'This role name already exists. Please choose another.'
      } else {
        generalErrors.value = ['This role name already exists. Please choose another.']
      }
    } else if (error.errors) {
      errors.value = error.errors
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
