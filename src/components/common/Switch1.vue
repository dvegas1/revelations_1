<template>
  <v-container class="px-0" fluid>
    <v-switch
      name="isstore"
      color="orange"
      :value="switch1"
      v-model="switch1"
      :label="$t(labelJson)"
      hint="Cambiar a modo Tienda/Usuario"
      @change="getswitch"
    ></v-switch>
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
  data() {
    return {
      labelJson: '',
      txtlblswit: '' // ,
      // switch1: false
    }
  },
  async mounted() {
    await this.getswitch()
  },
  computed: {
    switch1: {
      get() {
        return this.$store.state.switch1.switch1.switch1boll
      },
      set(value) {
        this.setSwitch(value)
      }
    },
    urlSwich: {
      get() {
        return this.$store.state.switch1.switch1.switch1boll
      },
      set(value) {
        this.setSwitch(value)
      }
    }
  },
  methods: {
    ...mapActions(['setSwitch']),
    async getswitch() {
      if (this.switch1 !== true) {
        this.switch1 = false
      }

      this.setSwitch(this.switch1)
      this.lbl()
    },
    lbl() {
      if (this.urlSwich) {
        this.labelJson = 'switch1.ISSTORE'
        return this.labelJson
      }
      this.labelJson = 'switch1.ISUSER'
      return this.labelJson
    }
  }
}
</script>

<style>
.default_swit {
  color: #020e21 !important;
}
</style>
