<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading
        :title="
          refText.DOWNLOADTHEAPP !== undefined
            ? refText.DOWNLOADTHEAPP.title.contents
            : 'Sin label'
        "
      />
      <Description
        :description="
          refText.DOWNLOADTHEAPP !== undefined
            ? refText.DOWNLOADTHEAPP.title.contents
            : 'Sin label'
        "
      />
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
import plumessag from '@/plugins/plumessag'

export default {
  name: 'DownloadTheApp',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('Download the App')} - %s`
    }
  },
  data() {
    return {
      refText: '',
      idcomponent: 'DOWNLOADTHEAPP'
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
