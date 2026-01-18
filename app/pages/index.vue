<script setup lang="ts">
import type { Expense, ExpenseSearchPagination, PaginatedUI } from '~/types'
import * as expenseService from '~/services/expenses'
import Pagination from '~/components/Pagination.vue'
import type { TableColumn } from '@nuxt/ui'

const toast = useToast()

const category = ref('all')

const pagination: ExpenseSearchPagination = reactive({
  limit: 10,
  page: 1,
  category: '',
  description: ''
})

const currentPaginated: Ref<PaginatedUI> = ref({
  total: 0,
  totalPages: 0,
  page: 0,
  limit: 10
})

const isTableLoading = ref(false)

const updateCurrentPaginated = (meta: PaginatedUI) => {
  currentPaginated.value = { ...meta }
}

const expenses: Ref<Expense[]> = ref([])

const getExpenses = async () => {
  try {
    isTableLoading.value = true
    const { data, meta } = await expenseService.searchExpenses(pagination)

    expenses.value = data
    updateCurrentPaginated(meta)
  } catch (error: any) {
    console.log(error?.message)
    toast.add({
      title: 'Uh oh! Something went wrong. The expenses could not be loaded',
      description: '',
      color: 'error'
    })
    expenses.value = []
  } finally {
    isTableLoading.value = false
  }
}

const categories = ref([''])

const getCategories = async () => {
  try {
    const data = await expenseService.getCategories()

    categories.value = data
  } catch (error: any) {
    toast.add({
      title: 'Uh oh! Something went wrong. The categories could not be loaded',
      description: '',
      color: 'error'
    })
  }
}

onMounted(() => {
  getCategories()
  getExpenses()
})

const handleSearchInput = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const value: string = target.value

  pagination.description = value
  pagination.page = 1
  try {
    isTableLoading.value = true

    const { data, meta } = await expenseService.searchExpenses(pagination)

    expenses.value = data
    updateCurrentPaginated(meta)
  } catch (error: any) {
    console.log(error.message)
    expenses.value = []
  } finally {
    isTableLoading.value = false
  }
}

const isModalOpen = ref(false)

const { updateField, resetForm, state } = useForm({
  description: '',
  amount: 0,
  category: ''
})

const schema = {
  description: { type: 'string', required: true },
  amount: { type: 'number', required: true },
  category: { type: 'string', required: true }
}

const isCreating = ref(false)

const items = ref([5, 10, 15, 20, 30, 40, 50])
// Estas categorias deberían obtenerse del servidor, por esta ocasión las puse hardcodeadas para avanzar.

const closeModal = () => {
  resetForm()
  isModalOpen.value = false
  currentExpenseUpdateId.value = ''
}

const createExpense = async () => {
  try {
    if (hasEmptyValues(state)) {
      toast.add({
        title: 'Uh oh! Something went wrong.',
        description: 'Fill in all the fields in the form',
        color: 'error'
      })
      return
    }
    isCreating.value = true

    const newExpense = await expenseService.createExpense(state)

    if (newExpense)
      toast.add({
        title: 'Expense saved succesffully',
        description: 'Keep yourself saving expenses',
        color: 'success'
      })
    isCreating.value = false
    closeModal()
    isTableLoading.value = true

    await getExpenses()
  } catch (error: any) {
    console.log(error?.message)

    toast.add({
      title: 'Uh oh! Something went wrong.',
      description: error?.message ?? '',
      color: 'error'
    })
  } finally {
    isTableLoading.value = false
    isCreating.value = false
  }
}

watch(
  () => currentPaginated.value.page,
  (newValue) => {
    pagination.page = newValue

    getExpenses()
  }
)

watch(
  () => currentPaginated.value.limit,
  (newValue) => {
    pagination.limit = newValue
    getExpenses()
  }
)

watch(category, (newValue) => {
  if (newValue === 'all') {
    pagination.category = ''
  } else {
    pagination.category = newValue
  }
  getExpenses()
})

const currentExpenseUpdateId = ref('')
const isUpdating = ref(false)

const handleOpenUpdateModal = (record: Expense) => {
  const { id, description, amount, category } = record

  currentExpenseUpdateId.value = id
  updateField('description', description)
  updateField('amount', amount)
  updateField('category', category)

  console.log(currentExpenseUpdateId.value)

  isModalOpen.value = true
}

