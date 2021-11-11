<template>
  <v-btn
    :color="colorString"
    type="submit"
    :disabled="disabledButton"
    :class="customClass"
    :flat="flat"
    >{{ text }}</v-btn
  >
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
  name: 'SubmitButton',
  props: {
    color: String,
    text: String,
    customClass: String,
    flat: Boolean
  },
  computed: {
    disabledButton() {
      return this.$store.state.loading.showLoading
    },
    colorString() {
      return this.color ? this.color : 'secondary'
    }
  }
}
</script>
