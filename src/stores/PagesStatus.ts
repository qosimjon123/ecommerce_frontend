import { ref } from 'vue'
import { defineStore } from 'pinia'

const StoreBackendUrl = 'http://127.0.0.1:8000'

export const PagesStatus = defineStore('page-status', () => {
  const isCartLoading = ref(true)
  const selectedProduct = ref<StoreProduct | null>(null) // Типизируем как StoreProduct | null
  const isProfileSidebarOpen = ref<Boolean | undefined>(false)

  const toggleSidebar = (): void => {
    isProfileSidebarOpen.value = !isProfileSidebarOpen.value
  }

  function setCartStatus(status: boolean) {
    isCartLoading.value = status
  }

  function setSelectedProduct(product: StoreProduct | null) {
    selectedProduct.value = product
  }

  return {
    isCartLoading,
    setCartStatus,
    StoreBackendUrl,
    selectedProduct,
    setSelectedProduct,
    isProfileSidebarOpen,
    toggleSidebar,
  }
})

// Интерфейс StoreProduct для типизации
export interface StoreProduct {
  links: {
    next: number | null
    previous: number | null
  }
  count: number | null
  results: Array<{
    id: number
    product: {
      id: number
      name: string
      description: string
      sku: string
      image: string | null
      other_images: string[]
      brand: string
      subcategory: string
      created_at: string
      updated_at: string
    }
    store: {
      id: number
      brand: number
      address: string
      city: string
      latitude: number
      longitude: number
      delivery_radius_km: number
      is_active: boolean
    }
    price: number
    discount: number
    quantity: number
  }>
}
