import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import { useUserStore } from '../stores/users'
import { storeToRefs } from 'pinia'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile/:username',
      name: 'profile',
      component: ProfileView,
      // meta: { requiresAuth: true }, // Add meta field to indicate authentication requirement
      // beforeEnter: (to, from, next) => {
      //   const userStore = useUserStore()
      //   const { user } = storeToRefs(userStore)

      //   const isAuthenticated = !!user.value
      //   console.log(isAuthenticated);
      //   if (isAuthenticated) {
      //     next(); // Allow access to the route
      //   } else {
      //     next('/login');
      //   }
      // }
    },
    {
      path: '/:catchall(.*)*',
      name: 'Not Found',
      component: NotFoundView
    },
  ]
})

export default router
