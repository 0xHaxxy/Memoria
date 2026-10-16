<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  subtitle: {
    type: String,
    default: 'Learn Spanish',
  },
})

const router = useRouter()

function goBack() {
  if (props.backTo !== '') {
    router.push(props.backTo)
  }
}
</script>

<template>
  <header class="app-header">
    <h1 class="app-title">Memoria</h1>
    <p class="app-sub">{{ subtitle }}</p>
  </header>
</template>
