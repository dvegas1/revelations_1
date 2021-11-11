export default [
  {
    path: '/store',
    name: 'store',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/components/store/Store.vue')
  }
]
