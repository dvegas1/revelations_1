<style lang="css" src="./../../app/css/perfile.css"></style>

<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 offset-sm1>
      <v-card>
        <v-tabs v-model="tab" centered icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            <template>
              <v-flex xs12 sm20 text-xs-center>
                <v-icon class="iconTab" color="white">mdi-account-box </v-icon>
                <NameTab
                  :title="
                    refText.PROFILE !== undefined
                      ? refText.PROFILE.data.contents
                      : 'Sin label'
                  "
                />
              </v-flex>
            </template>
          </v-tab>

          <v-tab href="#tab-2">
            <template>
              <v-flex xs12 sm20 text-xs-center>
                <v-icon class="iconTab" color="white">mdi-lock </v-icon>
                <NameTab
                  :title="
                    refText.PROFILE !== undefined
                      ? refText.PROFILE.segurity.contents
                      : 'Sin label'
                  "
                />
              </v-flex>
            </template>
          </v-tab>

          <v-tab href="#tab-3">
            <template>
              <v-flex xs12 sm20 text-xs-center>
                <v-icon class="iconTab" color="white">mdi-wallet </v-icon>
                <NameTab
                  :title="
                    refText.PROFILE !== undefined
                      ? refText.PROFILE.wallet.contents
                      : 'Sin label'
                  "
                />
              </v-flex>
            </template>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item key="1" :value="'tab-1'">
            <v-card flat>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12 sm10 offset-sm1>
                      <form @submit.prevent="submit()">
                        <v-layout wrap class="switchclass">
                          <v-flex xs12 text-xs-center mt-2 mb-3>
                            <ImagePerfil :imgP="this.urlDefault" />
                          </v-flex>
                          <v-flex xs12 md6>
                            <v-text-field
                              id="username"
                              name="username"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.username.contents
                                  : 'Sin label'
                              "
                              v-model="username"
                              @keyup="
                                osplug($v.profile.username, 'username'),
                                  validate_username()
                              "
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.username, 'username')
                              "
                              :append-icon="icon_validate_username"
                              :loading="loading_validate_user"
                              :class="color_validate_username"
                              @input="$v.profile.username.$touch()"
                              @blur="$v.profile.username.$touch()"
                              prepend-icon="mdi-account-circle"
                              autocomplete="off"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              id="email"
                              name="email"
                              type="email"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.email.contents
                                  : 'Sin label'
                              "
                              v-model="email"
                              @keyup="osplug($v.profile.email, 'email')"
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.email, 'email')
                              "
                              @input="$v.profile.email.$touch()"
                              @blur="$v.profile.email.$touch()"
                              prepend-icon="mdi-email-outline"
                              autocomplete="off"
                              disabled
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              id="firstname"
                              name="firstname"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.firstname.contents
                                  : 'Sin label'
                              "
                              v-model="firstname"
                              @keyup="osplug($v.profile.firstname, 'firstname')"
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.firstname, 'firstname')
                              "
                              @input="$v.profile.firstname.$touch()"
                              @blur="$v.profile.firstname.$touch()"
                              clearable
                              autocomplete="off"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              id="secondname"
                              name="secondname"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.secondname.contents
                                  : 'Sin label'
                              "
                              v-model="secondname"
                              @keyup="
                                osplug($v.profile.secondname, 'secondname')
                              "
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.secondname, 'secondname')
                              "
                              @input="$v.profile.secondname.$touch()"
                              @blur="$v.profile.secondname.$touch()"
                              clearable
                              autocomplete="off"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              id="firstsurname"
                              name="firstsurname"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.firstsurname.contents
                                  : 'Sin label'
                              "
                              v-model="firstsurname"
                              @keyup="
                                osplug($v.profile.firstsurname, 'firstsurname')
                              "
                              :messages="['']"
                              :error-messages="
                                campoErrors(
                                  $v.profile.firstsurname,
                                  'firstsurname'
                                )
                              "
                              @input="$v.profile.firstsurname.$touch()"
                              @blur="$v.profile.firstsurname.$touch()"
                              clearable
                              autocomplete="off"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md6>
                            <v-text-field
                              id="secondsurname"
                              name="secondsurname"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.secondsurname.contents
                                  : 'Sin label'
                              "
                              v-model="secondsurname"
                              @keyup="
                                osplug(
                                  $v.profile.secondsurname,
                                  'secondsurname'
                                )
                              "
                              :messages="['']"
                              :error-messages="
                                campoErrors(
                                  $v.profile.secondsurname,
                                  'secondsurname'
                                )
                              "
                              @input="$v.profile.secondsurname.$touch()"
                              @blur="$v.profile.secondsurname.$touch()"
                              clearable
                              autocomplete="off"
                            ></v-text-field>
                          </v-flex>

                          <v-flex xs12 md4>
                            <template>
                              <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                              >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                    id="date"
                                    name="date"
                                    v-model="date"
                                    :label="
                                      refText.PROFILE !== undefined
                                        ? refText.PROFILE.birthdaydate.contents
                                        : 'Sin label'
                                    "
                                    :messages="['']"
                                    :error-messages="
                                      campoErrors($v.profile.date, 'date')
                                    "
                                    @keyup="osplug($v.profile.date, 'date')"
                                    @input="$v.profile.date.$touch()"
                                    @blur="$v.profile.date.$touch()"
                                    @click="prueba(), calcularEdad('date')"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    clearable
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>

                                <v-date-picker
                                  ref="picker"
                                  v-model="date"
                                  :max="new Date().toISOString().substr(0, 10)"
                                  min="1950-01-01"
                                  :locale="localet"
                                  @change="save"
                                ></v-date-picker>
                              </v-menu>
                            </template>
                          </v-flex>

                          <v-flex xs12 md4>
                            <v-text-field
                              id="nroidentificacion"
                              name="nroidentificacion"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.nroidentificacion.contents
                                  : 'Sin label'
                              "
                              v-model="nroidentificacion"
                              @keyup="
                                osplug(
                                  $v.profile.nroidentificacion,
                                  'nroidentificacion'
                                )
                              "
                              :messages="['']"
                              :error-messages="
                                campoErrors(
                                  $v.profile.nroidentificacion,
                                  'nroidentificacion'
                                )
                              "
                              @input="$v.profile.nroidentificacion.$touch()"
                              @blur="$v.profile.nroidentificacion.$touch()"
                              clearable
                              disable="'required'"
                              autocomplete="off"
                            ></v-text-field>
                          </v-flex>

                          <div class="myphone flex xs12 md4">
                            <v-autocomplete
                              class="code"
                              id="code"
                              name="code"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.code.contents
                                  : 'Sin label'
                              "
                              v-model="code"
                              @keyup="osplug($v.profile.code, 'code')"
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.code, 'code')
                              "
                              @input="$v.profile.code.$touch()"
                              @blur="$v.profile.code.$touch()"
                              :items="allCountryCode"
                              :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                              autocomplete="off"
                            />
                            <v-flex>
                              <v-text-field
                                id="myphone"
                                name="myphone"
                                :label="
                                  refText.PROFILE !== undefined
                                    ? refText.PROFILE.myphone.contents
                                    : 'Sin label'
                                "
                                v-model="myphone"
                                @keyup="osplug($v.profile.myphone, 'myphone')"
                                :messages="['']"
                                :error-messages="
                                  campoErrors($v.profile.myphone, 'myphone')
                                "
                                @input="$v.profile.myphone.$touch()"
                                @blur="$v.profile.myphone.$touch()"
                                clearable
                                clear-icon="mdi-close"
                                :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                                autocomplete="off"
                              ></v-text-field>
                            </v-flex>
                          </div>

                          <v-flex xs12 md3>
                            <v-autocomplete
                              id="country"
                              name="country"
                              type="text"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.country.contents
                                  : 'Sin label'
                              "
                              v-model="country"
                              @keyup="osplug($v.profile.country, 'country')"
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.country, 'country')
                              "
                              @input="$v.profile.country.$touch()"
                              @blur="$v.profile.country.$touch()"
                              :items="allCountryName"
                              clearable
                              clear-icon="mdi-close"
                              :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                              autocomplete="off"
                            />
                          </v-flex>

                          <v-flex xs12 md3>
                            <v-autocomplete
                              id="state"
                              name="state"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.state.contents
                                  : 'Sin label'
                              "
                              v-model="state"
                              @keyup="osplug($v.profile.state, 'state')"
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.state, 'state')
                              "
                              @input="$v.profile.state.$touch()"
                              @blur="$v.profile.state.$touch()"
                              :items="CountryAllStates"
                              clearable
                              clear-icon="mdi-close"
                              :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                              disable="'required'"
                              autocomplete="off"
                            />
                          </v-flex>

                          <v-flex xs12 md4>
                            <v-autocomplete
                              id="city"
                              name="city"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.city.contents
                                  : 'Sin label'
                              "
                              v-model="city"
                              @keyup="osplug($v.profile.city, 'city')"
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.city, 'city')
                              "
                              @input="$v.profile.city.$touch()"
                              @blur="$v.profile.city.$touch()"
                              :items="StateAllCities"
                              clearable
                              clear-icon="mdi-close"
                              :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                              disable="'required'"
                              autocomplete="off"
                            />
                          </v-flex>

                          <v-flex xs12 md2>
                            <v-text-field
                              id="postalcode"
                              name="postalcode"
                              :label="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.postalcode.contents
                                  : 'Sin label'
                              "
                              v-model="postalcode"
                              @keyup="
                                osplug($v.profile.postalcode, 'postalcode')
                              "
                              :messages="['']"
                              :error-messages="
                                campoErrors($v.profile.postalcode, 'postalcode')
                              "
                              @input="$v.profile.postalcode.$touch()"
                              @blur="$v.profile.postalcode.$touch()"
                              clearable
                              clear-icon="mdi-close"
                              autocomplete="off"
                            ></v-text-field>
                          </v-flex>

                          <v-flex
                            xs12npm
                            text-xs-center
                            mt-2
                            mb-3
                            v-show="show_switStore"
                          >
                            <Switch1 />
                          </v-flex>

                          <div
                            class="flex xs12 text-xs-center mt-2 mb-3"
                            v-show="show_fields_store"
                          >
                            <template>
                              <v-layout wrap>
                                <v-flex xs12 md6>
                                  <v-text-field
                                    id="storename"
                                    name="storename"
                                    :label="
                                      refText.PROFILE !== undefined
                                        ? refText.PROFILE.storename.contents
                                        : 'Sin label'
                                    "
                                    v-model="storename"
                                    @keyup="
                                      osplug($v.profile.storename, 'storename')
                                    "
                                    :messages="['']"
                                    :error-messages="
                                      campoErrors(
                                        $v.profile.storename,
                                        'storename'
                                      )
                                    "
                                    @input="$v.profile.storename.$touch()"
                                    @blur="$v.profile.storename.$touch()"
                                    clearable
                                    autocomplete="off"
                                    class="store"
                                  ></v-text-field>
                                </v-flex>
                                <v-flex xs12 md6>
                                  <v-text-field
                                    id="rif"
                                    name="rif"
                                    :label="
                                      refText.PROFILE !== undefined
                                        ? refText.PROFILE.rif.contents
                                        : 'Sin label'
                                    "
                                    v-model="rif"
                                    @keyup="osplug($v.profile.rif, 'rif')"
                                    :messages="['']"
                                    :error-messages="
                                      campoErrors($v.profile.rif, 'rif')
                                    "
                                    @input="$v.profile.rif.$touch()"
                                    @blur="$v.profile.rif.$touch()"
                                    clearable
                                    autocomplete="off"
                                    class="store"
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </template>
                          </div>

                          <v-flex xs12 text-xs-center mt-2 mb-3>
                            <SubmitButton
                              class="button"
                              :text="
                                refText.PROFILE !== undefined
                                  ? refText.PROFILE.save.contents
                                  : 'Sin label'
                              "
                            />
                          </v-flex>
                        </v-layout>
                      </form>
                      <SuccessMessage />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="2" :value="'tab-2'">
            <v-card flat>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex xs12 sm10 offset-sm1>
                      <form @submit.prevent="submit">
                        <v-layout wrap>
                          <v-container>
                            <v-flex xs12 text-xs-center mt-2 mb-3>
                              <div>
                                <NameTab
                                  :title="
                                    refText.PROFILE !== undefined
                                      ? refText.PROFILE.changeemail.contents
                                      : 'Sin label'
                                  "
                                />
                              </div>
                              <div class="text-center">
                                <v-dialog v-model="dialogCM" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="button"
                                      @click="changeEmail"
                                      v-text="
                                        refText.PROFILE !== undefined
                                          ? refText.PROFILE.change.contents
                                          : 'Sin label'
                                      "
                                      dark
                                      v-bind="attrs"
                                      v-on="on"
                                      depressed
                                    >
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title class="headlinedialog">
                                      <Definition
                                        :title="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.change.contents
                                            : 'Sin label'
                                        "
                                      />
                                    </v-card-title>

                                    <v-card-text>
                                      <DialogText
                                        :title="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.changeemail_d
                                                .contents
                                            : 'Sin label'
                                        "
                                      />
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        v-text="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.accept.contents
                                            : 'Sin label'
                                        "
                                        class="button"
                                        text
                                        @click="dialogCM = false"
                                      >
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </div>
                            </v-flex>

                            <v-flex xs12 text-xs-center mt-2 mb-3>
                              <div>
                                <NameTab
                                  :title="
                                    refText.PROFILE !== undefined
                                      ? refText.PROFILE.changepassword.contents
                                      : 'Sin label'
                                  "
                                />
                              </div>
                              <div class="text-center">
                                <v-dialog v-model="dialogCP" width="500">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="button"
                                      @click="changePassword"
                                      title="profile.Change"
                                      v-text="
                                        refText.PROFILE !== undefined
                                          ? refText.PROFILE.change.contents
                                          : 'Sin label'
                                      "
                                      dark
                                      v-bind="attrs"
                                      v-on="on"
                                      depressed
                                    >
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title class="headlinedialog">
                                      <Definition
                                        :title="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.changepassword_d
                                                .contents
                                            : 'Sin label'
                                        "
                                      />
                                    </v-card-title>

                                    <v-card-text>
                                      <DialogText
                                        :title="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.change_messagr_d
                                                .contents
                                            : 'Sin label'
                                        "
                                      />
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        v-text="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.accept.contents
                                            : 'Sin label'
                                        "
                                        class="button"
                                        text
                                        @click="dialogCP = false"
                                      >
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </div>
                            </v-flex>
                            <v-flex xs12 text-xs-center mt-2 mb-3>
                              <div>
                                <NameTab
                                  :title="
                                    refText.PROFILE !== undefined
                                      ? refText.PROFILE.consultdip.contents
                                      : 'Sin label'
                                  "
                                />
                              </div>
                              <div class="text-center">
                                <v-dialog v-model="dialog" width="1000">
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      class="button"
                                      @click="consultHistory"
                                      v-text="
                                        refText.PROFILE !== undefined
                                          ? refText.PROFILE.consult.contents
                                          : 'Sin label'
                                      "
                                      dark
                                      v-bind="attrs"
                                      v-on="on"
                                      depressed
                                    >
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-card-title class="headlinedialog">
                                      <Definition
                                        :title="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.consuktdip_d
                                                .contents
                                            : 'Sin label'
                                        "
                                      />
                                    </v-card-title>

                                    <v-card-text>
                                      <DialogText
                                        :title="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.consultdip_ds
                                                .contents
                                            : 'Sin label'
                                        "
                                      />
                                    </v-card-text>

                                    <v-container fluid> </v-container>

                                    <v-card-text>
                                      <DialogText
                                        :title="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.consultdip_dc
                                                .contents
                                            : 'Sin label'
                                        "
                                      />
                                    </v-card-text>

                                    <v-divider></v-divider>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        v-text="
                                          refText.PROFILE !== undefined
                                            ? refText.PROFILE.accept.contents
                                            : 'Sin label'
                                        "
                                        class="button"
                                        text
                                        @click="dialog = false"
                                      >
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                                <v-dialog v-model="dialogBirth" max-width="500">
                                  <v-card>
                                    <v-card-title
                                      class="headline  v-card__title.headline"
                                    >
                                      <Definition
                                        :title="$t('date_of_birth.HEADERBIRTH')"
                                      />
                                    </v-card-title>

                                    <v-card-text>
                                      <DialogText
                                        :title="
                                          $t(
                                            'date_of_birth.PROF_DESCRIPTIONBIRTH'
                                          )
                                        "
                                      />
                                    </v-card-text>
                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <v-btn
                                        v-text="$t('date_of_birth.ACCEPT')"
                                        class="button"
                                        text
                                        @click="dialogBirth = false"
                                      >
                                      </v-btn>
                                    </v-card-actions>
                                  </v-card>
                                </v-dialog>
                              </div>
                            </v-flex>
                          </v-container>
                        </v-layout>
                      </form>
                      <SuccessMessage />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="3" :value="'tab-3'">
            <v-card flat>
              <v-card-text> </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
  </v-layout>
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
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-empty */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-constant-condition */ /* eslint-disable func-style */

