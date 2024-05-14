import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CinemaView from '@/views/CinemaView.vue'
import CinemaDetail from '@/components/CinemaDetail.vue'
import MovieSearchView from '@/views/MovieSearchView.vue'
import NowInTheaterView from '@/views/NowInTheaterView.vue'
import CommunityView from '@/views/CommunityView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/cinema_list',
      name: 'cinema_list',
      component: CinemaView,
      children: [
        {path: 'detail', name: 'cinema_detail', component: CinemaDetail}
      ]
    },
    {
      path: '/movie_search',
      name: 'movie_search',
      component: MovieSearchView
    },
    {
      path: '/now_in_theater',
      name: 'now_in_theater',
      component: NowInTheaterView,
      children: [
        {path: 'detail', name: 'now_cinema_detail', component: CinemaDetail}
      ]
    },
    {
      path: '/community',
      name: 'community',
      component: CommunityView,
    }
  ]
})

export default router
