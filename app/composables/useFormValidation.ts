// composables/useFormValidation.ts
import * as yup from 'yup'
import { ref } from 'vue'

export function useFormValidation(config: yup.ObjectShape) {
  const errors = ref<{ [key: string]: string }>({})

  const schema = yup.object(config)

  const validate = async (formData: Record<string, any>) => {
    try {
      await schema.validate(formData, { abortEarly: false })
      errors.value = {}
      return true
    } catch (err: any) {
      const formattedErrors: Record<string, string> = {}
      err.inner.forEach((e: any) => {
        if (e.path) formattedErrors[e.path] = e.message
      })
      errors.value = formattedErrors
      return false
    }
  }

  return { errors, validate, schema }
}
