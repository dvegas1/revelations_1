export default [
  {
    path: '/revelations',
    name: 'revelations',
    component: () =>
      import(/* webpackChunkName: "revelations" */ '@/components/Revelations.vue')
  }
]
