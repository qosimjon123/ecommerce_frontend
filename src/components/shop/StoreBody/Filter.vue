<template>
  <div>
    <!-- Кнопка открытия фильтра -->
    <button @click="openFilterModal"
      class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
      <Filter class="w-4 h-4" />
      Фильтры
    </button>

    <!-- Модальное окно фильтров -->
    <TransitionRoot appear :show="isFilterModalOpen" as="template">
      <Dialog as="div" @close="closeFilterModal" class="relative z-50">
        <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
          leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25 backdrop-blur-sm" />
        </TransitionChild>

        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95">
              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <!-- Заголовок модального окна -->
                <div class="px-6 py-4 border-b border-gray-200">
                  <div class="flex items-center justify-between">
                    <DialogTitle class="text-lg font-semibold text-gray-900">
                      Фильтры
                    </DialogTitle>
                    <button @click="closeFilterModal"
                      class="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                      <X class="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <!-- Содержимое фильтров -->
                <div class="px-6 py-4 space-y-6 relative overflow-y-auto max-h-[calc(100vh-200px)] scrollbar-hide">
                  <!-- Диапазон цен -->
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Диапазон цен</h3>
                    <div class="flex items-center gap-3">
                      <div class="flex-1">
                        <label class="block text-xs font-medium text-gray-700 mb-1">Мин.
                          цена</label>
                        <input type="number" v-model="currentMinPrice" :min="minPrice" :max="maxPrice"
                          @input="handleMinPriceChange"
                          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="0" />
                      </div>
                      <div class="flex-1">
                        <label class="block text-xs font-medium text-gray-700 mb-1">Макс.
                          цена</label>
                        <input type="number" v-model="currentMaxPrice" :min="minPrice" :max="maxPrice"
                          @input="handleMaxPriceChange"
                          class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="1000" />
                      </div>
                    </div>
                  </div>

                  <!-- Категории -->
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Категории</h3>
                    <div class="space-y-2">
                      <label v-for="category in categories" :key="category.id" class="flex items-center">
                        <input type="checkbox" :value="category.id" v-model="selectedCategories"
                          @change="handleCategoryChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Категории</h3>
                    <div class="space-y-2">
                      <label v-for="category in categories" :key="category.id" class="flex items-center">
                        <input type="checkbox" :value="category.id" v-model="selectedCategories"
                          @change="handleCategoryChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Категории</h3>
                    <div class="space-y-2">
                      <label v-for="category in categories" :key="category.id" class="flex items-center">
                        <input type="checkbox" :value="category.id" v-model="selectedCategories"
                          @change="handleCategoryChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Категории</h3>
                    <div class="space-y-2">
                      <label v-for="category in categories" :key="category.id" class="flex items-center">
                        <input type="checkbox" :value="category.id" v-model="selectedCategories"
                          @change="handleCategoryChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Категории</h3>
                    <div class="space-y-2">
                      <label v-for="category in categories" :key="category.id" class="flex items-center">
                        <input type="checkbox" :value="category.id" v-model="selectedCategories"
                          @change="handleCategoryChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">{{ category.name }}</span>
                      </label>
                    </div>
                  </div>

                  <!-- Бренды -->
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Бренды</h3>
                    <div class="space-y-2">
                      <label v-for="brand in brands" :key="brand.id" class="flex items-center">
                        <input type="checkbox" :value="brand.id" v-model="selectedBrands" @change="handleBrandChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">{{ brand.name }}</span>
                      </label>
                    </div>
                  </div>

                  <!-- Наличие -->
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Наличие</h3>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input type="checkbox" v-model="inStockOnly" @change="handleStockChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">Только в наличии</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Наличие</h3>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input type="checkbox" v-model="inStockOnly" @change="handleStockChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">Только в наличии</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Наличие</h3>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input type="checkbox" v-model="inStockOnly" @change="handleStockChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">Только в наличии</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Наличие</h3>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input type="checkbox" v-model="inStockOnly" @change="handleStockChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">Только в наличии</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Наличие</h3>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input type="checkbox" v-model="inStockOnly" @change="handleStockChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">Только в наличии</span>
                      </label>
                    </div>
                  </div>
                  <div class="space-y-3">
                    <h3 class="text-sm font-medium text-gray-900">Наличие</h3>
                    <div class="space-y-2">
                      <label class="flex items-center">
                        <input type="checkbox" v-model="inStockOnly" @change="handleStockChange"
                          class="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
                        <span class="ml-2 text-sm text-gray-700">Только в наличии</span>
                      </label>
                    </div>
                  </div>
                </div>

                <!-- Кнопки действий -->
                <div class="px-6 py-4 sticky bottom-0 bg-white border-t border-gray-200 flex gap-3">
                  <button @click="resetFilters"
                    class="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors">
                    Сбросить
                  </button>
                  <button @click="applyFilters"
                    class="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors">
                    Применить
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Filter, X } from 'lucide-vue-next'

