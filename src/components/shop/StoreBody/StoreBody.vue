<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/utils/axios.ts'
import StoreCategorySidebar from '@/components/shop/StoreCategorySidebar.vue'
import { PagesStatus, type StoreProduct } from '@/stores/PagesStatus.ts'
import { ChevronDown } from 'lucide-vue-next'
import Skeleton from './Skeleton.vue'
import ProductCart from './ProductCart.vue'
import Filter from './Filter.vue'

const defaultCartImage = '/src/assets/images/product/01.jpg'
const route = useRoute()
const router = useRouter()
const PagesStatusStore = PagesStatus()
const store = PagesStatusStore
const currentPage = ref(1)
const products = ref<StoreProduct | null>(null)

// Состояние загрузки для каждого товара
const loadingProducts = ref<Set<number>>(new Set())

// Локальный массив товаров вместо запроса к API
const localProducts = ref([
  {
    id: 1,
    product: {
      id: 1,
      name: "Sample Product 1",
      image: defaultCartImage,
      sku: "SKU001"
    },
    price: 100,
    discount: 10,
    quantity: 10,
    links: {}
  },
  {
    id: 2,
    product: {
      id: 2,
      name: "Sample Product 2",
      image: defaultCartImage,
      sku: "SKU002"
    },
    price: 150,
    discount: 0,
    quantity: 5,
    links: {}
  },
  {
    id: 3,
    product: {
      id: 3,
      name: "Sample Product 3",
      image: defaultCartImage,
      sku: "SKU003"
    },
    price: 200,
    discount: 20,
    quantity: 8,
    links: {}
  },
  {
    id: 4,
    product: {
      id: 4,
      name: "Sample Product 4",
      image: defaultCartImage,
      sku: "SKU004"
    },
    price: 250,
    discount: 15,
    quantity: 0,
    links: {}
  },
  {
    id: 5,
    product: {
      id: 5,
      name: "Sample Product 5",
      image: defaultCartImage,
      sku: "SKU005"
    },
    price: 300,
    discount: 0,
    quantity: 12,
    links: {}
  }
])

PagesStatusStore.setCartStatus(true)

// Сортировка и фильтрация
const currentSort = ref('popular')
const sortOptions = [
  { value: 'popular', label: 'Популярные' },
  { value: 'price_asc', label: 'Цена: по возрастанию' },
  { value: 'price_desc', label: 'Цена: по убыванию' },
  { value: 'name_asc', label: 'По названию А-Я' },
  { value: 'name_desc', label: 'По названию Я-А' },
  { value: 'newest', label: 'Сначала новые' }
]

const isSortDropdownOpen = ref(false)

const handleSortChange = (sortValue: string) => {
  currentSort.value = sortValue
  isSortDropdownOpen.value = false
  // Здесь будет логика сортировки
  console.log('Сортировка изменена на:', sortValue)
}

const handleFilterChange = (filters: any) => {
  // Здесь будет логика применения фильтров
  console.log('Применены фильтры:', filters)
}



// Обработчик клика вне выпадающего меню
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.sort-dropdown')) {
    isSortDropdownOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

async function fetchProducts(page: number) {
  try {
    PagesStatusStore.setCartStatus(true)
    // Используем локальные данные вместо запроса к API
    products.value = {
      results: localProducts.value,
      count: localProducts.value.length,
      links: {
        next: null,
        previous: null
      }
    }
    PagesStatusStore.setCartStatus(false)
    currentPage.value = page
  } catch (error) {
    console.error('Ошибка при загрузке продуктов:', error)
  }
}

function openProductModal(product: any) {
  PagesStatusStore.setSelectedProduct(product)
  console.log(PagesStatusStore.selectedProduct)
}

// Функция добавления товара с анимацией
async function addToCart(productId: number) {
  if (loadingProducts.value.has(productId)) return

  loadingProducts.value.add(productId)

  try {
    // Симуляция API запроса
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Здесь была бы логика добавления в корзину
    console.log(`Товар ${productId} добавлен`)

  } catch (error) {
    console.error('Ошибка при добавлении товара:', error)
  } finally {
    loadingProducts.value.delete(productId)
  }
}

// Проверка загрузки товара
const isProductLoading = (productId: number) => {
  return loadingProducts.value.has(productId)
}

// Pagination
fetchProducts(currentPage.value)

