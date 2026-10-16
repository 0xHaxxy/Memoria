
<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import { useQuiz, startQuiz, TOTAL } from '../composables/useQuiz'

// Récupérer le système de navigation.
const router = useRouter()

// Récupérer les données et les fonctions du quiz.
const { state, score, ready } = useQuiz()

// Vérifier si les résultats du quiz sont disponibles.
if (!ready.value) {
  // Si le quiz n'est pas terminé ou prêt,
  // rediriger l'utilisateur vers la page d'accueil.
  router.replace('/')
}

// Calculer et afficher le message correspondant au score.
const stat = computed(() => {
  // Calculer le pourcentage de bonnes réponses.
  const pct = Math.round((score.value / TOTAL) * 100)

  // Déterminer le message à afficher selon le pourcentage.
  if (pct === 100) {
    return `${pct}% — perfect!`
  }

  if (pct >= 50) {
    return `${pct}% — good job, keep going`
  }

  return `${pct}% — try again, you'll get there`
})

// Préparer les informations de chaque réponse
// pour les afficher dans la liste des résultats.
const rows = computed(() => {
  // Parcourir toutes les questions du quiz.
  return state.questions.map((q, i) => {
    // Récupérer la réponse donnée par l'utilisateur.
    const answer = state.answers[i]

    // Préparer les informations à afficher pour cette question.
    return {
      // Mot en espagnol présenté dans la question.
      word: q.es,

      // Réponse de l'utilisateur.
      // Afficher un tiret si aucune réponse n'existe.
      answer: answer?.choice ?? '—',

      // Indiquer si la réponse est correcte.
      // Convertir la valeur obtenue en booléen.
      correct: Boolean(answer?.correct),

      // Traduction anglaise attendue.
      expected: q.en,
    }
  })
})

// Recommencer une nouvelle partie du quiz.
function playAgain() {
  // Réinitialiser et démarrer une nouvelle partie.
  startQuiz()

  // Naviguer vers la première question.
  router.push('/quiz/1')
}
</script>

<template>
  <div class="quiz-page">
    <AppHeader subtitle="Your results" />

    <main class="main-content">
      <section class="card">
        <img src="/image/vase.jpg" alt="" class="vase-img">

        <h2 class="final-score">
          {{ score }}/{{ TOTAL }}
        </h2>

        <p class="instruction">
          {{ stat }}
        </p>

        <img src="/image/chapeau.jpg" alt="" class="hat-img">
      </section>

      <section class="side">
        <h2 class="results-title">Your answers</h2>

        <ul class="results-list">
          <li
            v-for="row in rows"
            :key="row.word"
            class="result-item"
            :class="row.correct ? 'correct' : 'wrong'"
          >
            <span class="result-word">
              {{ row.word }}
            </span>

            <span class="user-answer">
              {{ row.answer }}

              <span
                v-if="!row.correct"
                class="correction-text"
              >
                → {{ row.expected }}
              </span>
            </span>

            <span class="status-icon">
                {{ row.correct ? '✓' : '✗' }}
            </span>
          </li>
        </ul>

        <a
          class="submit-btn"
          href="#"
          @click.prevent="playAgain"
        >
          Play again
        </a>
      </section>
    </main>
  </div>
</template>
