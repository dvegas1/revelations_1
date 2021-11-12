<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=6LfgPdkaAAAAAFUAATmGKU6OOpOlPUo-b16-gb0o"></script>
<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading
        :title="
          refText.LOGIN !== undefined
            ? refText.LOGIN.title.contents
            : 'Sin label'
        "
      />
      <Description />
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit()">
          <v-layout column>
            <v-flex>
              <v-text-field
                id="email"
                name="email"
                type="email"
                v-model="login.email"
                :label="
                  refText.LOGIN !== undefined
                    ? refText.LOGIN.email.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.login.email, 'email')"
                @keyup="osplug($v.login.email, 'email')"
                @input="$v.login.email.$touch()"
                @blur="$v.login.email.$touch()"
                prepend-icon="mdi-email-outline"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                id="password"
                name="password"
                v-model="login.password"
                :label="
                  refText.LOGIN !== undefined
                    ? refText.LOGIN.password.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.login.password, 'password')"
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @input="$v.login.password.$touch()"
                @blur="$v.login.password.$touch()"
                @keyup="osplug($v.login.password, 'password')"
                @click:append="show1 = !show1"
                prepend-icon="mdi-lock-outline"
                ref="password"
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
                class="g-recaptcha"
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
                class="button"
                :text="
                  refText.LOGIN !== undefined
                    ? refText.LOGIN.login.contents
                    : 'Sin label'
                "
              />
            </v-flex>
            <v-flex text-xs-center>
              <v-btn
                :to="{ name: 'forgotPassword' }"
                color="white"
                small
                flat
                class="btnForgotPassword"
                >{{
                  refText.LOGIN !== undefined
                    ? refText.LOGIN.forgot_password.contents
                    : 'Sin label'
                }}</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
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
        password: '',
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
    getJson() {
      return this.$store.state.messages.message
    },
    getNameComponent() {
      return this.$store.state.messages.name_components
    }
  },

  methods: {
    ...mapActions(['userLogin', 'getText_component', 'name_component']),

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
          email: this.login.email,
          password: this.login.password,
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
  }
}
</script>