const pagination = computed(() => ({
  next: products.value?.links.next || null,
  prev: products.value?.links.previous || null,
  max: products.value?.count || 1,
}))

const displayPages = computed(() => {
  const pages = []
  const maxPagesToShow = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxPagesToShow / 2))
  const endPage = Math.min(pagination.value.max, startPage + maxPagesToShow - 1)

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return pages
})

const showStartDots = computed(() => displayPages.value[0] > 2)
const showEndDots = computed(
  () => displayPages.value[displayPages.value.length - 1] < pagination.value.max - 1,
)

const goToPrev = () => {
  if (pagination.value.prev !== null) {
    fetchProducts(pagination.value.prev)
  }
}

const goToNext = () => {
  if (pagination.value.next !== null) {
    fetchProducts(pagination.value.next)
  }
}

const goToPage = (page: number) => {
  fetchProducts(page)
}
</script>

<template>
  <div class="mx-auto bg-white rounded-2xl h-full">
    <!-- Skeleton Loader -->
    <template v-if="PagesStatusStore.isCartLoading">
      <Skeleton />
    </template>

    <!-- Products -->
    <template v-else>
      <!-- Секция сортировки и фильтрации -->
      <div class="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4 pt-5">
        <!-- Левая часть: количество товаров -->
        <div class="md:text-xs hidden md:flex lg:text-sm  text-gray-600">
          Найдено товаров: <span class="font-medium">{{ localProducts.length }}</span>
        </div>

        <!-- Правая часть: сортировка и фильтры -->
        <div class="flex items-center gap-3 ">
          <!-- Компонент фильтров -->
          <Filter :products="localProducts" @filter-change="handleFilterChange" />

          <!-- Выпадающий список сортировки -->
          <div class="relative sort-dropdown">
            <button @click="isSortDropdownOpen = !isSortDropdownOpen"
              class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors min-w-[200px]">
              <span>{{sortOptions.find(option => option.value === currentSort)?.label}}</span>
              <ChevronDown class="w-4 h-4 transition-transform" :class="{ 'rotate-180': isSortDropdownOpen }" />
            </button>

            <!-- Выпадающее меню -->
            <div v-if="isSortDropdownOpen"
              class="absolute right-0 top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <div class="py-1">
                <button v-for="option in sortOptions" :key="option.value" @click="handleSortChange(option.value)"
                  class="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition-colors"
                  :class="{ 'bg-green-50 text-green-700': currentSort === option.value }">
                  {{ option.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductCart />
    </template>

    <!-- Pagination -->
    <div class="mt-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-600">Показано {{ currentPage }} из {{ pagination.max }} страниц</p>
        <ul class="flex items-center space-x-1">
          <li :class="{ 'opacity-50 pointer-events-none': pagination.prev === null }">
            <a href="#" @click.prevent="goToPrev"
              class="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-100">
              <i class="fas fa-long-arrow-alt-left"></i>
            </a>
          </li>

          <li v-if="displayPages[0] > 1">
            <a href="#" @click.prevent="goToPage(1)"
              class="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-100">1</a>
          </li>

          <li v-if="showStartDots" class="w-10 h-10 flex items-center justify-center">
            <span>...</span>
          </li>

          <li v-for="page in displayPages" :key="page">
            <a href="#" @click.prevent="goToPage(page)"
              class="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-100"
              :class="{ 'bg-primary text-white border-primary': currentPage === page }">
              {{ page }}
            </a>
          </li>

          <li v-if="showEndDots" class="w-10 h-10 flex items-center justify-center">
            <span>...</span>
          </li>

          <li v-if="displayPages[displayPages.length - 1] < pagination.max">
            <a href="#" @click.prevent="goToPage(pagination.max)"
              class="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-100">
              {{ pagination.max }}
            </a>
          </li>

          <li :class="{ 'opacity-50 pointer-events-none': pagination.next === null }">
            <a href="#" @click.prevent="goToNext"
              class="w-10 h-10 flex items-center justify-center border rounded hover:bg-gray-100">
              <i class="fas fa-long-arrow-alt-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style>
/* Animation for skeleton loader */
@keyframes pulse {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 1.5s infinite ease-in-out;
}

/* Bounce animation for loading dots */
@keyframes bounce {

  0%,
  80%,
  100% {
    transform: scale(0);
  }

  40% {
    transform: scale(1);
  }
}

/* Utility for text truncation */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.group-hover:hover {
  opacity: 1;
}
</style>
