<template>
  <div class="py-6">
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">Dashboard</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Welcome to the User Management System</p>
      </div>
      <div v-if="user?.role_id === 1" class="mt-5 space-y-6">
        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">{{ stats.users }}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <router-link to="/users" class="font-medium text-blue-600 hover:text-blue-500"> View all users </router-link>
              </div>
            </div>
          </div>

          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Roles</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">{{ stats.roles }}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <router-link to="/roles" class="font-medium text-blue-600 hover:text-blue-500"> View all roles </router-link>
              </div>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-purple-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.07 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Active Users</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-gray-900">{{ stats.activeUsers }}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <span class="text-gray-400">Online now</span>
              </div>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0 bg-orange-500 rounded-md p-3">
                  <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">System Health</dt>
                    <dd class="flex items-baseline">
                      <div class="text-2xl font-semibold text-green-600">98%</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-4 sm:px-6">
              <div class="text-sm">
                <span class="text-green-600 font-medium">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium text-gray-900">User Growth</h3>
              <p class="mt-1 text-sm text-gray-500">User registration trends by month</p>
            </div>
            <div class="px-4 pb-5">
              <div class="h-64">
                <canvas ref="userGrowthChart"></canvas>
              </div>
            </div>
          </div>
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg font-medium text-gray-900">Role Distribution</h3>
              <p class="mt-1 text-sm text-gray-500">User distribution by roles</p>
            </div>
            <div class="px-4 pb-5">
              <div class="h-64">
                <canvas ref="roleDistributionChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="mt-5 bg-white overflow-hidden  rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="text-center">
            <h3 class="text-lg font-medium text-gray-900">Welcome, {{ user?.name }}</h3>
            <p class="mt-2 text-sm text-gray-500">You are logged in as a regular user.</p>
            <div class="mt-8">
              <h4 class="text-md font-medium text-gray-700 mb-4">Your Activity Overview</h4>
              <div class="h-64">
                <canvas ref="userActivityChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue';
import { userService, roleService } from '../services/auth';
import { useAuthStore } from '../store/auth';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface Stats {
  users: number;
  roles: number;
  activeUsers: number;
}

interface RoleData {
  id: number;
  name: string;
  userCount: number;
}

interface UserGrowthData {
  month: string;
  count: number;
  cumulative: number;
}

const stats = ref<Stats>({
  users: 0,
  roles: 0,
  activeUsers: 0
});

const roleDistribution = ref<RoleData[]>([]);
const userGrowthData = ref<UserGrowthData[]>([]);

const authStore = useAuthStore();
const user = computed(() => authStore.user);


const userGrowthChart = ref<HTMLCanvasElement>();
const roleDistributionChart = ref<HTMLCanvasElement>();
const userActivityChart = ref<HTMLCanvasElement>();


let userGrowthChartInstance: Chart | null = null;
let roleDistributionChartInstance: Chart | null = null;
let userActivityChartInstance: Chart | null = null;


const calculateUserGrowth = (users: any[]) => {

  const currentDate = new Date();
  const months = [];
  
  for (let i = 7; i >= 0; i--) {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    months.push({
      date,
      name: date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })
    });
  }


  const monthlyData = months.map(month => {
    const nextMonth = new Date(month.date.getFullYear(), month.date.getMonth() + 1, 1);
    
   
    const newUsersThisMonth = users.filter(user => {
      if (!user.created_at) return false;
      const userDate = new Date(user.created_at);
      return userDate >= month.date && userDate < nextMonth;
    }).length;

  
    const cumulativeUsers = users.filter(user => {
      if (!user.created_at) return false;
      const userDate = new Date(user.created_at);
      return userDate < nextMonth;
    }).length;

    return {
      month: month.name,
      count: newUsersThisMonth,
      cumulative: cumulativeUsers
    };
  });

  return monthlyData;
};

