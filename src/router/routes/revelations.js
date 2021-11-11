export default [
  {
    path: '/revelacion',
    name: 'revelacion',
    component: () =>
      import(/* webpackChunkName: "revelacion" */ '@/components/Revelations.vue')
  }
]
