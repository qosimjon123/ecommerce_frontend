import { ref } from 'vue'
import { defineStore } from 'pinia'
import { v4 } from 'uuid'

export const AnonymousStore = defineStore('anonymous', () => {
  const anonymousId = ref<string>(localStorage.getItem('sessionId') || '')
  const regex = /[a-f0-9]{8}-?[a-f0-9]{4}-?4[a-f0-9]{3}-?[89ab][a-f0-9]{3}-?[a-f0-9]{12}/i

  function generateAnonymousId() {
    if (!anonymousId.value || !regex.test(anonymousId.value)) {
      const newId = v4()
      anonymousId.value = newId
      localStorage.setItem('sessionId', newId)
    }
  }

  function clearAnonymousId() {
    anonymousId.value = ''
    localStorage.removeItem('sessionId')
  }

  return {
    anonymousId,
    generateAnonymousId,
    clearAnonymousId,
  }
})
