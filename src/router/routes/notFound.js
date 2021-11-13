export default [
  {
    path: '*',
    component: () =>
    import(/* webpackChunkName: "revelacion" */ '@/components/Revelations.vue')

  }
]
