<template>
  <v-container fluid>
  <p>HOLASSS</p>
  </v-container>
</template>

<script>
/* eslint-disable no-invalid-this */
/* eslint-disable quotes */
/* eslint-disable complexity */
/* eslint-disable max-statements */
/* eslint no-undef: "error"*/
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable eqeqeq */ /* eslint-disable no-use-before-define */ /* eslint-disable no-empty */ /* eslint-disable no-irregular-whitespace */
/* eslint-disable no-constant-condition */ /* eslint-disable func-style */

import { mapActions } from 'vuex'
import plumessag from '@/plugins/plumessag'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('home.TITLE')} - %s`
    }
  },
  data() {
    return {
     // name: this.$store.state.auth.user.name,
      showVerifyDialog: !this.$store.state.verify.emailVerified,
      refText: '',
      idcomponent: 'LANDING'
    }
  },

  computed: {
    getJson() {
      return this.$store.state.messages.message
    },
    getNameComponent() {
      return this.$store.state.messages.name_components
    }
  },

  methods: {
    ...mapActions(['getText_component', 'name_component'])
  },
  async mounted() {
   await this.name_component(this.idcomponent)
  }
}
</script>
