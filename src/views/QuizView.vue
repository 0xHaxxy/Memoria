<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { useQuiz, saveAnswer, TOTAL } from '../composables/useQuiz'

const route = useRoute()
const router = useRouter()
const { state, ready } = useQuiz()

// si on rafraîchit la page, le quiz est perdu => retour au début
if (!ready.value) router.replace('/')

const step = computed(() => Number(route.params.step))
const question = computed(() => state.questions[step.value - 1])

const PROGRESS = ['quarter', 'half', 'three-quarters', 'full']
const progressClass = computed(() => PROGRESS[step.value - 1])

const selected = ref(null)
const checked = ref(false)
const feedback = ref({ text: '', type: '' })

const isLast = computed(() => step.value === TOTAL)
const buttonLabel = computed(() => {
  if (!checked.value) return 'Submit'
  return isLast.value ? 'See results' : 'Next'
})

function pick(option) {
  if (checked.value) return // réponse verrouillée après Submit
  selected.value = option
}

function optionClass(option) {
  return {
    selected: option === selected.value && !checked.value,
    correct: checked.value && option === question.value.en,
    wrong: checked.value && option === selected.value && option !== question.value.en,
  }
}

function onSubmit() {
  if (!checked.value) {
    if (!selected.value) {
      feedback.value = { text: 'Pick an answer first', type: 'error' }
      return
    }
    saveAnswer(step.value - 1, selected.value)
    checked.value = true
    feedback.value =
      selected.value === question.value.en
        ? { text: 'Correct!', type: 'success' }
        : { text: `Incorrect — the answer is "${question.value.en}"`, type: 'error' }
    return
  }
  router.push(isLast.value ? '/results' : `/quiz/${step.value + 1}`)
}
</script>

<template>
  <div v-if="question" class="quiz-page">
    <AppHeader />

    <main class="main-content">
      <section class="card">
        <img v-if="step >=0" src="/image/vase.jpg" alt="" class="vase-img">
        <h2 class="spanish-word">{{ question.es }}</h2>
        <p class="instruction">What does it mean?</p>
        <img src="/image/chapeau.jpg" alt="" class="hat-img">
      </section>

      <section class="side">
        <div class="progress-bar">
          <div class="progress-fill" :class="progressClass"></div>
        </div>
        <p class="progression">{{ step }}/{{ TOTAL }}</p>

        <div class="options-grid">
          <button
            v-for="option in question.options"
            :key="option"
            class="option-btn"
            :class="optionClass(option)"
            @click="pick(option)"
          >
            {{ option }}
          </button>
        </div>

        <!-- garde toujours la même hauteur même vide -->
        <p class="feedback-msg" :class="feedback.type">{{ feedback.text }}</p>

        <a class="submit-btn" href="#" @click.prevent="onSubmit">{{ buttonLabel }}</a>
      </section>
    </main>
  </div>
</template>
