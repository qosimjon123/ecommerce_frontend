<template>
  <div class="flex flex-wrap gap-2 justify-evenly">
    <div v-for="n in localProducts" :key="n.id" class="flex flex-col min-h-[calc(100vh-80vh)]">
      <div class="relative bg-gray-100 rounded-2xl overflow-hidden w-37 h-37 md:w-38 md:h-38 lg:w-44 lg:h-44">
        <img class="w-full h-full object-cover bg-gray-400" :src="n.product.image || 'https://placehold.co/160x160'"
          :alt="n.product.name || 'Яблоки Голден'" />
        <!-- Conditional rendering for quantity or message -->
        <div v-if="n.quantity" class="absolute inset-0 flex text-center items-center justify-center bg-gray-200/50">
          <div v-if="n.discount > 0"
            class="absolute bottom-2 left-2 bg-black text-white text-xs font-bold px-2 py-1 rounded-2xl">
            -{{ n.discount }}222%
          </div>
          <span class="text-white text-3xl font-bold">{{ n.quantity }}
            <div>
              Нет в наличии
              <!-- {{ message_if_no_quantity_or_this_product_last_count || 'Последний товар'
              }} -->
            </div>

          </span>

        </div>
      </div>
      <div class="py-2 flex flex-col space-y-1 w-37 md:w-38 lg:w-44 ">
        <!-- Название товара с обработкой длинного текста -->
        <div class="text-gray-700 text-xs font-semibold leading-tight line-clamp-2 break-words ">
          {{ n.product.name || 'Яблоки ГолденГол Голден ГолденГол денЯблоки ГолденГол Голден ГолденГолден' }}
        </div>

        <!-- Вес товара -->
        <div class="text-gray-500 text-sm font-semibold truncate">
          {{ '500 г' }}
        </div>

        <!-- Кнопка с ценой -->
        <div class="my-2">
          <UniversalCartButton
            :product-id="n.id"
            :price="n.price"
            :discount="n.discount"
            :max-quantity="10"
            :quantity="1"
            :is-cart-mode="false"
            @increase-quantity="addToCart"
            @decrease-quantity="removeFromCart"
            @update-quantity="getCartQuantity"
          />
        </div>
      </div>
    </div>
  </div>

</template>


<script setup lang="ts">
import { Minus, Plus, Loader2 } from 'lucide-vue-next'
import { ref } from 'vue'
import UniversalCartButton from '@/components/shop/Basket/UniversalCartButton.vue'

const defaultCartImage = '/src/assets/images/product/01.jpg'



const count_of_buy_products = ref(0)
const loadingProducts = ref<Set<number>>(new Set())

// Состояние корзины
const cart = ref<Map<number, number>>(new Map())

function addToCart(productId: number) {
  if (loadingProducts.value.has(productId)) return

  loadingProducts.value.add(productId)

  // Симуляция загрузки
  setTimeout(() => {
    const currentQuantity = cart.value.get(productId) || 0
    cart.value.set(productId, currentQuantity + 1)
    count_of_buy_products.value++
    loadingProducts.value.delete(productId)
  }, 1000)
}

function removeFromCart(productId: number) {
  if (loadingProducts.value.has(productId)) return

  loadingProducts.value.add(productId)

  setTimeout(() => {
    const currentQuantity = cart.value.get(productId) || 0
    if (currentQuantity > 0) {
      cart.value.set(productId, currentQuantity - 1)
      count_of_buy_products.value--

      if (currentQuantity - 1 === 0) {
        cart.value.delete(productId)
      }
    }
    loadingProducts.value.delete(productId)
  }, 500)
}

function isInCart(productId: number): boolean {
  return cart.value.has(productId) && (cart.value.get(productId) || 0) > 0
}

function getCartQuantity(productId: number): number {
  return cart.value.get(productId) || 0
}

function isProductLoading(productId: number): boolean {
  return loadingProducts.value.has(productId)
}

function incrementCountOfBuyProducts() {
  count_of_buy_products.value++
}

function decrementCountOfBuyProducts() {
  count_of_buy_products.value--
}


