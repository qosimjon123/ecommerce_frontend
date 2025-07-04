import { useBasketStore } from '@/stores/basket.ts'
import { useToast } from 'vue-toastification'
import type { BasketItem } from '@/stores/basket.ts'

const toast = useToast()

export const Baskethandlers = {
  async addProductClick(event: MouseEvent): Promise<void> {
    event.preventDefault()
    const basketStore = useBasketStore()
    const target = event.currentTarget as HTMLElement
    if (!target) return

    const productAction = target.nextElementSibling as HTMLElement | null
    if (!productAction?.classList.contains('product-action')) return

    const productInfoDiv = target
      .closest('.product-card')
      ?.querySelector('#cart-full-info') as HTMLElement | null
    if (!productInfoDiv) {
      toast.error('Элемент #cart-full-info не найден')
      return
    }

    const product_id = Number(productInfoDiv.getAttribute('data-product-id'))
    const product_sku = productInfoDiv.getAttribute('data-sku') as string

    if (!product_id) {
      toast.error('Данные о товаре отсутствуют id')
      return
    }
    if (!product_sku) {
      toast.error('Данные о товаре отсутствуют sku')
      return
    }

    try {
      const success = await basketStore.addProduct(product_id, product_sku)
      if (success) {
        await basketStore.getBasketItems()
        const addedItem = basketStore.curdata.items.find((i) => i.product_id === product_id)

        if (addedItem) {
          target.style.display = 'none'
          productAction.style.display = 'flex'
          productAction.dataset.itemId = addedItem.id.toString()

          const input = productAction.querySelector('.action-input') as HTMLInputElement | null
          if (input) input.value = addedItem.quantity.toString()

          this.updateActionButtons(productAction, addedItem, target)
        }
      }
    } catch (error) {
      console.error('Error adding product:', error)
      toast.error('Ошибка при добавлении товара')
    }
  },

  updateActionButtons(productAction: HTMLElement, item: BasketItem, target: HTMLElement): void {
    const actionMinus = productAction.querySelector('.action-minus') as HTMLElement | null
    const actionPlus = productAction.querySelector('.action-plus') as HTMLElement | null

    if (actionMinus) {
      actionMinus.toggleAttribute('disabled', item.quantity < 1)
    }

    if (actionPlus && item.stock_quantity !== undefined) {
      const isMaxReached = item.quantity >= item.stock_quantity
      actionPlus.toggleAttribute('disabled', isMaxReached)
      actionPlus.classList.toggle('max-reached', isMaxReached)

      if (isMaxReached) {
        toast.info(`Максимум ${item.stock_quantity} шт.`)
      }
    }
  },

  async incrementProductQuantity(event: Event): Promise<void> {
    event.preventDefault()
    const basketStore = useBasketStore()
    const target = event.currentTarget as HTMLElement
    if (!target) return

    const productAction = target.closest('.product-action') as HTMLElement | null
    if (!productAction) return

    const itemId = parseInt(productAction.dataset.itemId || '0')
    if (!itemId) {
      toast.error('ID записи в корзине не найден')
      return
    }

    try {
      const response = await basketStore.updateItemQuantity(itemId, 1)
      console.log(response)
      if (response.success && response.quantity !== undefined) {
        const item = basketStore.curdata.items.find((i) => i.id === itemId)
        console.log(item)
        if (item) {
          this.updateActionButtons(productAction, item, target)
        }
      } else if (response.maxAvailable !== undefined) {
        const item = {
          id: itemId,
          quantity: response.maxAvailable,
          stock_quantity: response.maxAvailable,
        } as BasketItem
        this.updateActionButtons(productAction, item, target)
      }
    } catch (error) {
      console.error('Error incrementing quantity:', error)
      toast.error('Ошибка при изменении количества')
    }
  },

  async decrementProductQuantity(event: Event): Promise<void> {
    event.preventDefault()
    const basketStore = useBasketStore()
    console.log(basketStore.curdata)
    const target = event.currentTarget as HTMLElement
    if (!target) return

    const productAction = target.closest('.product-action') as HTMLElement | null
    if (!productAction) return

    const itemId = parseInt(productAction.dataset.itemId || '0')
    console.log(itemId)
    if (!itemId) {
      toast.error('ID записи в корзине не найден')
      return
    }

    try {
      const response = await basketStore.updateItemQuantity(itemId, -1)
      console.log(response)
      if (response.success && response.quantity !== undefined) {
        if (response.quantity === 0) {
          if (!productAction.classList.contains('cart')) {
            productAction.style.display = 'none'
          }
          const productAddElement = productAction.previousElementSibling as HTMLElement | null
          if (productAddElement?.classList.contains('product-add')) {
            productAddElement.style.display = 'block'
          }

          console.log('first')
        } else {
          const item = basketStore.curdata.items.find((i) => i.id === itemId)
          console.log(item)
          if (item) {
            this.updateActionButtons(productAction, item, target)
          }
        }
      }
    } catch (error) {
      console.error('Error decrementing quantity:', error)
      toast.error('Ошибка при изменении количества')
    }
  },
}
