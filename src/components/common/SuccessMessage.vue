<template>
  <div class="text-center" v-show="showSuccessMessage">
    <v-dialog
      v-model="showSuccessMessage"
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
        <v-card-title dark class="text-h5 grey">
          <h5 text-light title_notify>Notificación:</h5>
        </v-card-title>

        <v-card-text class="txt_notify" 
        center
          :timeout="successMessageTimeout">
        {{ successMessage }}
        </v-card-text>
        </v-snackbar>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn light flat @click="showSuccessMessage = false">
            {{ $t('common.CLOSE') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<!--<template>
  <v-container v-show="showSuccessMessage">
    <v-layout>
    
      <v-flex>
      
        <v-snackbar
          v-model="showSuccessMessage"
          color="success"
          multi-line
          center
          :timeout="successMessageTimeout"
        >
          {{ successMessage }}
          <v-btn dark flat @click="showSuccessMessage = false">
            {{ $t('common.CLOSE') }}
          </v-btn>
        </v-snackbar>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>-->


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

export default {
  data(){
    return {
      dialog:true
    }
  },
  name: 'SuccessMessage',
  computed: {
    showSuccessMessage: {
      get() {
        return this.$store.state.success.showSuccessMessage
      },
      set(value) {
        this.$store.commit(types.SHOW_SUCCESS, value)
      }
    },
    successMessage() {
      if (this.$store.state.success.successMessageParams) {
        return this.$i18n.t(this.$store.state.success.successMessage, [
          ...this.$store.state.success.successMessageParams
        ])
      }
      return this.$i18n.t(this.$store.state.success.successMessage)
    },
    successMessageTimeout() {
      return this.$store.state.success.successMessageTimeout
    }
  },
  watch: {
    successMessage() {
      setTimeout(() => {
        this.showSuccessMessage = this.successMessage !== ''
      }, 100)
    }
  }
}
</script>

<style>
.title_notify {
    text-shadow: 1px 1px 1px #f3f3f38c;
}
.txt_notify {
    font-size: 13pt;
    font-weight: 500;
}

</style>