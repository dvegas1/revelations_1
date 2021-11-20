<template>
  <div class="text-center" v-show="showSuccessMessageFirstUser">
    <v-dialog
      v-model="showSuccessMessageFirstUser"
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
        <v-card-title  class="text-h5  darken">
          <h5  text-light darken text-white>Notificación:<br/></h5>
          <h5 class="subtitle_notify" text-light text-white> Usuario creado con éxito.</h5>

          
        </v-card-title>
        <v-card>
        <v-card-title class="text-h5 light">
          Clave de acceso:
        </v-card-title>

        <v-card-text>
        <div class="key_cont" v-if="this.user !== null">
      <v-text-field  :disabled="disableKey"  v-model="SuccessMessageFirstUser.key" ></v-text-field>
      <i @click="copyText" class="far fa-copy copyKey"></i>
      </div>
<p class="note">NOTA:<p><p class="text_note"> La clave de acceso es necesaria para ingresar en un futuro a la plataforma, debe guardarla ya que la misma no puede ser recuperada.</p>

        <!--<div v-if="this.user !== null">
          <div v-html="'<div class="container_key"> <div class="v-input text_key v-text-field v-input--is-label-active v-input--is-dirty theme--light"><div class="v-input__control"><div class="v-input__slot"><div class="v-text-field__slot"><input disabled id="myInput"  autocomplete="off" type="text"></div></div><p id="st_text_copy"></p></div></div><button type="button" onclick="copyKey()" class="btn_light_copy v-btn--flat v-btn theme--light"><div class="v-btn__content"><i onclick="copyKey()" class="far fa-copy"></i></div></button></div>'">
            </div>
     </div>
-->
         
     </v-card-text>
        
      </v-card>
        </v-snackbar>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn  flat class="primary" @click="showSuccessMessageFirstUser = false">
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
import { mapActions } from 'vuex'

export default {
  data(){
    return {
      dialog:true,
      key:'',
      disableKey:true
    }
  },
  name: 'SuccessMessageFirstUser',
  methods: {
    ...mapActions([
      'user','sendNotify'
    ]),keyPress () {
      this.key
    },
     copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    // cant copy when adding below this code
    // dummy.style.display = 'none'
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
},
     copyText () {
       this.copyToClipboard(this.SuccessMessageFirstUser.key)

         this.sendNotify({
              duration: 6000,
              progress: 'auto',
              title: 'Clave de acceso.',
              text: 'Clave copiada con exito.',
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })
       /*
          let textToCopy = this.SuccessMessageFirstUser.key
          textToCopy.select()
          document.execCommand("copy");
        */
        }
  },
  computed: {
    showSuccessMessageFirstUser: {
      get() {
        return this.$store.state.success.showSuccessMessageFirstUser
      },
      set(value) {
        this.$store.commit(types.SHOW_SUCCESS_FIRSUSER, value)
      }
    },
    SuccessMessageFirstUser() {
      if (this.$store.state.success.successMessageParams) {
        return this.$i18n.t(this.$store.state.success.SuccessMessageFirstUser, [
          ...this.$store.state.success.successMessageParams
        ])
      }
      this.key = this.$store.state.success.SuccessMessageFirstUser.key
      return this.$i18n.t(this.$store.state.success.SuccessMessageFirstUser)
    },
    successMessageTimeout() {
      return this.$store.state.success.successMessageTimeout
    }
  },
  watch: {
    SuccessMessageFirstUser() {
      setTimeout(() => {
        this.showSuccessMessageFirstUser = this.SuccessMessageFirstUser !== ''
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

.showErrorMessage_title {
   background-color: rgb(151 79 76);
    color: #f5f8ff;
    font-weight: 100;
}

.text-success__ {
    color: #28a745!important;
}

h6.subtitle_notify {
    color: #fff700;
}

.title_notify_first{
}

h5.subtitle_notify {
    padding-left: 8px;
    font-weight: 100;
    color: #fbfbfb;
}

</style>