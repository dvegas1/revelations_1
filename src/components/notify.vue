<template>
  <v-layout row wrap>
    <v-container class="transparent container_notify">
      <v-snackbar
        top=""
        v-model="snackbar.visible"
        :timeout="snackbar.timeout"
        :multi-line="snackbar.multiline === true"
        :color="snackbar.color"
      >
        {{ snackbar.text }}
      </v-snackbar>
    </v-container>
  </v-layout>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  computed: {
    snackbar() {
      return this.$store.state.notify.snackbar
    }
  },
  methods: {
    ...mapMutations(['closeAlert'])
  },
  async mounted() {}
}
</script>
