import { createRouter, createWebHistory } from 'vue-router'
import AltaCiudades from '@/modules/ciudades/views/AltaCiudades.vue'
import AltaAtletas from '@/modules/atletas/views/AltaAtletas.vue'

const routes = [
  {
    path: '/',
    redirect: '/ciudades' 
  },
  { 
    path: '/ciudades',
    name: 'ciudades',
    component: AltaCiudades
  },
  {
    path: '/atletas',
    name: 'atletas',
    component: AltaAtletas
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