const createUserGrowthChart = () => {
  if (!userGrowthChart.value || userGrowthData.value.length === 0) return;
  
  const ctx = userGrowthChart.value.getContext('2d');
  if (!ctx) return;

  userGrowthChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: userGrowthData.value.map(data => data.month),
      datasets: [{
        label: 'New Users',
        data: userGrowthData.value.map(data => data.count),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: false,
        yAxisID: 'y'
      }, {
        label: 'Total Users',
        data: userGrowthData.value.map(data => data.cumulative),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        yAxisID: 'y1'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      scales: {
        x: {
          display: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y: {
          type: 'linear' as const,
          display: true,
          position: 'left' as const,
          beginAtZero: true,
          title: {
            display: true,
            text: 'New Users'
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        y1: {
          type: 'linear' as const,
          display: true,
          position: 'right' as const,
          beginAtZero: true,
          title: {
            display: true,
            text: 'Total Users'
          },
          grid: {
            drawOnChartArea: false,
          },
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top' as const,
        },
        tooltip: {
          callbacks: {
            title: (context) => {
              return `${context[0].label}`;
            },
            label: (context) => {
              let label = context.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += context.parsed.y;
              if (context.dataset.label === 'New Users') {
                label += ' new registrations';
              } else {
                label += ' total users';
              }
              return label;
            }
          }
        }
      }
    }
  });
};

const createRoleDistributionChart = () => {
  if (!roleDistributionChart.value || roleDistribution.value.length === 0) return;
  
  const ctx = roleDistributionChart.value.getContext('2d');
  if (!ctx) return;

  const colors = [
    'rgba(59, 130, 246, 0.8)',   // Blue
    'rgba(16, 185, 129, 0.8)',   // Green
    'rgba(245, 101, 101, 0.8)',  // Red
    'rgba(249, 115, 22, 0.8)',   // Orange
    'rgba(147, 51, 234, 0.8)',   // Purple
    'rgba(236, 72, 153, 0.8)',   // Pink
    'rgba(14, 165, 233, 0.8)',   // Light blue
    'rgba(34, 197, 94, 0.8)'     // Light green
  ];

  roleDistributionChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: roleDistribution.value.map(role => role.name),
      datasets: [{
        data: roleDistribution.value.map(role => role.userCount),
        backgroundColor: colors.slice(0, roleDistribution.value.length),
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            generateLabels: (chart) => {
              const data = chart.data;
              if (data.labels && data.datasets[0]) {
                return data.labels.map((label, index) => {
                  const backgroundColor = data.datasets[0].backgroundColor;
                  let fillColor = '#000';
                  
                  if (Array.isArray(backgroundColor) && backgroundColor[index]) {
                    fillColor = backgroundColor[index] as string;
                  } else if (typeof backgroundColor === 'string') {
                    fillColor = backgroundColor;
                  }
                  
                  return {
                    text: `${label}: ${data.datasets[0].data[index]}`,
                    fillStyle: fillColor,
                    hidden: false,
                    index: index,
                    pointStyle: 'circle' as const
                  };
                });
              }
              return [];
            }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed;
              const percentage = ((value / stats.value.users) * 100).toFixed(1);
              return `${label}: ${value} users (${percentage}%)`;
            }
          }
        }
      }
    }
  });
};

const createUserActivityChart = () => {
  if (!userActivityChart.value) return;
  
  const ctx = userActivityChart.value.getContext('2d');
  if (!ctx) return;

  userActivityChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [{
        label: 'Your Activity',
        data: [8, 12, 15, 10],
        borderColor: 'rgb(147, 51, 234)',
        backgroundColor: 'rgba(147, 51, 234, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(0, 0, 0, 0.1)'
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
};

const calculateRoleDistribution = (users: any[], roles: any[]) => {
  // Count users by role_id
  const roleUserCounts = users.reduce((acc: { [key: number]: number }, user) => {
    const roleId = user.role_id;
    acc[roleId] = (acc[roleId] || 0) + 1;
    return acc;
  }, {});

  // Map roles with their user counts
  return roles.map(role => ({
    id: role.id,
    name: role.name,
    userCount: roleUserCounts[role.id] || 0
  })).filter(role => role.userCount > 0); // Only show roles that have users
};

onMounted(async () => {
  // Only fetch stats if user has role_id = 1
  if (user.value?.role_id === 1) {
    try {
      const [users, roles] = await Promise.all([
        userService.getUsers(),
        roleService.getRoles()
      ]);
      
      stats.value = {
        users: users.length,
        roles: roles.length,
        activeUsers: Math.floor(users.length * 0.7) // Simulate 70% active users
      };

      // Calculate role distribution based on actual data
      roleDistribution.value = calculateRoleDistribution(users, roles);
      
      // Calculate user growth data based on actual user creation dates
      userGrowthData.value = calculateUserGrowth(users);

      // Create charts after data is loaded and DOM is updated
      await nextTick();
      createUserGrowthChart();
      createRoleDistributionChart();
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  } else {
    // Create user activity chart for regular users
    await nextTick();
    createUserActivityChart();
  }
});

// Cleanup charts on unmount
import { onBeforeUnmount } from 'vue';

onBeforeUnmount(() => {
  if (userGrowthChartInstance) {
    userGrowthChartInstance.destroy();
  }
  if (roleDistributionChartInstance) {
    roleDistributionChartInstance.destroy();
  }
  if (userActivityChartInstance) {
    userActivityChartInstance.destroy();
  }
});
</script>