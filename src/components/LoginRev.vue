<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=6LfgPdkaAAAAAFUAATmGKU6OOpOlPUo-b16-gb0o"></script>
<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading
        :title="
          refText.LOGIN !== undefined
            ? refText.LOGIN.title.contents
            : 'Ingrese su clave de acceso.'
        "
      />
      <Description />
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit()">
          <v-layout column>
            <v-flex>
              <v-text-field
                id="credentialuser"
                name="credentialuser"
                v-model="login.credentialuser"
                :label="
                  refText.LOGIN !== undefined
                    ? refText.LOGIN.credentialuser.contents
                    : 'Clave de acceso.'
                "
                :messages="['']"
                @input="$v.login.credentialuser.$touch()"
                @blur="$v.login.credentialuser.$touch()"
                :error-messages="
                  campoErrors(
                    this.$v.login.credentialuser,
                    osplug($v.login.credentialuser, 'Clave de acceso')
                  )
                "
                @click:append="show1 = !show1"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                prepend-icon="mdi-lock-outline"
                ref="credentialuser"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 text-xs-center mt-2 mb-3>
              <vue-recaptcha
                id="recaptcha"
                name="recaptcha"
                v-model="login.recaptcha"
                @verify="onVerify"
                @expired="onCaptchaExpired"
                :sitekey="this.key"
                :loadRecaptchaScript="true"
                theme="dark"
                class="g-recaptcha hidden"
                ref="recaptcha"
              >
              </vue-recaptcha>
            </v-flex>

            <v-dialog v-model="dialog" max-width="500">
              <v-card>
                <v-card-title class="headline">
                  <Definition :title="$t('recaptcha.HEADER')" />
                </v-card-title>

                <v-card-text>
                  <DialogText :title="$t('recaptcha.DESCRIPTION')" />
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-text="$t('recaptcha.ACCEPT')"
                    class="button"
                    text
                    @click="dialog = false"
                  >
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-flex text-xs-center mt-5>
              <SubmitButton
                class="primary"
                :text="
                  refText.LOGIN !== undefined
                    ? refText.LOGIN.login.contents
                    : 'INGRESAR'
                "
              />
            </v-flex>
          </v-layout>
        </form>
        <ErrorMessage />
        <SuccessMessage />
      </v-flex>
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

import router from '@/router'
import { mapActions } from 'vuex'
import plumessag from '@/plugins/plumessag'
import vaalid from '@/plugins/vaalidate'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'Login',
  components: {
    VueRecaptcha
  },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('login.TITLE')} - %s`
    }
  },
  data() {
    return {
      login: {
        email: '',
        credentialuser: '',
        recaptcha: null
      },
      refText: '',
      idcomponent: 'LOGIN',
      key: '6LfgPdkaAAAAAFUAATmGKU6OOpOlPUo-b16-gb0o',
      dialog: false,
      show1: false
    }
  },

  computed: {
    notify() {
      return this.$store.state.peoples.notify
    },
    getJson() {
      return this.$store.state.messages.message
    }
  },
  watch: {
    notify() {
      this.openNotification(this.$store.state.peoples.notify)
      return this.$store.state.peoples.notify
    }
  },

  methods: {
    ...mapActions([
      'userLogin',
      'getText_component',
      'name_component',
      'sendNotify'
    ]),
    openNotification() {
      this.$vs.notification(this.notify)
    },
    onVerify(response) {
      this.login.recaptcha = response
    },
    onCaptchaExpired: function() {
      this.$refs.recaptcha.reset()
    },

    async submit() {
      // const valid = await this.$validator.validateAll()
      await this.$v.$reset()
      await this.$v.$touch()
      await this.subvali(this.$v.login)

      if (this.$v.login.$invalid) {
        return false
      }
      /*if (this.login.recaptcha == null) {
        this.dialog = true
        return false
      }*/

      if (!this.$v.login.$invalid) {
        await this.userLogin({
          credentialuser: this.login.credentialuser,
          recaptcha: this.login.recaptcha
        })
      }
    }
  },
  validations: vaalid.validations,

  created() {
    if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }
  },

  async mounted() {
    
    await this.name_component(this.idcomponent)
    this.getNameComponent()
  }
}
</script>
