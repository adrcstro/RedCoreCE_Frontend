import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Dashboard from '../components/Dashboard.vue';
import UserList from '../components/UserList.vue';
import UserForm from '../components/UserForm.vue';
import RoleList from '../components/RoleList.vue';
import RoleForm from '../components/RoleForm.vue';
import { useAuthStore } from '../store/auth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/users',
    name: 'Users',
    component: UserList,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: UserForm,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/users/edit/:id',
    name: 'EditUser',
    component: UserForm,
    meta: { requiresAuth: true, requiresAdmin: true },
    props: true
  },
  {
    path: '/roles',
    name: 'Roles',
    component: RoleList,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/roles/create',
    name: 'CreateRole',
    component: RoleForm,
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/roles/edit/:id',
    name: 'EditRole',
    component: RoleForm,
    meta: { requiresAuth: true, requiresAdmin: true },
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else if (to.name === 'Login' && authStore.isAuthenticated) {
    next('/');
  } else if (to.meta.requiresAdmin && authStore.user?.role_id !== 1) {
    // Redirect to dashboard if user doesn't have admin privileges
    next('/');
  } else {
    next();
  }
});

export default router;