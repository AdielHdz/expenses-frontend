# 💻 Expenses Frontend (Nuxt 4)

Frontend de la aplicación **Expenses**, encargado de la visualización y gestión de gastos.
Consume el backend construido con **NestJS + TypeORM + PostgreSQL**.

---

## 🚀 Tecnologías

- Nuxt 4
- Nuxt UI
- Vue 3
- TypeScript
- Pinia
- Tailwind CSS
- axios

---

## 📁 Estructura del proyecto

```text
app/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── Pagination.vue
│   └── Table.vue
├── composables/
│   └── useForm.ts
├── pages/
│   └── index.vue
├── services/
│   ├── axios.ts
│   └── expenses.ts
├── types/
│   ├── expenses.ts
│   ├── index.ts
│   └── pagination.ts
├── utils/
│   └── validation-objects.ts
├── app.config.ts
└── app.vue

```

---

## ⚙️ Requisitos previos

- Node.js >= 18
- npm o pnpm
- Backend de Expenses corriendo

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
NUXT_PUBLIC_API_URL=http://localhost:3001
```

> ⚠️ **Nota:** Nunca subas el archivo `.env` al repositorio. Usa `.env.example` como referencia.

---

## 📦 Instalación

```bash
npm install
```

---

## ▶️ Levantar el proyecto

```bash
npm run dev
```

La aplicación estará disponible en:

```text
http://localhost:3000
```

---

## 🔌 Comunicación con el Backend

Este frontend consume los siguientes endpoints del backend:

- `GET /expenses`
- `GET /expenses/search`
- `GET /expenses/categories`
- `POST /expenses`
- `PUT /expenses/:id`
- `DELETE /expenses/:id`

Backend URL por defecto:

```text
http://localhost:3001
```

---

## 🧠 Notas importantes

- Las llamadas HTTP se realizan mediante **axios**
- El proyecto está preparado para crecer de forma modular
- El frontend es completamente independiente del backend

---

## 🔗 Proyectos relacionados

- Backend: [https://github.com/AdielHdz/expenses-api](https://github.com/AdielHdz/expenses-api)

---

## 👤 Autor

**Adiel Hernández**
Frontend / Fullstack Developer
