import { defineStore } from "pinia"
import { ref, computed } from "vue"

// Типы данных
export interface BasketItem {
    id: number
    product_id: number
    quantity: number
    total_item_price: number
    stock_quantity?: number
    product?: {
        id: number
        name: string
        image?: string
        sku: string
        brand?: string
        description?: string
    }
}

export interface BasketData {
    items: BasketItem[]
    total_sum: number
    total_items: number
}

export const useBasketStore = defineStore("basket", () => {
    // Состояние корзины
    const curdata = ref<BasketData>({
        items: [],
        total_sum: 0,
        total_items: 0,
    })

    // Состояние загрузки
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    // Вычисляемые свойства
    const itemsCount = computed(() => curdata.value.items.length)

    const totalQuantity = computed(() => curdata.value.items.reduce((sum, item) => sum + item.quantity, 0))

    const isEmpty = computed(() => curdata.value.items.length === 0)

    // Методы для работы с корзиной
    const getBasketItems = async () => {
        try {
            isLoading.value = true
            error.value = null

            // Здесь должен быть API запрос для получения данных корзины
            // Пока используем заглушку
            const mockData: BasketData = {
                items: [
                    {
                        id: 1,
                        product_id: 101,
                        quantity: 2,
                        total_item_price: 500,
                        stock_quantity: 10,
                        product: {
                            id: 101,
                            name: "Тестовый товар",
                            image: "/src/assets/images/product/01.jpg",
                            sku: "TEST001",
                            brand: "Test Brand",
                            description: "Описание тестового товара",
                        },
                    },
                ],
                total_sum: 500,
                total_items: 1,
            }

            // Симуляция задержки API
            await new Promise((resolve) => setTimeout(resolve, 500))

            curdata.value = mockData
        } catch (err) {
            error.value = "Ошибка при загрузке корзины"
            console.error("Ошибка загрузки корзины:", err)
        } finally {
            isLoading.value = false
        }
    }

    const addItem = async (productId: number, quantity = 1) => {
        try {
            isLoading.value = true
            error.value = null

            // Проверяем, есть ли уже товар в корзине
            const existingItemIndex = curdata.value.items.findIndex((item) => item.product_id === productId)

            if (existingItemIndex !== -1) {
                // Увеличиваем количество существующего товара
                curdata.value.items[existingItemIndex].quantity += quantity
                curdata.value.items[existingItemIndex].total_item_price =
                    curdata.value.items[existingItemIndex].quantity *
                    (curdata.value.items[existingItemIndex].total_item_price /
                        (curdata.value.items[existingItemIndex].quantity - quantity))
            } else {
                // Добавляем новый товар
                const newItem: BasketItem = {
                    id: Date.now(), // Временный ID
                    product_id: productId,
                    quantity: quantity,
                    total_item_price: quantity * 100, // Заглушка для цены
                    stock_quantity: 50, // Заглушка для остатка
                }
                curdata.value.items.push(newItem)
            }

            // Пересчитываем общую сумму
            recalculateTotal()

            // Здесь должен быть API запрос для добавления товара в корзину
            console.log(`Добавлен товар ${productId} в количестве ${quantity}`)
        } catch (err) {
            error.value = "Ошибка при добавлении товара"
            console.error("Ошибка добавления товара:", err)
        } finally {
            isLoading.value = false
        }
    }

    const updateItemQuantity = async (itemId: number, newQuantity: number) => {
        try {
            isLoading.value = true
            error.value = null

            const itemIndex = curdata.value.items.findIndex((item) => item.id === itemId)

            if (itemIndex !== -1) {
                if (newQuantity <= 0) {
                    // Удаляем товар если количество 0 или меньше
                    curdata.value.items.splice(itemIndex, 1)
                } else {
                    // Обновляем количество
                    const item = curdata.value.items[itemIndex]
                    const pricePerUnit = item.total_item_price / item.quantity
                    item.quantity = newQuantity
                    item.total_item_price = newQuantity * pricePerUnit
                }

                recalculateTotal()
            }

            // Здесь должен быть API запрос для обновления количества
            console.log(`Обновлено количество товара ${itemId} на ${newQuantity}`)
        } catch (err) {
            error.value = "Ошибка при обновлении количества"
            console.error("Ошибка обновления количества:", err)
        } finally {
            isLoading.value = false
        }
    }

    const removeItem = async (itemId: number) => {
        try {
            isLoading.value = true
            error.value = null

            const itemIndex = curdata.value.items.findIndex((item) => item.id === itemId)

            if (itemIndex !== -1) {
                curdata.value.items.splice(itemIndex, 1)
                recalculateTotal()
            }

            // Здесь должен быть API запрос для удаления товара
            console.log(`Удален товар ${itemId}`)
        } catch (err) {
            error.value = "Ошибка при удалении товара"
            console.error("Ошибка удаления товара:", err)
        } finally {
            isLoading.value = false
        }
    }

    const clearBasket = async () => {
        try {
            isLoading.value = true
            error.value = null

            curdata.value = {
                items: [],
                total_sum: 0,
                total_items: 0,
            }

            // Здесь должен быть API запрос для очистки корзины
            console.log("Корзина очищена")
        } catch (err) {
            error.value = "Ошибка при очистке корзины"
            console.error("Ошибка очистки корзины:", err)
        } finally {
            isLoading.value = false
        }
    }

    // Вспомогательная функция для пересчета общей суммы
    const recalculateTotal = () => {
        curdata.value.total_sum = curdata.value.items.reduce((sum, item) => sum + item.total_item_price, 0)
        curdata.value.total_items = curdata.value.items.length
    }

    // Получить товар по ID продукта
    const getItemByProductId = (productId: number): BasketItem | undefined => {
        return curdata.value.items.find((item) => item.product_id === productId)
    }

    // Проверить, есть ли товар в корзине
    const hasProduct = (productId: number): boolean => {
        return curdata.value.items.some((item) => item.product_id === productId)
    }

    // Получить количество конкретного товара
    const getProductQuantity = (productId: number): number => {
        const item = getItemByProductId(productId)
        return item ? item.quantity : 0
    }

    return {
        // Состояние
        curdata,
        isLoading,
        error,

        // Вычисляемые свойства
        itemsCount,
        totalQuantity,
        isEmpty,

        // Методы
        getBasketItems,
        addItem,
        updateItemQuantity,
        removeItem,
        clearBasket,
        getItemByProductId,
        hasProduct,
        getProductQuantity,
    }
})