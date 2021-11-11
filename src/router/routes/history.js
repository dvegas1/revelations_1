export default [
  {
    path: '/history/mypurchases',
    name: 'history-mypurchases',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-cities"  */
        '@/components/header/MyPurchases.vue'
      )
  },

  {
    path: '/history/mysales',
    name: 'history-mysales',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "history-mypurchases" */
        '@/components/header/MySales.vue'
      )
  }
]
