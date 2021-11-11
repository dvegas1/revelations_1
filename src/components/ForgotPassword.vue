<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading
        :title="
          refText.FORGOTPASSWORD !== undefined
            ? refText.FORGOTPASSWORD.title.contents
            : 'Sin label'
        "
      />
      <Description
        :description="
          refText.FORGOTPASSWORD !== undefined
            ? refText.FORGOTPASSWORD.description.contents
            : 'Sin label'
        "
      />
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit">
          <v-layout column>
            <v-flex>
              <v-text-field
                id="email"
                name="email"
                type="email"
                :label="
                  refText.FORGOTPASSWORD !== undefined
                    ? refText.FORGOTPASSWORD.email.contents
                    : 'Sin label'
                "
                v-model="email"
                :data-vv-as="
                  refText.FORGOTPASSWORD !== undefined
                    ? refText.FORGOTPASSWORD.email.contents
                    : 'Sin label'
                "
                :error="errors.has('email')"
                :error-messages="errors.collect('email')"
                v-validate.disable="'required|email'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex text-xs-center mt-5>
              <v-btn color="secondary" @click="goBack()">
                <v-icon class="mr-2">mdi-arrow-left</v-icon>
                {{ $t('common.GO_BACK') }}
              </v-btn>
              <SubmitButton
                :text="
                  refText.FORGOTPASSWORD !== undefined
                    ? refText.FORGOTPASSWORD.recover.contents
                    : 'Sin label'
                "
              />
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
      <ErrorMessage />
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
      titleTemplate: `${this.$t('forgotPassword.TITLE')} - %s`
    }
  },
  data() {
    return {
      email: '',
      refText: '',
      idcomponent: 'FORGOTPASSWORD'
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
    ...mapActions(['forgotPassword', 'getText_component', 'name_component']),
    async submit() {
      const valid = await this.$validator.validateAll()
      if (valid) {
        await this.forgotPassword({
          email: this.email
        })
      }
    },
    goBack() {
      router.go(-1)
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
