export default [
  {
    path: '/Favorites',
    name: 'Favorites',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/header/Favorites.vue')
  }
]
