<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading
        :title="
          refText.CATEGORIES !== undefined
            ? refText.CATEGORIES.title.contents
            : 'Sin label'
        "
      />
      <Description
        :description="
          refText.CATEGORIES !== undefined
            ? refText.CATEGORIES.description.contents
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
  name: 'Categories',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('Categories.DESCRIPTION')} - %s`
    }
  },
  data() {
    return {
      refText: '',
      idcomponent: 'CATEGORIES'
    }
  },

  computed: {
    getJson() {
      return this.$store.state.messages.message
    }
  },

  methods: {
    ...mapActions(['getText_component', 'name_component'])
  },

  async mounted() {
    await this.name_component(this.idcomponent)
    this.getNameComponent()
  }
}
</script>
