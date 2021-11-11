<template>
  <v-container>
    <v-layout column px-3 pb-3>
      <Heading :title="$t('verify.TITLE')" />
      <ErrorMessage />
      <SuccessMessage />
    </v-layout>
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

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('verify.TITLE')} - %s`
    }
  },
  methods: {
    ...mapActions(['sendVerify'])
  },
  async mounted() {
    await this.sendVerify(this.$route.params.id)
  }
}
</script>
