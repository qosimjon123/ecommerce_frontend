<script setup lang="ts">
import StoreBody from '@/components/shop/StoreBody/StoreBody.vue'
import ModalsWindow from '@/components/shop/ModalsWindow.vue'
import CartWidget from '@/components/shop/Basket/CartWidget.vue'
import CatalogSidebar from '@/components/shop/Catalog/CatalogSidebar.vue'
import CatalogMain from '@/components/shop/Catalog/CatalogMain.vue'
import { useCartStore } from '@/stores/cart'
import type { Category, SubCategory } from '@/stores/categories'
import MainBasket from '@/components/shop/Basket/MainBasket.vue'

const cartStore = useCartStore()

// Event handlers for categories
const handleCategorySelect = (category: Category) => {
  console.log('Selected category:', category.name)
}

const handleSubcategorySelect = (category: Category, subcategory: SubCategory) => {
  console.log('Selected subcategory:', subcategory.name, ' in category: ', category.name)
}
</script>

<template>
  <section class="container mx-auto px-4 bg-gray-200 rounded-2xl mt-7">
    <div class="flex gap-4 h-full">
      <!-- Каталог (третий приоритет) - скрыт на мобильных, появляется на lg -->
      <div class="lg:flex-3 xl:flex-3 md:flex-4 hidden md:block  relative">
        <CatalogMain class="sticky lg:top-40 " />
      </div>

      <!-- Товары (первый приоритет) - всегда на всю ширину, кроме lg+ -->
      <div class="lg:flex-7 xl:flex-7  md:flex-8 relative">
        <StoreBody />
      </div>

      <!-- Корзина (второй приоритет) - скрыта на мобильных, появляется на md -->
      <div class="flex-4 hidden lg:hidden xl:block 2xl:block  ">
        <MainBasket class="relative" />
      </div>
    </div>

    <ModalsWindow />
    <button @click="cartStore.openCart()">
      Открыть корзину ({{ cartStore.itemsCount }})
    </button>

    <!-- Встроить корзину -->
    <CartWidget />
    <CatalogSidebar />
  </section>
</template>
