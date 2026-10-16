import { reactive, computed } from 'vue'
import { WORDS } from '../data/words'

// Nombre total de questions dans une partie.
export const TOTAL = 8

// État partagé entre les différentes pages de l'application.
const state = reactive({
  questions: [], // Chaque question contient es, en et options.
  answers: [],   // Chaque réponse contient choice et correct, ou vaut null.
})

// Mélange les éléments d'une liste en utilisant la méthode de Fisher-Yates.
// La liste originale n'est pas modifiée : une copie est créée au début.
function shuffle(list) {
  const a = [...list]

  // Parcourt la copie de la fin vers le début.
  for (let i = a.length - 1; i > 0; i--) {
    // Choisit au hasard une position comprise entre 0 et i inclus.
    const j = Math.floor(Math.random() * (i + 1))

    // Échange les éléments situés aux positions i et j.
    const temporaryValue = a[i]
    a[i] = a[j]
    a[j] = temporaryValue
  }

  // Renvoie la liste mélangée.
  return a
}

// Prépare une nouvelle partie avec quatre mots choisis au hasard.
export function startQuiz() {
  // Récupère tous les mots espagnols disponibles dans le dictionnaire.
  const spanishWords = Object.keys(WORDS)

  // Mélange les mots, puis conserve les quatre premiers.
  const chosen = shuffle(spanishWords).slice(0, TOTAL)

  // Supprime les questions de la partie précédente.
  state.questions = []

  // Prépare une question pour chacun des mots choisis.
  for (const es of chosen) {
    // Récupère la traduction anglaise correcte du mot espagnol.
    const en = WORDS[es]

    // Commence la liste des propositions avec la bonne réponse.
    const options = [en]

    // Mélange les mots disponibles afin de choisir les mauvaises réponses.
    const mixed = shuffle(spanishWords)

    // Parcourt les mots mélangés jusqu'à obtenir quatre propositions.
    for (const other of mixed) {
      // Arrête la boucle dès que la liste contient quatre propositions.
      if (options.length === 4) {
        break
      }

      // Le mot demandé ne doit pas être utilisé comme mauvaise réponse.
      if (other !== es) {
        // Ajoute la traduction anglaise du mot choisi comme distracteur.
        options.push(WORDS[other])
      }
    }

    // Mélange les propositions pour varier la position de la bonne réponse.
    const shuffledOptions = shuffle(options)

    // Ajoute la question et ses informations à la partie en cours.
    state.questions.push({
      es: es,
      en: en,
      options: shuffledOptions,
    })
  }

  // Crée une case vide pour chaque réponse de la nouvelle partie.
  state.answers = Array(TOTAL).fill(null)
}

// Enregistre le choix de l'utilisateur et vérifie s'il est correct.
export function saveAnswer(index, choice) {
  // Récupère la question correspondant à l'index reçu.
  const question = state.questions[index]

  // Compare le choix de l'utilisateur à la traduction attendue.
  const correct = choice === question.en

  // Enregistre le choix ainsi que le résultat de la vérification.
  state.answers[index] = {
    choice: choice,
    correct: correct,
  }
}

// Fournit l'état du quiz, le score calculé et l'état de préparation.
export function useQuiz() {
  // Calcule le score en comptant les réponses correctes.
  const score = computed(() => {
    return state.answers.filter((a) => a !== null && a.correct).length
  })

  // Vérifie que le nombre de questions correspond au nombre attendu.
  const ready = computed(() => {
    return state.questions.length === TOTAL
  })

  // Renvoie les données utilisées par les différentes pages.
  return {
    state: state,
    score: score,
    ready: ready,
  }
}
