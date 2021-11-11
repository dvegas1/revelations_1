<style lang="css" src="./../../app/css/favorites.css"></style>

<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('favorites.TITLE')" />
    </v-layout>

    <v-card flat tile class="toolbarfav">
      <v-toolbar>
        <v-toolbar-title>
          <Description :description="$t('favorites.DESCRIPTION')" />
        </v-toolbar-title>
      </v-toolbar>
    </v-card>
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

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('Favorites')} - %s`
    }
  },
  data() {
    return {
      search: '',
      fieldsToSearch: ['']
    }
  },

  computed: {},

  methods: {
    /* },
    buildSearch() {
      return this.search
        ? { query: this.search, fields: this.fieldsToSearch.join(',') }
        : {}*/
  }
}
</script>
