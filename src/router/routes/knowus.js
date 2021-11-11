export default [
  {
    path: '/KnowUs',
    name: 'KnowUs',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/header/Knowus.vue')
  }
]
