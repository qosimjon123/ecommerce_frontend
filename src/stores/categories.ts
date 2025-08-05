import { defineStore } from "pinia"
import { ref } from "vue"

export interface SubCategory {
  id: string
  name: string
  slug: string
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  color: string
  subcategories?: SubCategory[]
}

export const useCategoriesStore = defineStore("categories", () => {
  // State
  const categories = ref<Category[]>([
    {
      id: "1",
      name: "Рецепты",
      slug: "recipes",
      icon: "🍽️",
      color: "bg-green-500",
    },
    {
      id: "2",
      name: "Вы покупали",
      slug: "purchased",
      icon: "🕒",
      color: "bg-blue-500",
    },
    {
      id: "3",
      name: "Избранное",
      slug: "favorites",
      icon: "❤️",
      color: "bg-red-500",
    },
    {
      id: "4",
      name: "Аптека",
      slug: "pharmacy",
      icon: "⚕️",
      color: "bg-green-600",
    },
    {
      id: "5",
      name: "Зоотовары",
      slug: "pets",
      icon: "🐾",
      color: "bg-amber-700",
    },
    {
      id: "6",
      name: "Скидки и новинки",
      slug: "discounts",
      icon: "%",
      color: "bg-yellow-500",
      subcategories: [
        { id: "6-1", name: "Скидки и кешбэк", slug: "discounts-cashback" },
        { id: "6-2", name: "Новинки в вашей Лавке", slug: "new-products" },
      ],
    },
    {
      id: "7",
      name: "Придумано Яндекс Лавкой",
      slug: "yandex-brand",
      icon: "🏪",
      color: "bg-orange-500",
    },
    {
      id: "8",
      name: "Цветы",
      slug: "flowers",
      icon: "🌷",
      color: "bg-pink-500",
    },
    {
      id: "9",
      name: "Овощной прилавок",
      slug: "vegetables",
      icon: "🍋",
      color: "bg-yellow-400",
    },
    {
      id: "10",
      name: "Молочный прилавок",
      slug: "dairy",
      icon: "🥛",
      color: "bg-blue-400",
    },
    {
      id: "11",
      name: "Булочная",
      slug: "bakery",
      icon: "🍞",
      color: "bg-amber-600",
    },
    {
      id: "12",
      name: "Вода и напитки",
      slug: "beverages",
      icon: "🧊",
      color: "bg-cyan-400",
    },
    {
      id: "13",
      name: "Сладкое и снеки",
      slug: "sweets",
      icon: "🍭",
      color: "bg-pink-400",
    },
    {
      id: "14",
      name: "Мясо, птица, рыба",
      slug: "meat",
      icon: "🥩",
      color: "bg-red-600",
    },
  ])

  const expandedCategoryId = ref<string | null>("6") // По умолчанию раскрыта категория "Скидки и новинки"

  // Actions
  const toggleCategory = (categoryId: string) => {
    if (expandedCategoryId.value === categoryId) {
      expandedCategoryId.value = null
    } else {
      expandedCategoryId.value = categoryId
    }
  }

  return {
    // State
    categories,
    expandedCategoryId,

    // Actions
    toggleCategory,
  }
})
