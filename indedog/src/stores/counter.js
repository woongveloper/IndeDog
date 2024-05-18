import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'

export const useCounterStore = defineStore('counter', () => {
  const movies = ref([])
  const cinemas = ref([])
  const API_URL = 'http://127.0.0.1:8000'
  const articles = ref()
  const token = ref(null)
  const loginUser = ref('')
  // const token = ref(null)
  // const isLogin = computed(() => {
  //   if (token.value === null) {
  //     return false
  //   } else{
  //     return true
  //   }
  // })
  // const router = useRouter()

  axios({
      method: 'get',
      url: `${API_URL}/api/v1/movies/`
    })
      .then(res => {
        movies.value = res.data
        for (const idx in movies.value) {
          if (movies.value[idx].id >= 10000) {
            movies.value[idx].cinemas = movies.value[idx].cinemas.split(',')
            console.log(movies.value[idx].cinemas)
          }
        }
      })
      .catch(err => console.log(err))

  const getArticles = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/articles/`,
      headers: {
        Authorization : `Token ${token.value}`
      }
    })
      .then(response => {
        // console.log(response)
        // console.log(response.data)
        articles.value = response.data
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  const signUp = function (payload) {
    console.log(payload)
    const { username, password1, password2 } = payload
    axios({
      method: 'post',
      url: `${API_URL}/accounts/signup/`,
      data: {
        username, password1, password2
      }
    })
      .then((res) => {
        console.log('회원가입 성공')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const logIn = function(payload) {
    const { username, password } = payload
    loginUser.value = username
    axios({
      method: 'post',
      url: `${API_URL}/accounts/login/`,
      data:{
        username, password
      }
    })
      .then((res) => {
        console.log('로그인 성공')
        token.value = res.data.key
      })
      .catch((err) => {
        console.log(err)
      })
  }
        
  const getCoord = function () {
    axios({
      method: 'get',
      url: `${API_URL}/api/v1/cinemas/`,
    })
    .then(res => {
      cinemas.value = res.data;
      console.log('#store - cinema')
      console.log(cinemas.value)
    })
    .catch(err => console.log(err))
  }
  
  return { movies, getArticles, API_URL, articles, signUp, logIn, token, loginUser, getCoord, cinemas }
}, { persist: true })
