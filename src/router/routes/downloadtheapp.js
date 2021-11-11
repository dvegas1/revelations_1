export default [
  {
    path: '/DownloadTheApp',
    name: 'DownloadTheApp',
    meta: {
      requiresAuth: false
    },
    component: () =>
      import(
        /* webpackChunkName: "home" */ '@/components/header/DownloadTheApp.vue'
      )
  }
]