const updateExpense = async () => {
  try {
    console.log({ ...state, id: currentExpenseUpdateId.value })

    if (hasEmptyValues(state)) {
      toast.add({
        title: 'Uh oh! Something went wrong.',
        description: 'Fill in all the fields in the form',
        color: 'error'
      })
      return
    }
    isUpdating.value = true
    const expenseUpdated = await expenseService.updateExpense(
      currentExpenseUpdateId.value,
      {
        ...state
      }
    )

    if (expenseUpdated)
      toast.add({
        title: 'Expense updated succesffully',
        description: "Everything it's ok",
        color: 'success'
      })

    closeModal()
    isUpdating.value = false

    isTableLoading.value = true
    await getExpenses()
  } catch (error: any) {
    console.log(error.message)
    toast.add({
      title: 'Uh oh! Something went wrong.',
      description: error?.message ?? '',
      color: 'error'
    })
  } finally {
    isTableLoading.value = false
    isUpdating.value = false
  }
}

const tableColumns: TableColumn<Expense>[] = [
  {
    accessorKey: 'id', // clave usada para tomar el dato
    header: 'ID' // texto mostrado en la cabecera
  },
  {
    accessorKey: 'description',
    header: 'Description'
  },
  {
    accessorKey: 'amount',
    header: 'Amount'
  },
  {
    accessorKey: 'category',
    header: 'Category'
  },
  {
    accessorKey: 'date',
    header: 'Date'
  },
  {
    id: 'edit', // columna custom para acciones
    header: 'Edit',
    cell: ({ row }) =>
      h('div', { class: 'flex' }, [
        // ✏️ EDIT
        h(UButton, {
          icon: 'i-heroicons-pencil-square',
          size: 'md',
          variant: 'ghost',
          onClick: () => handleOpenUpdateModal(row.original)
        })
      ])
  },
  {
    id: 'delete', // columna custom para acciones
    header: 'Delete',
    cell: ({ row }) =>
      h('div', { class: 'flex gap-2' }, [
        h(UButton, {
          icon: 'i-heroicons-trash',
          size: 'md',
          color: 'error',
          variant: 'ghost',
          onClick: () => removeExpense(row.original.id)
        })
      ])
  }
]

const removeExpense = async (id: string) => {
  try {
    isTableLoading.value = true
    const response = await expenseService.removeExpense(id)

    console.log(response.status)

    if (response.status === 204)
      toast.add({
        title: 'Expense removed',
        description: "Everything it's ok",
        color: 'info'
      })

    await getExpenses()
  } catch (error: any) {
    console.log(error.message)
    toast.add({
      title: 'Uh oh! Something went wrong.',
      description: error?.message ?? '',
      color: 'error'
    })
  } finally {
    isTableLoading.value = false
  }
}
</script>

<template>
  <main>
    <h1
      class="text-2xl text-green-400 p-5 md:p-10 md:text-5xl font-semibold select-none"
    >
      Expenses
    </h1>

    <UModal
      :open="isModalOpen"
      :close="{
        onClick: () => {
          closeModal()
        }
      }"
      class="w-full max-w-100"
      title="Expense"
      description="Adding expenses helps you improve your finances."
    >
      <template #body>
        <UForm
          @submit="() => {}"
          :schema="{}"
          :state="state"
          class="grid gap-5"
        >
          <UFormField label="Description" name="description">
            <UInput v-model="state.description" class="w-full" />
          </UFormField>
          <UFormField label="Amount" name="amount">
            <UInput v-model="state.amount" type="number" class="w-full" />
          </UFormField>
          <UFormField label="Category" name="category">
            <UInput v-model="state.category" class="w-full" />
          </UFormField>
          <UButton
            class="w-full flex justify-center"
            size="xl"
            @click="
              () => {
                if (currentExpenseUpdateId) updateExpense()
                else createExpense()
              }
            "
            :loading="isCreating || isUpdating"
            >Done</UButton
          >
        </UForm>
      </template>
    </UModal>
    <div class="px-5 md:px-10 flex flex-col gap-5">
      <div class="flex justify-between gap-5">
        <UInput
          :value="pagination.description"
          @input="handleSearchInput"
          class="max-w-sm"
          placeholder="Description"
          size="xl"
        />
        <USelectMenu
          :items="categories"
          :search-input="false"
          class="w-50"
          size="xl"
          placeholder="Category"
          v-model="category"
        />
        <UButton
          size="xl"
          color="neutral"
          variant="outline"
          :disabled="isTableLoading"
          class="px-5 md:px-10 cursor-pointer"
          @click="isModalOpen = true"
          >New</UButton
        >
      </div>
      <div class="min-h-63">
        <UTable
          :data="expenses"
          class="flex-1"
          :loading="isTableLoading"
          loading-color="primary"
          loading-animation="carousel"
          :columns="tableColumns"
        >
          <template #cell-actions="{ row }">
            <div class="flex gap-2">
              <h5 v-bind="row.original">Prueba</h5>
            </div>
          </template>
        </UTable>
      </div>
      <Pagination
        :items="items"
        :pagination="pagination"
        :current-paginated="currentPaginated"
        v-model:page="currentPaginated.page"
        v-model:limit="currentPaginated.limit"
      />
    </div>
  </main>
</template>