// Props
interface Props {
  products?: any[]
}

const props = withDefaults(defineProps<Props>(), {
  products: () => []
})

// Emits
const emit = defineEmits<{
  'filter-change': [filters: any]
}>()

// Состояние модального окна
const isFilterModalOpen = ref(false)

// Диапазон цен
const minPrice = ref(0)
const maxPrice = ref(1000)
const currentMinPrice = ref(0)
const currentMaxPrice = ref(1000)

// Категории
const categories = ref([
  { id: 1, name: 'Фрукты' },
  { id: 2, name: 'Овощи' },
  { id: 3, name: 'Молочные продукты' },
  { id: 4, name: 'Мясо' },
  { id: 5, name: 'Рыба' },
  { id: 6, name: 'Напитки' }
])
const selectedCategories = ref<number[]>([])

// Бренды
const brands = ref([
  { id: 1, name: 'Самокат' },
  { id: 2, name: 'Роллтон' },
  { id: 3, name: 'Простоквашино' },
  { id: 4, name: 'Домик в деревне' }
])
const selectedBrands = ref<number[]>([])

// Наличие
const inStockOnly = ref(false)

// Вычисляем мин и макс цены из товаров
const priceRange = computed(() => {
  if (!props.products.length) return { min: 0, max: 1000 }

  const prices = props.products.map(product => product.price)
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  }
})

// Инициализируем диапазон цен
const initializePriceRange = () => {
  minPrice.value = priceRange.value.min
  maxPrice.value = priceRange.value.max
  currentMinPrice.value = priceRange.value.min
  currentMaxPrice.value = priceRange.value.max
}

// Методы
const openFilterModal = () => {
  isFilterModalOpen.value = true
  initializePriceRange()
}

const closeFilterModal = () => {
  isFilterModalOpen.value = false
}

const handleMinPriceChange = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value) || 0
  if (value <= currentMaxPrice.value) {
    currentMinPrice.value = value
  } else {
    currentMinPrice.value = currentMaxPrice.value
  }
}

const handleMaxPriceChange = (event: Event) => {
  const value = parseInt((event.target as HTMLInputElement).value) || 0
  if (value >= currentMinPrice.value) {
    currentMaxPrice.value = value
  } else {
    currentMaxPrice.value = currentMinPrice.value
  }
}

const handleCategoryChange = () => {
  console.log('Категории изменены:', selectedCategories.value)
}

const handleBrandChange = () => {
  console.log('Бренды изменены:', selectedBrands.value)
}

const handleStockChange = () => {
  console.log('Наличие изменено:', inStockOnly.value)
}

const resetFilters = () => {
  currentMinPrice.value = minPrice.value
  currentMaxPrice.value = maxPrice.value
  selectedCategories.value = []
  selectedBrands.value = []
  inStockOnly.value = false
}

const applyFilters = () => {
  const filters = {
    priceRange: {
      min: currentMinPrice.value,
      max: currentMaxPrice.value
    },
    categories: selectedCategories.value,
    brands: selectedBrands.value,
    inStockOnly: inStockOnly.value
  }

  emit('filter-change', filters)
  closeFilterModal()

  console.log('Применены фильтры:', filters)
}
</script>
