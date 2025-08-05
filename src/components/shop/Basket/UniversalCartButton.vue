<template>
  <button :class="[
    !isInCart && !isCartMode ? 'bg-emerald-200 text-black' : 'bg-emerald-600 text-white',
    'flex items-center justify-between transition-colors font-semibold',
    props.width ? props.width : 'max-w-500',
    props.height ? props.height : '',
    props.padding ? props.padding : 'px-4 py-1.5',
    props.textSize ? props.textSize : 'text-sm',
    props.rounded ? props.rounded : 'rounded-full'
  ]" :disabled="isLoading">
    <!-- Левая часть: минус или цена до скидки -->

    <Loader2 v-if="isLoading"
      :class="[props.loaderSize ? props.loaderSize : 'w-5 h-5', 'flex-shrink-0 animate-spin']" />

    <div v-else>
      <div class="flex items-center justify-between w-full">
        <div>
          <Minus v-if="!isInCart || !isCartMode" :class="[props.iconSize ? props.iconSize : 'w-5 h-5', 'flex-shrink-0']"
            @click.stop="handleDecrease" />
          <span v-else-if="discount > 0"
            :class="[props.labelSize ? props.labelSize : 'text-[10px]', 'line-through text-gray-400 pt-1 px-1']">
            {{ price }} ₽
          </span>
        </div>

        <!-- Центральная часть: количество (в корзине) или цена (в товарах) -->
        <span :class="props.labelSize ? props.labelSize : 'text-xs'">
          <Loader2
            v-if="isLoading"
            :class="[props.loaderSize ? props.loaderSize : 'w-5 h-5', 'flex-shrink-0 animate-spin']"
          />
          <span v-else class="px-1">{{ centerLabel }}</span>
        </span>

        <!-- Правая часть: плюс -->
        <Plus v-if="!isLoading && ((isCartMode && quantity < maxQuantity) || (!isCartMode && !isInCart))"
          :class="[props.iconSize ? props.iconSize : 'w-5 h-5', 'flex-shrink-0']" @click.stop="handleIncrease" />
      </div>
    </div>



  </button>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Minus, Plus, Loader2 } from 'lucide-vue-next'

interface Props {
  productId: number
  price: number
  discount: number
  maxQuantity: number
  quantity: number
  isCartMode?: boolean
  parentType?: 'shop' | 'cart' // Откуда пришел сигнал
  width?: string
  height?: string
  padding?: string
  textSize?: string
  rounded?: string
  loaderSize?: string
  iconSize?: string
  labelSize?: string
}

const props = withDefaults(defineProps<Props>(), {
  isCartMode: false,
  parentType: 'shop',
  width: '',
  height: '',
  padding: '',
  textSize: '',
  rounded: '',
  loaderSize: '',
  iconSize: '',
  labelSize: '',
})

const emit = defineEmits<{
  updateQuantity: [productId: number, newQuantity: number]
  addToCart: [productId: number]
  removeFromCart: [productId: number]
  increaseQuantity: [productId: number]
  decreaseQuantity: [productId: number]
}>()

// Локальное состояние
const isLoading = ref(false)
const localQuantity = ref(props.quantity)
const cart = ref<Map<number, number>>(new Map())

// Вычисляемая цена со скидкой
const finalPrice = computed(() => {
  if (props.discount > 0) {
    return (props.price * (1 - props.discount / 100)).toFixed(0)
  }
  return props.price
})

// Проверка, есть ли товар в корзине
const isInCart = computed(() => {
  return cart.value.has(props.productId) && (cart.value.get(props.productId) || 0) > 0
})

// Получение количества в корзине
const getCartQuantity = (productId: number): number => {
  return cart.value.get(productId) || 0
}

// Добавим вычисляемое свойство для отображения центральной части
const centerLabel = computed(() => {
  if (props.isCartMode) {
    return props.quantity
  } else {
    // Показываем цену (со скидкой, если есть)
    return props.discount > 0 ? `${finalPrice.value} ₽` : `${props.price} ₽`
  }
})

// Универсальные обработчики
const handleIncrease = async () => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    if (props.isCartMode) {
      // Режим корзины - увеличиваем количество
      if (localQuantity.value < props.maxQuantity) {
        localQuantity.value++
        emit('increaseQuantity', props.productId)
        emit('updateQuantity', props.productId, localQuantity.value)
      }
    } else {
      // Режим магазина - добавляем в корзину
      const currentQuantity = cart.value.get(props.productId) || 0
      cart.value.set(props.productId, currentQuantity + 1)
      emit('addToCart', props.productId)
    }

    // Симуляция загрузки
    await new Promise(resolve => setTimeout(resolve, 500))
  } finally {
    isLoading.value = false
  }
}

const handleDecrease = async () => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    if (props.isCartMode) {
      // Режим корзины - уменьшаем количество
      if (localQuantity.value > 0) {
        localQuantity.value--
        emit('decreaseQuantity', props.productId)
        emit('updateQuantity', props.productId, localQuantity.value)
      }
    } else {
      // Режим магазина - убираем из корзины
      const currentQuantity = cart.value.get(props.productId) || 0
      if (currentQuantity > 0) {
        cart.value.set(props.productId, currentQuantity - 1)
        emit('removeFromCart', props.productId)

        if (currentQuantity - 1 === 0) {
          cart.value.delete(props.productId)
        }
      }
    }

    // Симуляция загрузки
    await new Promise(resolve => setTimeout(resolve, 300))
  } finally {
    isLoading.value = false
  }
}

// Методы для внешнего управления
const addToCart = async (productId: number) => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    const currentQuantity = cart.value.get(productId) || 0
    cart.value.set(productId, currentQuantity + 1)
    emit('addToCart', productId)

    await new Promise(resolve => setTimeout(resolve, 1000))
  } finally {
    isLoading.value = false
  }
}

const removeFromCart = async (productId: number) => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    const currentQuantity = cart.value.get(productId) || 0
    if (currentQuantity > 0) {
      cart.value.set(productId, currentQuantity - 1)
      emit('removeFromCart', productId)

      if (currentQuantity - 1 === 0) {
        cart.value.delete(productId)
      }
    }

    await new Promise(resolve => setTimeout(resolve, 500))
  } finally {
    isLoading.value = false
  }
}

const increaseQuantity = async (productId: number) => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    if (localQuantity.value < props.maxQuantity) {
      localQuantity.value++
      emit('increaseQuantity', productId)
      emit('updateQuantity', productId, localQuantity.value)
    }

    await new Promise(resolve => setTimeout(resolve, 500))
  } finally {
    isLoading.value = false
  }
}

const decreaseQuantity = async (productId: number) => {
  if (isLoading.value) return

  isLoading.value = true

  try {
    if (localQuantity.value > 0) {
      localQuantity.value--
      emit('decreaseQuantity', productId)
      emit('updateQuantity', productId, localQuantity.value)
    }

    await new Promise(resolve => setTimeout(resolve, 300))
  } finally {
    isLoading.value = false
  }
}

// Экспортируем методы для внешнего использования
defineExpose({
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  getCartQuantity,
  isInCart: computed(() => isInCart.value),
  isLoading: computed(() => isLoading.value)
})
</script>