const localProducts = ref([
  {
    id: 1,
    product: {
      id: 1,
      name: "Яблоки Голден",
      image: "https://placehold.co/165x165text=Apples",
      sku: "FRUIT001",
      category: "Фрукты"
    },
    price: 169,
    discount: 0,
    quantity: 15,
    inCart: 0
  },
  {
    id: 2,
    product: {
      id: 2,
      name: "Бананы",
      image: "https://placehold.co/165x165text=Bananas",
      sku: "FRUIT002",
      category: "Фрукты"
    },
    price: 89,
    discount: 5,
    quantity: 20,
    inCart: 0
  },
  {
    id: 3,
    product: {
      id: 3,
      name: "Апельсины",
      image: "https://placehold.co/165x165text=Oranges",
      sku: "FRUIT003",
      category: "Фрукты"
    },
    price: 129,
    discount: 0,
    quantity: 12,
    inCart: 0
  },
  {
    id: 4,
    product: {
      id: 4,
      name: "Помидоры",
      image: "https://placehold.co/165x165text=Tomatoes",
      sku: "VEG001",
      category: "Овощи"
    },
    price: 199,
    discount: 10,
    quantity: 8,
    inCart: 0
  },
  {
    id: 5,
    product: {
      id: 5,
      name: "Огурцы",
      image: "https://placehold.co/165x165text=Cucumbers",
      sku: "VEG002",
      category: "Овощи"
    },
    price: 149,
    discount: 0,
    quantity: 10,
    inCart: 0
  },
  {
    id: 6,
    product: {
      id: 6,
      name: "Молоко 2,5%",
      image: "https://placehold.co/165x165text=Milk",
      sku: "DAIRY001",
      category: "Молочные продукты"
    },
    price: 79,
    discount: 0,
    quantity: 25,
    inCart: 0
  },
  {
    id: 7,
    product: {
      id: 7,
      name: "Йогурт натуральный",
      image: "https://placehold.co/165x165text=Yogurt",
      sku: "DAIRY002",
      category: "Молочные продукты"
    },
    price: 59,
    discount: 15,
    quantity: 18,
    inCart: 0
  },
  {
    id: 8,
    product: {
      id: 8,
      name: "Хлеб белый",
      image: "https://placehold.co/165x165text=Bread",
      sku: "BAKERY001",
      category: "Хлебобулочные изделия"
    },
    price: 45,
    discount: 0,
    quantity: 30,
    inCart: 0
  },
  {
    id: 9,
    product: {
      id: 9,
      name: "Яйца куриные (10 шт)",
      image: "https://placehold.co/165x165text=Eggs",
      sku: "EGGS001",
      category: "Яйца"
    },
    price: 99,
    discount: 0,
    quantity: 15,
    inCart: 0
  },
  {
    id: 10,
    product: {
      id: 10,
      name: "Сыр Российский",
      image: "https://placehold.co/165x165text=Cheese",
      sku: "DAIRY003",
      category: "Молочные продукты"
    },
    price: 299,
    discount: 20,
    quantity: 5,
    inCart: 0
  },
  {
    id: 11,
    product: {
      id: 11,
      name: "Картофель",
      image: "https://placehold.co/165x165text=Potatoes",
      sku: "VEG003",
      category: "Овощи"
    },
    price: 49,
    discount: 0,
    quantity: 40,
    inCart: 0
  },
  {
    id: 12,
    product: {
      id: 12,
      name: "Лук репчатый",
      image: "https://placehold.co/165x165text=Onion",
      sku: "VEG004",
      category: "Овощи"
    },
    price: 39,
    discount: 0,
    quantity: 35,
    inCart: 0
  },
  {
    id: 13,
    product: {
      id: 13,
      name: "Мясной фарш",
      image: "https://placehold.co/165x165text=Minced+Meat",
      sku: "MEAT001",
      category: "Мясо"
    },
    price: 399,
    discount: 10,
    quantity: 7,
    inCart: 0
  },
  {
    id: 14,
    product: {
      id: 14,
      name: "Куриное филе",
      image: "https://placehold.co/165x165text=Chicken",
      sku: "MEAT002",
      category: "Мясо"
    },
    price: 349,
    discount: 0,
    quantity: 9,
    inCart: 0
  },
])


const basket = ref([
  {
    productId: 1,       // ID продукта
    count: 2,           // Количество в корзине
    remaining: 13       // Оставшееся количество (15 - 2)
  },
  {
    productId: 3,
    count: 1,
    remaining: 11
  },
  {
    productId: 7,
    count: 3,
    remaining: 15
  },
  {
    productId: 10,
    count: 1,
    remaining: 4
  },
  {
    productId: 15,
    count: 2,
    remaining: 4
  },
  {
    productId: 18,
    count: 1,
    remaining: 14
  },
  {
    productId: 20,
    count: 1,
    remaining: 4
  }
]);
</script>

<style scoped>
.slash-through {
  text-decoration: line-through;
  text-decoration-color: #9ca3af;
  /* серый цвет */
  text-decoration-thickness: 1px;
}
</style>
