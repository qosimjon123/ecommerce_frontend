import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '@/views/MainPage.vue'
import BrandList from '@/components/BrandList.vue'
//import StoreMain from '@/components/shop/StoreMain.vue'
import Profile from '@/components/Profile/Profile.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import NotFound from '@/components/404.vue'
import { ref } from 'vue'
import ActivationCode from '@/components/login/ActivationCode.vue'
import WelcomePage from '@/components/WelcomePage.vue'
import api from '@/utils/axios.ts'

export const previousRoute = ref<string | null>(null)
const serverUrl = 'http://127.0.0.1:8000/api/store/'
const basketApi = 'http://127.0.0.1:8004/cart/'

const routes = [
  {
    path: '/',
    name: 'home',
    component: WelcomePage,
  },
  {
    path: '/store/:id',
    name: 'store',
    //component: StoreMain,
    props: true,
    beforeEnter: async (to: any, from: any, next: any) => {
      try {
        const response = await api.get(`${serverUrl}${to.params.id}`)
        if (response.data.length == 0) {
          router.push({ name: 'NotFound' })
        }
        const getBasket = await api.post(`${basketApi}`, {
          store_id: `${to.params.id}`,
        })

        if (getBasket.data.length == 0 || getBasket.status == 400) {
          console.log('Error while getting basket id')
        } else {
          localStorage.setItem('basket_id', getBasket.data.pk)
        }

        next()
      } catch (error: any) {
        next()
        // next({ name: 'NotFound' })
      }
    },
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginForm,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
  {
    path: '/activation',
    name: 'activation',
    component: ActivationCode,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  previousRoute.value = from.path
  console.log(`Переход с ${from.fullPath} на ${to.fullPath}`)
  next()
})

export default router
