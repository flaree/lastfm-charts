import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import Home from './pages/Home.vue'
import NotFound from './pages/NotFound.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/:pathMatch(.*)*', component: NotFound },
  ]
  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })
  
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
