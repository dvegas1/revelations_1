export default [
  {
    path: '/admin/users',
    name: 'admin-users',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */
        '@/components/admin/AdminUsers.vue'
      )
  },
  {
    path: '/admin/peoples',
    name: 'admin-peoples',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */
        '@/components/admin/AdminPeoples.vue'
      )
  },{
    path: '/admin/winner',
    name: 'admin-winner',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */
        '@/components/admin/Adminwinner.vue'
      )
  },
  {
    path: '/admin/country',
    name: 'admin-country',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-cities"  */
        '@/components/admin/AdminCountry.vue'
      )
  },
  {
    path: '/admin/state',
    name: 'admin-state',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-states"  */
        '@/components/admin/AdminState.vue'
      )
  },
  {
    path: '/admin/cities',
    name: 'admin-cities',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-cities" */
        '@/components/admin/AdminCities.vue'
      )
  },
  {
    path: '/admin/nation',
    name: 'admin-nation',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-nation" */
        '@/components/admin/AdminNation.vue'
      )
  },
  {
    path: '/admin/text',
    name: 'admin-text',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-text" */
        '@/components/admin/Admintext.vue'
      )
  },
  {
    path: '/admin/components',
    name: 'admin-components',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-components"  */
        '@/components/admin/AdminComponents.vue'
      )
  }
]
