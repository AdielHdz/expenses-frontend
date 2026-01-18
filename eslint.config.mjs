// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
export default withNuxt({
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier' // <--- importante para que Prettier no sea sobrescrito
  ],
  rules: {
    // Quitar punto y coma
    semi: ['error', 'never'],
    // Usar comillas simples
    quotes: ['error', 'single']
  }
})
