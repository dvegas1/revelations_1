export default [
  {
    path: '/Categories',
    name: 'Categories',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "home" */ '@/components/header/Categories.vue'
      )
  }
]
