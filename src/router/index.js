import Vue from 'vue'
import Router from 'vue-router'
import questions from '@/components/questions'
import home from '@/components/home'
import profile from '@/components/profile'
import register from '@/components/register'
import login from '@/components/login'
import webcam from '@/components/webcam'
import admin from '@/components/admin'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
      {
      path: '/questions',
      name: 'questions',
      component: questions
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path:'/profile/:validate',
      name:'profile',
      component:profile
    },
    {
      path:'/register',
      name:'register',
      component:register
    },
    {
      path: '/login/:profile',
      name: 'login',
      component: login
    },
    {
      path: '/webcam',
      name: 'webcam',
      component: webcam
    },
    {
      path:'/admin',
      name:'admin',
      component:admin
    }  
  ]
})
