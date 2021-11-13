export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      requiresAuth: false
    },
    component: () =>
    import(/* webpackChunkName: "revelacion" */ '@/components/Revelations.vue')
  }
]
