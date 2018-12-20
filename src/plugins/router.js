import Vue from 'vue'
import Router from 'vue-router'

import ChatRoom from '@/components/chat/chat-room'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'home',
      path: '/'
    },
    {
      name: 'chatroom',
      path: '/chatroom/:username',
      component: ChatRoom
    }
  ]
})
