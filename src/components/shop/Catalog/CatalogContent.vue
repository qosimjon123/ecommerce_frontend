<template>

    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b  border-gray-200">
      <h2 class="text-2xl font-bold text-gray-900">Каталог</h2>
    </div>

    <!-- Categories List -->
    <div class="xl:px-4 py-4 overflow-y-auto scrollbar-hide flex-1">
      <div
        v-for="category in categories"
        :key="category.id"
        class="mb-2"
        :ref="el => setCategoryRef(el, category.id)"
      >
        <button @click="toggleCategory(category.id)"
          class="flex w-full cursor-pointer justify-between rounded-lg px-4 py-2 text-left text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none">
          <div class="flex items-center gap-3">
            <div :class="category.iconBg"
              class="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium shrink-0">
              {{ category.icon }}
            </div>
            <span class="text-gray-900 font-medium truncate text-wrap max-w-50">
              {{ category.name }}
            </span>
          </div>
          <ChevronDown v-if="category.subcategories" :class="openCategory === category.id ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-green-500 transition-transform duration-200" />
        </button>
        <div v-if="category.subcategories && openCategory === category.id"
          class="px-4 pb-2 pt-4 text-sm text-gray-500 bg-gray-50 rounded-lg mt-1">
          <button v-for="subcategory in category.subcategories" :key="subcategory"
            class="w-full text-left py-2 cursor-pointer px-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
            {{ subcategory }}
          </button>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useRoute } from 'vue-router'


const openCategory = ref<string | null>(null)

const route = useRoute()
const categoryRefs = ref<Record<string, HTMLElement | null>>({})

function setCategoryRef(el: Element | null, id: string) {
  if (el instanceof HTMLElement) {
    categoryRefs.value[id] = el
  }
}

const categories = [
  { id: 'recipes', name: 'Рецепты', icon: '🍽️', iconBg: 'bg-green-500' },
  { id: 'purchased', name: 'Вы покупали', icon: '🕒', iconBg: 'bg-blue-500' },
  { id: 'favorites', name: 'Избранное', icon: '❤️', iconBg: 'bg-red-500' },
  {
    id: 'pharmacy',
    name: 'Аптека',
    icon: '⚕️',
    iconBg: 'bg-green-600',
    subcategories: ['Лекарства', 'Витамины', 'Медицинские приборы'],
  },
  {
    id: 'pet',
    name: 'Зоотовары',
    icon: '🐾',
    iconBg: 'bg-amber-700',
    subcategories: ['Корм для животных', 'Игрушки', 'Аксессуары'],
  },
  {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  }, {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  }, {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  }, {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  }, {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  }, {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  }, {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  }, {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  }, {
    id: 'discounts',
    name: 'Скидки и новинки',
    icon: '%',
    iconBg: 'bg-yellow-500',
    subcategories: ['Скидки и кешбэк', 'Новинки в вашей Лавке'],
  },
  { id: 'yandex', name: 'Придумано Яндекс Лавкой', icon: '🏪', iconBg: 'bg-orange-500' },
  {
    id: 'flowers',
    name: 'Цветы',
    icon: '🌷',
    iconBg: 'bg-pink-500',
    subcategories: ['Букеты', 'Горшечные растения', 'Флористические аксессуары'],
  },
  {
    id: 'vegetables',
    name: 'Овощной прилавок',
    icon: '🍋',
    iconBg: 'bg-yellow-400',
    subcategories: ['Овощи', 'Фрукты', 'Зелень'],
  },
  {
    id: 'dairy',
    name: 'Молочный прилавок',
    icon: '🥛',
    iconBg: 'bg-blue-400',
    subcategories: ['Молоко', 'Сыры', 'Йогурты'],
  },
  {
    id: 'bakery',
    name: 'Булочная',
    icon: '🍞',
    iconBg: 'bg-amber-600',
    subcategories: ['Хлеб', 'Выпечка', 'Кондитерские изделия'],
  },
  {
    id: 'drinks',
    name: 'Вода и напитки',
    icon: '🧊',
    iconBg: 'bg-cyan-400',
    subcategories: ['Вода', 'Газированные напитки', 'Соки'],
  },
  {
    id: 'sweets',
    name: 'Сладкое и снеки',
    icon: '🍭',
    iconBg: 'bg-pink-400',
    subcategories: ['Конфеты', 'Шоколад', 'Чипсы'],
  },
  {
    id: 'meat',
    name: 'Мясо, птица, рыба',
    icon: '🥩',
    iconBg: 'bg-red-600',
    subcategories: ['Мясо', 'Птица', 'Рыба и морепродукты'],
  },
]

function toggleCategory(categoryId: string) {
  // Если кликаем на ту же категорию - закрываем её
  // Если кликаем на другую - закрываем предыдущую и открываем новую
  openCategory.value = openCategory.value === categoryId ? null : categoryId

  // Если выбрана последняя категория — прокрутить к ней
  if (categories[categories.length - 1].id === categoryId) {
    nextTick(() => {
      categoryRefs.value[categoryId]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }
}

watch(
  () => route.query.subcategory,
  (subcategory) => {
    const subcat = Array.isArray(subcategory) ? subcategory[0] : subcategory
    if (subcat && categoryRefs.value[subcat]) {
      openCategory.value = subcat
      nextTick(() => {
        categoryRefs.value[subcat]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      })
    }
  },
  { immediate: true }
)

onMounted(() => {
  const subcat = Array.isArray(route.query.subcategory) ? route.query.subcategory[0] : route.query.subcategory
  if (subcat && categoryRefs.value[subcat]) {
    openCategory.value = subcat
    nextTick(() => {
      categoryRefs.value[subcat]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
  }
})
</script>