import plumessag from '@/plugins/plumessag'
import Switch1 from '@/components/common/Switch1.vue'
import { mapActions } from 'vuex'
import NameTab from '../common/NameTab.vue'
import vaalid from '@/plugins/vaalidate'

export default {
  name: 'Profile',
  components: { NameTab, Switch1 },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('profile.TITLE')} - %s`
    }
  },

  data() {
    return {
      profile: {
        username: '',
        email: '',
        firstname: '',
        secondname: '',
        firstsurname: '',
        secondsurname: '',
        date: '',
        nroidentificacion: '',
        code: '',
        myphone: '',
        country: '',
        state: '',
        city: '',
        postalcode: '',
        storename: '',
        rif: '',
        role: '',
        isstore: ''
      },
      icon_validate_username: '',
      color_validate_username: '',
      loading_validate_user: false,
      error_unique: false,
      messages_username: '',
      dialogBirth: false,
      localet: 'es',
      urlDefault: 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm',
      dialog: false,
      dialogCM: false,
      dialogCP: false,
      dialogCH: false,
      triggerChangePassword: false,
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      searchInput: '',
      password: '',
      menu: false,
      tab: null,
      datePiker: '',
      show_switStore: false,
      idcomponent: 'PROFILE',
      refText: '',
      show_fields_store: false
    }
  },

  computed: {
    getJson() {
      return this.$store.state.messages.message
    },

    getNameComponent() {
      return this.$store.state.messages.name_components
    },
    switch1boll: {
      get() {
        console.log(
          `LLEGANDO AL COMPUTE ${this.$store.state.switch1.switch1.switch1boll}`
        )

        /*  switch (this.$store.state.profile.profile.isstore) {
          case true:
            this.show_switStore = false
            this.show_fields_store = true
            break
          case false:
            this.show_switStore = true
            this.show_fields_store = false
            break

          default:
            break
        }*/
        return this.$store.state.switch1.switch1.switch1boll
      },
      set(value) {
        this.setSwitch(value)
      }
    },
    /* switchstore() {
      console.log(`LLEGA ${this.$store.state.switch1.switch1.switch1boll}`)
      return this.$store.state.switch1.switch1.switch1boll
    }, */
    already_username_profile: {
      get() {
        return this.$store.state.profile.already_username_profile
      },
      set(value) {
        const data = {
          key: 'already_username_profile',
          value
        }
        this.addItems(data)
      }
    },
    imgperfil: {
      get() {
        this.profile.imgperfil = this.$store.state.profile.profile.imgperfil
        return this.$store.state.profile.profile.imgperfil
      },
      set(value) {
        const data = {
          key: 'imgperfil',
          value
        }
        this.profile.imgperfil = this.$store.state.profile.profile.imgperfil
        this.addProfileData(data)
      }
    },
    isstore: {
      get() {
        this.setSwitch(this.$store.state.profile.profile.isstore)
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.isstore = this.$store.state.profile.profile.isstore
        console.log(`ISSTORE ${this.$store.state.profile.profile.isstore}`)

        switch (this.$store.state.profile.profile.isstore) {
          case true:
            this.show_switStore = false
            this.show_fields_store = true
            break
          case false:
            this.show_switStore = true
            this.show_fields_store = false
            break

          default:
            break
        }

        return this.$store.state.profile.profile.isstore
      },
      set(value) {
        const data = {
          key: 'isstore',
          value
        }
        this.profile.isstore = this.$store.state.profile.profile.isstore
        this.setSwitch(this.$store.state.profile.profile.isstore)
        this.addProfileData(data)
      }
    },
    role: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.role = this.$store.state.profile.profile.role
        return this.$store.state.profile.profile.role
      },
      set(value) {
        const data = {
          key: 'role',
          value
        }
        this.profile.role = this.$store.state.profile.profile.role
        this.addProfileData(data)
      }
    },
    username: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.username = this.$store.state.profile.profile.username
        return this.$store.state.profile.profile.username
      },
      set(value) {
        const data = {
          key: 'username',
          value
        }
        this.profile.username = this.$store.state.profile.profile.username
        this.addProfileData(data)
      }
    },
    email() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.profile.email = this.$store.state.profile.profile.email
      return this.$store.state.profile.profile.email
    },
    firstname: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.firstname = this.$store.state.profile.profile.firstname
        return this.$store.state.profile.profile.firstname
      },
      set(value) {
        const data = {
          key: 'firstname',
          value
        }
        this.profile.firstname = this.$store.state.profile.profile.firstname
        this.addProfileData(data)
      }
    },
    secondname: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.secondname = this.$store.state.profile.profile.secondname
        return this.$store.state.profile.profile.secondname
      },
      set(value) {
        const data = {
          key: 'secondname',
          value
        }
        this.profile.secondname = this.$store.state.profile.profile.secondname
        this.addProfileData(data)
      }
    },
    firstsurname: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.firstsurname = this.$store.state.profile.profile.firstsurname
        return this.$store.state.profile.profile.firstsurname
      },
      set(value) {
        const data = {
          key: 'firstsurname',
          value
        }
        this.profile.firstsurname = this.$store.state.profile.profile.firstsurname
        this.addProfileData(data)
      }
    },
    secondsurname: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.secondsurname = this.$store.state.profile.profile.secondsurname
        return this.$store.state.profile.profile.secondsurname
      },
      set(value) {
        const data = {
          key: 'secondsurname',
          value
        }
        this.profile.secondsurname = this.$store.state.profile.profile.secondsurname
        this.addProfileData(data)
      }
    },
    date: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.date = this.$store.state.profile.profile.birthayte
        return this.$store.state.profile.profile.birthayte
      },
      set(value) {
        const data = {
          key: 'date',
          value
        }
        this.profile.date = this.$store.state.profile.profile.birthayte
        this.addProfileData(data)
      }
    },
    nroidentificacion: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.nroidentificacion = this.$store.state.profile.profile.nroidentificacion
        return this.$store.state.profile.profile.nroidentificacion
      },
      set(value) {
        const data = {
          key: 'nroidentificacion',
          value
        }
        this.profile.nroidentificacion = this.$store.state.profile.profile.nroidentificacion
        this.addProfileData(data)
      }
    },
    country: {
      get() {
        // console.log(`StateSelect ${this.$store.state.profile.profile.country}`)
        if (this.$store.state.profile.profile.country !== undefined) {
          this.getCountryAllStates({
            country: this.$store.state.profile.profile.country
          })
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.country = this.$store.state.profile.profile.country
        return this.$store.state.profile.profile.country
      },
      set(value) {
        const data = {
          key: 'country',
          value
        }
        this.profile.country = this.$store.state.profile.profile.country
        this.addProfileData(data)
      }
    },
    allCountryName() {
      return this.$store.state.adminCountry.allcountrysname
    },
    allCountryCode() {
      return this.$store.state.adminCountry.allcountryscode
    },
    allCountry() {
      return this.$store.state.adminCountry.allcountrys
    },
    CountryAllStates() {
      return this.$store.state.allid.allstatesContry
    },
    state: {
      get() {
        // console.log(`CitySelect ${this.$store.state.profile.profile.country}`)
        if (this.$store.state.profile.profile.state !== undefined) {
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.state = this.$store.state.profile.profile.state
        return this.$store.state.profile.profile.state
      },
      set(value) {
        const data = {
          key: 'state',
          value
        }
        this.profile.state = this.$store.state.profile.profile.state
        this.addProfileData(data)
      }
    },
    StateAllCities() {
      return this.$store.state.allid.allcitiesStates
    },
    city: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.city = this.$store.state.profile.profile.city
        return this.$store.state.profile.profile.city
      },
      set(value) {
        const data = {
          key: 'city',
          value
        }
        this.profile.city = this.$store.state.profile.profile.city
        this.addProfileData(data)
      }
    },
    postalcode: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.postalcode = this.$store.state.profile.profile.postalcode
        return this.$store.state.profile.profile.postalcode
      },
      set(value) {
        const data = {
          key: 'postalcode',
          value
        }
        this.profile.postalcode = this.$store.state.profile.profile.postalcode
        this.addProfileData(data)
      }
    },
    code: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.code = this.$store.state.profile.profile.code
        return this.$store.state.profile.profile.code
      },
      set(value) {
        const data = {
          key: 'code',
          value
        }
        this.profile.code = this.$store.state.profile.profile.code
        this.addProfileData(data)
      }
    },
    myphone: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.myphone = this.$store.state.profile.profile.myphone
        return this.$store.state.profile.profile.myphone
      },
      set(value) {
        const data = {
          key: 'myphone',
          value
        }
        this.profile.myphone = this.$store.state.profile.profile.myphone
        this.addProfileData(data)
      }
    },
    storename: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.storename = this.$store.state.profile.profile.storename
        return this.$store.state.profile.profile.storename
      },
      set(value) {
        const data = {
          key: 'storename',
          value
        }
        this.profile.storename = this.$store.state.profile.profile.storename
        this.addProfileData(data)
      }
    },
    rif: {
      get() {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.profile.rif = this.$store.state.profile.profile.rif
        return this.$store.state.profile.profile.rif
      },
      set(value) {
        const data = {
          key: 'rif',
          value
        }
        this.profile.rif = this.$store.state.profile.profile.rif
        this.addProfileData(data)
      }
    }
  },
  watch: {
    switch1boll() {
      console.log(
        `Hemos detectado un cambio en switchstore: ${this.$store.state.switch1.switch1.switch1boll}`
      )

      console.log(`Valor isstore: ${this.$store.state.profile.profile.isstore}`)

      switch (this.$store.state.switch1.switch1.switch1boll) {
        case true:
          if (this.$store.state.profile.profile.isstore) {
            this.show_switStore = false
            this.show_fields_store = true
          } else {
            this.show_fields_store = true
          }
          break
        case false:
          if (this.$store.state.profile.profile.isstore) {
            this.show_switStore = false
            this.show_fields_store = true
          } else {
            this.show_switStore = true
            this.show_fields_store = false
          }

          break

        default:
          break
      }
    },
    isstore() {
      console.log(
        `Hemos detectado un cambio en isstore: ${this.$store.state.profile.profile.isstore}`
      )
      this.setSwitch(this.$store.state.profile.profile.isstore)

      switch (this.$store.state.profile.profile.isstore) {
        case true:
          this.show_switStore = false
          this.show_fields_store = true
          break
        case false:
          this.show_switStore = true
          this.show_fields_store = false
          break

        default:
          break
      }
    }
  },
  methods: {
    ...mapActions([
      'name_component',
      'getText_component',
      'changeMyPassword',
      'getProfile',
      'getAllCoutry',
      'addProfileData',
      'saveProfile',
      'setSwitch',
      'verifiRegisterUsernameProfile'
    ]),
    async validate_username() {
      if (!this.$v.profile.username.$dirty) {
        return
      }

      this.loading_validate_username = true
      let validate = ''
      // console.log(`invalid user: ${this.$v.signup.username.$invalid}`)

      const dataValidateUsr = {
        username: this.profile.username
      }

      if (
        this.$v.profile.username.$invalid == false &&
        this.profile.username != undefined &&
        this.profile.username != null
      ) {
        validate = await this.verifiRegisterUsernameProfile(dataValidateUsr)
        // console.log('Validate username: ' + JSON.stringify(validate))
        console.log(`existUsername: ${JSON.stringify(validate.data)}`)
        if (
          validate.data.existUsername != null &&
          validate.data.existUsername != undefined
        ) {
          this.it_already_username = true
          this.color_validate_username = 'menjErr'
          this.icon_validate_username = 'close'
          // console.log('datos incorrecto.')
          this.ExistUserName(this.$v.profile.username, 'username', true)
          this.error_unique = true
        } else {
          this.it_already_username = false

          // console.log('datos correcto.')
          this.icon_validate_username = 'done'
          this.ExistUserName(this.$v.profile.username, 'username', false)
        }
      } else {
        this.error_unique = true
        this.icon_validate_username = 'close'
        this.color_validate_username = 'menjErr'
      }
      this.loading_validate_username = false
    },

    async submit() {
      // const valid = await this.$validator.validateAll()
      let role = ''
      const edad = this.calcularEdad(this.profile.date)
      const dataValidateUsr = {
        username: this.profile.username
      }
      const validateUsr = await this.verifiRegisterUsernameProfile(
        dataValidateUsr
      )
      this.$v.$reset()
      this.$v.$touch()
      await this.subvali(this.$v.profile)
      await this.validate_username()
      // console.log(" qweqweqw " + JSON.stringify(this.$v.profile))

      if (this.$v.profile.$invalid || validateUsr.data.existUsername != null) {
        return false
      }

      if (edad >= 18 && edad <= 100) {
      } else {
        this.dialogBirth = true
        return false
      }

      if (!this.$v.profile.$invalid) {
        if (this.$store.state.switch1.switch1.switch1boll) {
          role = 'store'
        } else {
          role = 'user'
        }
        await this.saveProfile({
          imgperfil: this.imgperfil,
          username: this.username,
          email: this.email,
          firstname: this.firstname,
          secondname: this.secondname,
          firstsurname: this.firstsurname,
          secondsurname: this.secondsurname,
          date: this.date,
          nroidentificacion: this.nroidentificacion,
          code: this.code,
          myphone: this.myphone,
          country: this.country,
          state: this.state,
          city: this.city,
          postalcode: this.postalcode,
          storename: this.storename,
          rif: this.rif,
          password: this.password,
          role,
          isstore: this.$store.state.switch1.switch1.switch1boll
        })
      }
    },
    async getswitch() {
      return window.localStorage.getItem('valudeswitch')
    },
    async changeEmail() {
      // const valid = await this.$validator.validateAll()
      if (true) {
        await this.changeSecurity({
          chEmail: true,
          chPassword: false
        })
      }
    },
    async changePassword() {
      // const valid = await this.$validator.validateAll()
      if (true) {
        await this.changeSecurity({
          chEmail: false,
          chPassword: true
        })
      }
    },
    async consultHistory() {
      // const valid = await this.$validator.validateAll()
      if (true) {
        await this.consultTheHistory({})
      }
    },
    prueba() {
      this.localet = JSON.parse(window.localStorage.getItem('locale'))
      if (this.localet === 'cn') {
        this.localet = 'zh-cn'
      }
    },
    save(date) {
      this.datePiker = date
      this.$refs.menu.save(date)
    },
    close() {
      this.triggerChangePassword = false
      this.dialog = false
    },
    async save1() {
      try {
        // const valid = await this.$validator.validateAll()
        if (true) {
          await this.changeMyPassword({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword
          })
          this.oldPassword = ''
          this.newPassword = ''
          this.confirmPassword = ''
          this.triggerChangePassword = false
          this.close()
          return
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.triggerChangePassword = false
        this.close()
      }
    }
  },

  validations: vaalid.validations,

  async mounted() {
    await this.name_component(this.idcomponent)
    console.log(
      `QUE TADO TENEMOS ES ISSTORE ${this.$store.state.profile.profile.isstore}`
    )
    await this.getProfile()
    await this.getAllCoutry()
    await this.validate_username()
  }
}
</script>
