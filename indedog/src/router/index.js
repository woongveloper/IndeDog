import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import CinemaView from '@/views/CinemaView.vue'
import CinemaDetail from '@/components/CinemaDetail.vue'
import MovieSearchView from '@/views/MovieSearchView.vue'
import NowInTheaterView from '@/views/NowInTheaterView.vue'
import CommunityView from '@/views/CommunityView.vue'
import SignUp from '@/views/SignUp.vue'
import MovieDetail from '@/components/MovieDetail.vue'
import MovieSearchResult from '@/components/MovieSearchResult.vue'
import CommunityCreateView from '@/views/CommunityCreateView.vue'
import CommunityDetailView from '@/views/CommunityDetailView.vue'
import { useCounterStore } from '@/stores/counter'
import CinemaInfoView from '@/views/CinemaInfoView.vue'
import NoticeView from '@/views/NoticeView.vue'
import CommunityUpdate from '@/components/CommunityUpdate.vue'
import AIRecommendDetail from '@/views/AIRecommendDetail.vue'
import UserpageView from '@/views/UserpageView.vue'
import JobView from '@/views/JobView.vue'



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      
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
      component: MovieSearchView,
    },
    {
      path: '/:category/:name', name: 'movie_search_result', component: MovieSearchResult
    },
    {
      path: '/movie_detail/:id',
      name: 'movie_detail',
      component: MovieDetail
    },
    {
      path: '/cinema_info/:address',
      name: 'cinema_info',
      component: CinemaInfoView,      
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
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
      beforeEnter: (to, from, next) => {
        console.log('Enter')
        document.querySelector('#menu').style.display='none';
        next();
      },
    },
    {
      path: '/create',
      name: 'CommunityCreateView',
      component: CommunityCreateView
    },
    {
      path: '/community/:id',
      name: 'CommunityDetailView',
      component: CommunityDetailView
    },
    {
      path: '/community/update/:id',
      name: 'CommunityUpdate',
      component: CommunityUpdate
    },
    {
      path: '/notice',
      name: 'notice',
      component: NoticeView
    },
    {
      path: '/ai_recommend',
      name: 'ai_recommend', 
      component: AIRecommendDetail
    },
    {
      path: '/:username/userpage',
      name: 'userpage',
      component: UserpageView
    },
    {
      path: '/job',
      name: 'job',
      component: JobView
    }
  ]
})

router.beforeEach((to, from) => {
  const store = useCounterStore()
  if(to.name === 'CommunityCreateView' && !store.token) {
    window.alert('로그인이 필요합니다.')
    return from.fullPath
  }
})

const menuHideEmit = function () {
  emit('menuHide')
}


export default router
