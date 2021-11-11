<template>
  <div class="flex xs12 text-xs-center mt-2 mb-3" v-if="switchstore">
    <v-alert
      :value="true"
      color="warning"
      icon="priority_high"
      outline
      class="warning_byO"
    >
      <span style="margin-left:5px">{{ $t('signup.ALERTMENSSAGE') }}</span>
    </v-alert>
  </div>
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

import Switch1 from '@/components/common/Switch1.vue'
export default {
  components: {
    Switch1
  },
  computed: {
    switchstore() {
      return this.$store.state.switch1.switch1.switch1boll
    }
  }
}
</script>

<style>
.warning_byO {
  transition: opacity 0.5s;
}
</style>
