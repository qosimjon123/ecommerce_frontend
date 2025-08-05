import { defineStore } from "pinia"
import { ref, computed } from "vue"

export interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    stock_quantity?: number
}

export interface PaymentCard {
    id: string
    number: string
    holder: string
    expiry: string
    type: "visa" | "mastercard" | "mir"
    isDefault: boolean
}

export const useCartStore = defineStore("cart", () => {
    // State
    const isCartVisible = ref(false) // для мобильной корзины
    const isCheckoutModalOpen = ref(false) // для модалки checkout
    const currentStep = ref<"cart" | "delivery" | "payment" | "confirmation">("cart")
    const items = ref<CartItem[]>([
        // Тестовые данные
        {
            id: "1",
            name: "Молоко Простоквашино 3.2%",
            price: 89,
            quantity: 2,
            image: "/placeholder.svg?height=64&width=64",
            stock_quantity: 10,
        },
        {
            id: "2",
            name: "Хлеб Бородинский",
            price: 45,
            quantity: 1,
            image: "/placeholder.svg?height=64&width=64",
            stock_quantity: 5,
        },
    ])

    const isCouponVisible = ref(false)
    const couponCode = ref("")
    const isLoading = ref(false)
    const deliveryTime = ref("15 минут")
    const storeHours = ref("08:00 до 23:00")
    const isStoreOpen = ref(true)

    // Payment
    const paymentCards = ref<PaymentCard[]>([
        {
            id: "1",
            number: "**** **** **** 1234",
            holder: "IVAN PETROV",
            expiry: "12/25",
            type: "visa",
            isDefault: true,
        },
        {
            id: "2",
            number: "**** **** **** 5678",
            holder: "IVAN PETROV",
            expiry: "08/26",
            type: "mastercard",
            isDefault: false,
        },
    ])
    const selectedCardId = ref("1")

    // Form data
    const deliveryForm = ref({
        name: "",
        phone: "",
        address: "",
        comment: "",
    })

    // Computed
    const itemsCount = computed(() => items.value.length)
    const totalPrice = computed(() => items.value.reduce((sum, item) => sum + item.price * item.quantity, 0))
    const isEmpty = computed(() => items.value.length === 0)
    const isMobile = computed(() => {
        if (typeof window === "undefined") return false
        return window.innerWidth < 1024
    })

    const selectedCard = computed(() => paymentCards.value.find((card) => card.id === selectedCardId.value))

    // Actions
    const openCart = () => {
        if (isMobile.value) {
            isCartVisible.value = true
        }
        // На десктопе корзина всегда видна, ничего не делаем
    }

    const closeCart = () => {
        isCartVisible.value = false
        currentStep.value = "cart"
        isCouponVisible.value = false
    }

    const openCheckoutModal = () => {
        isCheckoutModalOpen.value = true
        currentStep.value = "delivery"
    }

    const closeCheckoutModal = () => {
        isCheckoutModalOpen.value = false
        currentStep.value = "cart"
    }

    const goToStep = (step: typeof currentStep.value) => {
        currentStep.value = step
    }

    const toggleCoupon = () => {
        isCouponVisible.value = !isCouponVisible.value
    }

    const addItem = (item: Omit<CartItem, "quantity">) => {
        const existingItem = items.value.find((i) => i.id === item.id)
        if (existingItem) {
            existingItem.quantity++
        } else {
            items.value.push({ ...item, quantity: 1 })
        }
    }

    const removeItem = (id: string) => {
        const index = items.value.findIndex((item) => item.id === id)
        if (index > -1) {
            items.value.splice(index, 1)
        }
    }

    const incrementQuantity = (id: string) => {
        const item = items.value.find((i) => i.id === id)
        if (item && item.quantity < (item.stock_quantity || Number.POSITIVE_INFINITY)) {
            item.quantity++
        }
    }

    const decrementQuantity = (id: string) => {
        const item = items.value.find((i) => i.id === id)
        if (item && item.quantity > 1) {
            item.quantity--
        }
    }

    const selectCard = (cardId: string) => {
        selectedCardId.value = cardId
    }

    const submitOrder = async () => {
        isLoading.value = true
        try {
            // Имитация отправки заказа
            await new Promise((resolve) => setTimeout(resolve, 2000))
            goToStep("confirmation")
        } catch (error) {
            console.error("Order submission failed:", error)
        } finally {
            isLoading.value = false
        }
    }

    const clearCart = () => {
        items.value = []
    }

    return {
        // State
        isCartVisible,
        isCheckoutModalOpen,
        currentStep,
        items,
        isCouponVisible,
        couponCode,
        isLoading,
        deliveryTime,
        storeHours,
        isStoreOpen,
        paymentCards,
        selectedCardId,
        deliveryForm,

        // Computed
        itemsCount,
        totalPrice,
        isEmpty,
        isMobile,
        selectedCard,

        // Actions
        openCart,
        closeCart,
        openCheckoutModal,
        closeCheckoutModal,
        goToStep,
        toggleCoupon,
        addItem,
        removeItem,
        incrementQuantity,
        decrementQuantity,
        selectCard,
        submitOrder,
        clearCart,
    }
})
