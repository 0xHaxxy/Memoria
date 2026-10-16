import { createRouter, createWebHistory } from 'vue-router'
import StartView from './views/StartView.vue'
import QuizView from './views/QuizView.vue'
import ResultsView from './views/ResultsView.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'start', component: StartView },
    { path: '/quiz/:step(\\d+)', name: 'quiz', component: QuizView },
    { path: '/results', name: 'results', component: ResultsView },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})
