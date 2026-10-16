<script setup>
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { startQuiz } from '../composables/useQuiz'

const router = useRouter()

function start() {
  startQuiz()
  router.push('/quiz/1')
}
</script>

<template>
  <div class="start-page">
    <AppHeader />

    <main class="main-content">
      <section class="card">
      <h2 class="welcome-title">¡Bienvenido!</h2>
        <p class="instruction">Learn Spanish, one word at a time</p>
        <img src="/image/vase.jpg" alt="" class="vase-img">
        <img src="/image/chapeau.jpg" alt="" class="hat-img">
      </section>

      <section class="side">
        <ol class="steps">
          <li class="step">Read the Spanish word</li>
          <li class="step">Pick its English meaning</li>
          <li class="step">Submit and check your score</li>
        </ol>
        <p class="meta">8 word to guess</p>
        <a class="submit-btn" href="#" @click.prevent="start">Start</a>
      </section>
    </main>
  </div>
</template>
