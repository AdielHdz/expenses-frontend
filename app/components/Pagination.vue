<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array,
    default: {}
  },
  pagination: {
    type: Object,
    defaul: {},
    required: true
  },
  currentPaginated: {
    type: Object,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:page', value: number): void
  (e: 'update:limit', value: number): void
}>()

const page = computed({
  get: () => props.currentPaginated.page,
  set: (value: number) => emit('update:page', value)
})

const limit = computed({
  get: () => props.currentPaginated.limit,
  set: (value: number) => emit('update:limit', value)
})
</script>

<template>
  <div class="flex justify-between py-2.5">
    <UPagination
      v-model:page="page"
      :items-per-page="pagination.limit"
      :total="currentPaginated.total"
    />
  </div>
</template>
