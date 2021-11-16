<template>
  <div class="text-center" v-show="showErrorMessage">
    <v-dialog
      v-model="showErrorMessage"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>

      <v-card>
        <v-card-title dark class="text-h5  showErrorMessage_title">
          <h5 text-light darken text-white>Alerta:</h5>
        </v-card-title>

        <v-card-text class="txt_notify text-error__" 
        center container
          timeout="0">
       <div v-html="error"></div>
        </v-card-text>
        </v-snackbar>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  dark flat @click="showErrorMessage = false">
            {{ $t('common.CLOSE') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

import * as types from '@/store/mutation-types'
import { formatErrorMessages } from '@/utils/utils.js'

export default {
  name: 'ErrorMessage',
  computed: {
    showErrorMessage: {
      get() {
        return this.$store.state.error.showErrorMessage
      },
      set(value) {
        this.$store.commit(types.SHOW_ERROR, value)
      }
    },
    error() {
      return this.$store.state.error.errorMessage
    }
  },
  watch: {
    error() {
      setTimeout(() => {
        this.showErrorMessage = this.error !== null
      }, 100)
    }
  }
}
</script>
<style>
.txt_notify {
    font-size: 13pt;
    font-weight: 500;
}
.showSuccessMessage_title {
    background-color: rgb(76 98 151);
    color: #f5f8ff;
    font-weight: 100;
}

.text-success__ {
    color: #28a745!important;
}

.text-error__ {
    color: #582009;
}

</style>
