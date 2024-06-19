// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import MainLayout from '../components/MainLayout.vue';
import FormInput from '../components/FormInput.vue';
import FormInputadmin from '../components/FormInputadmin.vue';
import LoginPage from '../components/Login.vue';

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      // {
      //   path: '/',
      //   component: { template: '<div><a-typography-title :level="2">Selamat Datang di Booking Jadwal Integrasi SIASN-SIMPEG</a-typography-title></div>' },
      // },
      {
        path: '/',
        name: 'Home',
        component: Home,
      },
      {
        path: '/users',
        component: FormInput,
        // meta: { requiresAuth: true }
      },
      {
        path: '/adminjadwal',
        component: FormInputadmin,
        meta: { requiresAuth: true }
      },
    ],
  },
  {
    path: '/login',
    component: LoginPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('token'); // Check if there's a token in local storage
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
