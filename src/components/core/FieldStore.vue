<style lang="css" src="./../app/css/SignUp.css"></style>
<template>
  <v-container fluid>
    <v-layout row wrap>
      <Heading :title="$t('signup.TITLE')" />
      <v-flex xs12 sm6 offset-sm3>
        <form @submit.prevent="submit">
          <v-layout wrap>
            <Switch-1 />
            <v-flex xs12 text-xs-center mt-2 mb-3>
              <v-text-field
                id="storename"
                name="storename"
                :label="$t('signup.STORENAME')"
                v-model="storename"
                :data-vv-as="$t('signup.STORENAME')"
                :error="errors.has('storename')"
                :error-messages="errors.collect('storename')"
                v-validate.disable="'required'"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                id="rif"
                name="rif"
                :label="$t('signup.RIF')"
                v-model="rif"
                :data-vv-as="$t('signup.RIF')"
                :error="errors.has('rif')"
                :error-messages="errors.collect('rif')"
                autocomplete="off"
              ></v-text-field>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
      <ErrorMessage />
    </v-layout>
  </v-container>
</template>
