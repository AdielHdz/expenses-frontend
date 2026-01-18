<script setup lang="ts">
const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
  onContinue: {
    type: Function,
    required: true
  },
  loading: {
    type: Boolean,
    required: false
  },
  text: {
    type: String,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:state', value: boolean): void
  (e: 'closeModal'): void
}>()

const isModalOpen = computed(() => props.isModalOpen)

const closeModal = () => {
    emit('closeModal')
}
</script>

<template>
  <UModal
    :open="isModalOpen"
    :close="{
      onClick: closeModal
    }"
    class="w-full max-w-100"
    :title="title"
    :description="description"
  >
    <template #body>
      <p>{{ text }}</p>
      <div class="w-full flex mt-5 gap-5">
        <UButton  @click="closeModal" class="w-full flex justify-center" variant="outline">Cancel</UButton>
        <UButton @click="() => onContinue()" :loading="loading" class="w-full flex justify-center" variant="solid"">Delete</UButton>
      </div>
    </template>
  </UModal>
</template>
