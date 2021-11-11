<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 text-xs-center mt-5 mb-3>
        <Heading
          :title="
            refText.RESETPASSWORD !== undefined
              ? refText.RESETPASSWORD.title.contents
              : 'Sin label'
          "
        />
      </v-flex>
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit">
          <v-layout column>
            <v-flex v-show="showChangePasswordInputs">
              <v-text-field
                id="password"
                name="password"
                type="password"
                :label="
                  refText.RESETPASSWORD !== undefined
                    ? refText.RESETPASSWORD.password.contents
                    : 'Sin label'
                "
                v-model="password"
                :data-vv-as="$t('resetPassword.PASSWORD')"
                :error="errors.has('password')"
                :error-messages="errors.collect('password')"
                v-validate.disable="'required|min:5'"
                ref="password"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex v-show="showChangePasswordInputs">
              <v-text-field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                :label="
                  refText.RESETPASSWORD !== undefined
                    ? refText.RESETPASSWORD.confirm_password.contents
                    : 'Sin label'
                "
                v-model="confirmPassword"
                :data-vv-as="$t('resetPassword.PASSWORD')"
                :error="errors.has('confirmPassword')"
                :error-messages="errors.collect('confirmPassword')"
                v-validate.disable="'required|min:5|confirmed:password'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex v-show="showChangePasswordInputs" text-xs-center mt-5>
              <SubmitButton
                :text="
                  refText.RESETPASSWORD !== undefined
                    ? refText.RESETPASSWORD.change_password.contents
                    : 'Sin label'
                "
              />
            </v-flex>
          </v-layout>
        </form>
      </v-flex>

      <SuccessMessage />
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

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('resetPassword.TITLE')} - %s`
    }
  },

  data() {
    return {
      id: this.$route.params.id,
      password: '',
      confirmPassword: '',
      refText: '',
      idcomponent: 'RESETPASSWORD'
    }
  },

  methods: {
    ...mapActions(['resetPassword', 'getText_component', 'name_component']),
    async submit() {
      const valid = await this.$validator.validateAll()
      if (valid) {
        await this.resetPassword({
          id: this.id,
          password: this.password
        })
      }
    }
  },

  computed: {
    showChangePasswordInputs() {
      return this.$store.state.resetPassword.showChangePasswordInputs
    },
    getJson() {
      return this.$store.state.messages.message
    },
    getNameComponent() {
      return this.$store.state.messages.name_components
    }
  },

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
