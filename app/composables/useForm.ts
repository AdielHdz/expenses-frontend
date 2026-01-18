import { reactive } from 'vue'

export function useForm<T extends Record<string, any>>(initialValues: T) {
  const form = reactive({ ...initialValues }) as T

  const updateField = <K extends keyof T>(key: K, value: T[K]) => {
    form[key] = value
  }

  const resetForm = () => {
    ;(Object.keys(initialValues) as (keyof T)[]).forEach((key) => {
      form[key] = initialValues[key]
    })
  }

  return {
    state: form,
    updateField,
    resetForm
  }
}
