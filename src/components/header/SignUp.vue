<style lang="css" src="./../../app/css/SignUp.css"></style>
<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=6LfgPdkaAAAAAFUAATmGKU6OOpOlPUo-b16-gb0o"></script>

<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm10 offset-sm1>
        <form name="form" id="form" v-on:submit.prevent="submit()">
          <v-flex xs12 text-xs-center mt-5 mb-3>
            <ImagePerfil :imgP="this.urlDefault" />
          </v-flex>
          <v-layout wrap>
            <Switch1 class="switchclass" />
            <v-flex xs12 md6>
              <v-text-field
                name="username"
                type="text"
                v-model="signup.username"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.username.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.signup.username, 'username')"
                :append-icon="icon_validate_username"
                :loading="loading_validate_user"
                :class="color_validate_username"
                @keyup="
                  osplug($v.signup.username, 'username'), validate_username()
                "
                @input="$v.signup.username.$touch()"
                @blur="$v.signup.username.$touch()"
                prepend-icon="mdi-account-outline"
                autocomplete="off"
              >
              </v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                name="email"
                id="email"
                type="email"
                v-model="signup.email"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.email.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.signup.email, 'email')"
                :append-icon="icon_validate_email"
                :loading="loading_validate_mail"
                @change="validate_email()"
                @keyup="osplug($v.signup.email, 'email'), validate_email()"
                @input="$v.signup.email.$touch()"
                @blur="$v.signup.email.$touch()"
                prepend-icon="mdi-email-outline"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                id="password"
                name="password"
                v-model="signup.password"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.password.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.signup.password, 'password')"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                @keyup="osplug($v.signup.password, 'password')"
                @click:append="show1 = !show1"
                @input="$v.signup.password.$touch()"
                @blur="$v.signup.password.$touch()"
                prepend-icon="mdi-lock-open-outline"
                ref="password"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                id="confirmPassword"
                name="confirmPassword"
                v-model="signup.confirmPassword"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.confirmPassword.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="
                  campoErrors($v.signup.confirmPassword, 'confirmPassword')
                "
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @keyup="osplug($v.signup.confirmPassword, 'confirmPassword')"
                @input="$v.signup.confirmPassword.$touch()"
                @blur="$v.signup.confirmPassword.$touch()"
                @click:append="show2 = !show2"
                prepend-icon="mdi-lock-outline"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                id="firstname"
                name="firstname"
                type="text"
                v-model="signup.firstname"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.firstname.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.signup.firstname, 'firstname')"
                @keyup="osplug($v.signup.firstname, 'firstname')"
                @input="$v.signup.firstname.$touch()"
                @blur="$v.signup.firstname.$touch()"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                id="secondname"
                type="text"
                name="secondname"
                v-model="signup.secondname"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.secondname.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="
                  campoErrors($v.signup.secondname, 'secondname')
                "
                @keyup="osplug($v.signup.secondname, 'secondname')"
                @input="$v.signup.secondname.$touch()"
                @blur="$v.signup.secondname.$touch()"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                id="firstsurname"
                name="firstsurname"
                type="text"
                v-model="signup.firstsurname"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.firstsurname.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="
                  campoErrors($v.signup.firstsurname, 'firstsurname')
                "
                @keyup="osplug($v.signup.firstsurname, 'firstsurname')"
                @input="$v.signup.firstsurname.$touch()"
                @blur="$v.signup.firstsurname.$touch()"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md6>
              <v-text-field
                id="secondsurname"
                name="secondsurname"
                type="text"
                v-model="signup.secondsurname"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.secondsurname.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="
                  campoErrors($v.signup.secondsurname, 'secondsurname')
                "
                @keyup="osplug($v.signup.secondsurname, 'secondsurname')"
                @input="$v.signup.secondsurname.$touch()"
                @blur="$v.signup.secondsurname.$touch()"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 md4>
              <template>
                <v-menu
                  ref="menu"
                  v-model="signup.menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      id="date"
                      name="date"
                      v-model="signup.date"
                      :label="
                        refText.SIGNUP !== undefined
                          ? refText.SIGNUP.date.contents
                          : 'Sin label'
                      "
                      :messages="['']"
                      :error-messages="campoErrors($v.signup.date, 'date')"
                      @keyup="osplug($v.signup.date, 'date')"
                      @input="$v.signup.date.$touch()"
                      @blur="$v.signup.date.$touch()"
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
                    v-model="signup.date"
                    :maxValue="new Date().toISOString().substr(0, 10)"
                    minValue="1950-01-01"
                    :locale="signup.localet"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </template>
            </v-flex>

            <v-flex xs12 md4>
              <v-text-field
                id="nroidentificacion"
                name="nroidentificacion"
                type="text"
                v-model="signup.nroidentificacion"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.nroidentificacion.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="
                  campoErrors($v.signup.nroidentificacion, 'nroidentificacion')
                "
                @keyup="
                  osplug($v.signup.nroidentificacion, 'nroidentificacion')
                "
                @input="$v.signup.nroidentificacion.$touch()"
                @blur="$v.signup.nroidentificacion.$touch()"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <div class="myphone flex xs12 md4">
              <v-autocomplete
                class="code"
                id="code"
                name="code"
                v-model="signup.code"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.code.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.signup.code, 'code')"
                :items="allCountryCode"
                :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                @keyup="osplug($v.signup.code, 'code')"
                @input="$v.signup.code.$touch()"
                @blur="$v.signup.code.$touch()"
                autocomplete="off"
              />
              <v-flex>
                <v-text-field
                  id="myphone"
                  name="myphone"
                  type="text"
                  v-model="signup.myphone"
                  :label="
                    refText.SIGNUP !== undefined
                      ? refText.SIGNUP.myphone.contents
                      : 'Sin label'
                  "
                  :messages="['']"
                  :error-messages="campoErrors($v.signup.myphone, 'myphone')"
                  @keyup="osplug($v.signup.myphone, 'myphone')"
                  @input="$v.signup.myphone.$touch()"
                  @blur="$v.signup.myphone.$touch()"
                  autocomplete="off"
                ></v-text-field>
              </v-flex>
            </div>

            <v-flex xs12 md3>
              <v-autocomplete
                id="country"
                name="country"
                type="text"
                v-model="signup.country"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.country.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.signup.country, 'country')"
                :items="allCountryName"
                :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                @change="this.changeCountry"
                @keyup="osplug($v.signup.country, 'country')"
                @input="$v.signup.country.$touch()"
                @blur="$v.signup.country.$touch()"
                clearable
                clear-icon="mdi-close"
                autocomplete="off"
              />
            </v-flex>

            <v-flex xs12 md3>
              <v-autocomplete
                id="state"
                name="state"
                v-model="signup.state"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.state.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.signup.state, 'state')"
                :items="CountryAllStates"
                :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                @change="this.changeState"
                @keyup="osplug($v.signup.state, 'state')"
                @input="$v.signup.state.$touch()"
                @blur="$v.signup.state.$touch()"
                clearable
                clear-icon="mdi-close"
                autocomplete="off"
              />
            </v-flex>

            <v-flex xs12 md4>
              <v-autocomplete
                id="city"
                name="city"
                v-model="signup.city"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.city.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="campoErrors($v.signup.city, 'city')"
                :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                @keyup="osplug($v.signup.city, 'city')"
                @input="$v.signup.city.$touch()"
                @blur="$v.signup.city.$touch()"
                :items="StateAllCities"
                clearable
                clear-icon="mdi-close"
                autocomplete="off"
              />
            </v-flex>

            <v-flex xs15 md2>
              <v-text-field
                id="postalcode"
                name="postalcode"
                v-model="signup.postalcode"
                :label="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.postalcode.contents
                    : 'Sin label'
                "
                :messages="['']"
                :error-messages="
                  campoErrors($v.signup.postalcode, 'postalcode')
                "
                @keyup="osplug($v.signup.postalcode, 'postalcode')"
                @input="$v.signup.postalcode.$touch()"
                @blur="$v.signup.postalcode.$touch()"
                autocomplete="off"
              ></v-text-field>
            </v-flex>

            <div class="flex xs12 text-xs-center mt-2 mb-3" v-if="switchstore">
              <template>
                <v-layout wrap>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="storename"
                      name="storename"
                      type="text"
                      v-model="signup.storename"
                      :label="
                        refText.SIGNUP !== undefined
                          ? refText.SIGNUP.storename.contents
                          : 'Sin label'
                      "
                      :messages="['']"
                      :error-messages="
                        campoErrors($v.signup.storename, 'storename')
                      "
                      @keyup="osplug($v.signup.storename, 'storename')"
                      @input="$v.signup.storename.$touch()"
                      @blur="$v.signup.storename.$touch()"
                      prepend-icon="mdi mdi-store"
                      autocomplete="off"
                      class="store"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="rif"
                      name="rif"
                      v-model="signup.rif"
                      :label="
                        refText.SIGNUP !== undefined
                          ? refText.SIGNUP.rif.contents
                          : 'Sin label'
                      "
                      :messages="['']"
                      :error-messages="campoErrors($v.signup.rif, 'rif')"
                      @keyup="osplug($v.signup.rif, 'rif')"
                      @input="$v.signup.rif.$touch()"
                      @blur="$v.signup.rif.$touch()"
                      autocomplete="off"
                      class="store"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </template>
            </div>
            <v-flex xs12 text-xs-center mt-2 mb-3>
              <vue-recaptcha
                id="recaptcha"
                name="recaptcha"
                v-model="signup.recaptcha"
                @verify="onVerify"
                @expired="onCaptchaExpired"
                :sitekey="this.key"
                :loadRecaptchaScript="true"
                ref="recaptcha"
                theme="dark"
                class="g-recaptcha"
              >
              </vue-recaptcha>
            </v-flex>
            <v-dialog v-model="dialog" max-width="500">
              <v-card>
                <v-card-title class="headline v-card__title.headline">
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

            <v-dialog v-model="dialogBirth" max-width="500">
              <v-card>
                <v-card-title class="headline  v-card__title.headline">
                  <Definition :title="$t('date_of_birth.HEADERBIRTH')" />
                </v-card-title>

                <v-card-text>
                  <DialogText :title="$t('date_of_birth.DESCRIPTIONBIRTH')" />
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
            <v-flex xs12 text-xs-center mt-2 mb-3>
              <SubmitButton
                class="button"
                type="submit"
                :text="
                  refText.SIGNUP !== undefined
                    ? refText.SIGNUP.sign_me_up.contents
                    : 'Sin label'
                "
              />
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

import Switch1 from '@/components/common/Switch1.vue'
import vaalid from '@/plugins/vaalidate'
import plumessag from '@/plugins/plumessag'
import { mapActions } from 'vuex'
import VueRecaptcha from 'vue-recaptcha'

export default {
  name: 'SignUp',
  components: {
    Switch1,
    VueRecaptcha
  },

  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('signup.TITLE')} - %s`
    }
  },
  data() {
    return {
      signup: {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstname: '',
        secondname: '',
        firstsurname: '',
        secondsurname: '',
        nroidentificacion: '',
        code: '',
        myphone: '',
        country: '',
        state: '',
        city: '',
        postalcode: '',
        storename: '',
        rif: '',
        isstore: '',
        role: '',
        date: null,
        recaptcha: null,
        menu: false,
        localet: 'es'
      },
      icon_validate_email: '',
      icon_validate_username: '',
      color_validate_email: '',
      color_validate_username: '',
      messages_email: '',
      messages_username: '',
      key: '6LfgPdkaAAAAAFUAATmGKU6OOpOlPUo-b16-gb0o',
      urlDefault: 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm',
      loading_validate_mail: false,
      loading_validate_user: false,
      error_unique: false,
      dialog: false,
      dialogBirth: false,
      show1: false,
      show2: false,
      idcomponent: 'SIGNUP',
      idtext: 'Mensaje',
      refText: '',
      datePiker: ''
    }
  },

  computed: {
    switchstore() {
      return this.$store.state.switch1.switch1.switch1boll
    },

    getJson() {
      return this.$store.state.messages.message
    },
    imgperfil: {
      get() {
        return this.$store.state.signup.imgperfil // creamos una costante
      },
      set(value) {
        const data = {
          key: 'imgperfil',
          value
        } // para guardar dos valores
        // key para su filtro, y value su valor
        this.addItems(data) // le mandamos data a el metodo
      }
    },
    /*message: {
      get() {
        return this.$store.state.messages
      },
      set(value) {
        const data = {
          key: 'contents',
          value
        }
        this.addItems(data)
      }
    },*/
    country: {
      get() {
        return this.$store.state.signup.country
      },
      set(value) {
        const data = {
          key: 'country',
          value
        }
        this.addItems(data)
      }
    },
    it_already_email: {
      get() {
        return this.$store.state.signup.it_already_email
      },
      set(value) {
        const data = {
          key: 'it_already_email',
          value
        }
        this.addItems(data)
      }
    },

    it_already_username: {
      get() {
        return this.$store.state.signup.it_already_username
      },
      set(value) {
        const data = {
          key: 'it_already_username',
          value
        }
        this.addItems(data)
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
    state: {
      get() {
        return this.$store.state.signup.signup.state
      },

      set(value) {
        const data = {
          key: 'state',
          value
        }
        this.addItems(data)
      }
    },

    CountryAllStates() {
      return this.$store.state.allid.allstatesContry
    },

    city: {
      get() {
        return this.$store.state.signup.signup.city
      },

      set(value) {
        const data = {
          key: 'city',
          value
        }
        this.addItems(data)
      }
    },

    StateAllCities() {
      return this.$store.state.allid.allcitiesStates
    }
  },

  methods: {
    ...mapActions([
      'userSignUp',
      //'getText_text',
      'name_component',
      'photoRegistration',
      'getText_component',
      'getAllCoutry',
      'getCountryAllStates',
      'getStateAllCities',
      'addItems',
      'UrlDefault',
      'validateEmail',
      'verifiRegisterUsername'
    ]),

    async changeCountry() {
      this.getCountryAllStates({
        country: this.signup.country
      })
    },

    async changeState() {
      this.getStateAllCities({
        state: this.signup.state
      })
    },

    onVerify(response) {
      this.signup.recaptcha = response
    },

    onCaptchaExpired: function() {
      this.$refs.recaptcha.reset()
    },
    async validate_email() {
      //console.log(`diry mail ${JSON.stringify(this.$v.signup.email)}`)

      if (!this.$v.signup.email.$dirty) {
        return
      }

      this.loading_validate_email = true
      let validate = ''
      const dataValidateEMmail = {
        email: this.signup.email
      }

      if (
        this.$v.signup.email.$invalid == false &&
        this.signup.email != undefined &&
        this.signup.email != null
      ) {
        validate = await this.validateEmail(dataValidateEMmail)

        if (validate.error != undefined && validate.error == true) {
          //console.error('error validando correo...')
          this.error_unique = true
          this.icon_validate_email = 'close'
          this.color_validate_email = 'menjErr'
          this.ExistMail(this.$v.signup.email, 'email', null)
        } else {
          // console.log('Validate existEmail: ' + JSON.stringify(validate))
          if (
            validate.data.existEmail != null &&
            validate.data.existEmail != undefined
          ) {
            this.ExistMail(this.$v.signup.email, 'email', true)
            this.color_validate_email = 'menjErr'
            this.icon_validate_email = 'close'
            //console.error('datos incorrecto.')
            this.error_unique = true
          } else {
            this.ExistMail(this.$v.signup.email, 'email', false)
            //console.log('datos correcto.')
            this.icon_validate_email = 'done'
            this.color_validate_email = 'success--text'
          }
        }
      } else {
        this.error_unique = true
        this.icon_validate_email = 'close'
        this.color_validate_email = 'menjErr'
      }

      this.loading_validate_email = false
      // console.log(' isExist: ' + JSON.stringify(this.$v.signup.email.isExist))
    },

    async validate_username() {
      if (!this.$v.signup.username.$dirty) {
        return
      }

      this.loading_validate_username = true
      let validate = ''
      //console.log(`invalid user: ${this.$v.signup.username.$invalid}`)

      const dataValidateUsr = {
        username: this.signup.username
      }

      if (
        this.$v.signup.username.$invalid == false &&
        this.signup.username != undefined &&
        this.signup.username != null
      ) {
        validate = await this.verifiRegisterUsername(dataValidateUsr)
        //console.log('Validate username: ' + JSON.stringify(validate))

        if (validate.data.existUsername != null) {
          this.it_already_username = true
          this.color_validate_username = 'menjErr'
          this.icon_validate_username = 'close'
          //console.log('datos incorrecto.')
          this.ExistUserName(this.$v.signup.username, 'username', true)
          this.error_unique = true
        } else {
          this.it_already_username = false
          //console.log('datos correcto.')
          this.icon_validate_username = 'done'
          this.ExistUserName(this.$v.signup.username, 'username', false)
        }
      } else {
        this.error_unique = true
        this.icon_validate_username = 'close'
        this.color_validate_username = 'menjErr'
      }
      this.loading_validate_username = false
    },

    async submit() {
      var role = ''
      var edad = this.calcularEdad(this.signup.date)
      const dataValidateEMmail = {
        email: this.signup.email
      }
      const dataValidateUsr = {
        username: this.signup.username
      }
      const validateUsr = await this.verifiRegisterUsername(dataValidateUsr)
      const validateEMmail = await this.validateEmail(dataValidateEMmail)
      this.$v.$reset()
      this.$v.$touch()
      await this.subvali(this.$v.signup)

      if (
        this.$v.signup.$invalid ||
        validateUsr.data.existUsername != null ||
        validateEMmail.data.existEmail != null
      ) {
        return false
      }

      if (this.signup.recaptcha == null) {
        this.dialog = true
        return false
      }

      if (edad >= 18 && edad <= 100) {
      } else {
        this.dialogBirth = true
        return false
      }

      if (!this.$v.signup.$invalid) {
        if (this.$store.state.switch1.switch1.switch1boll) {
          role = 'store'
        } else {
          role = 'user'
        }
        await this.userSignUp({
          username: this.signup.username,
          email: this.signup.email,
          password: this.signup.password,
          firstname: this.signup.firstname,
          secondname: this.signup.secondname,
          firstsurname: this.signup.firstsurname,
          secondsurname: this.signup.secondsurname,
          date: this.signup.date,
          nroidentificacion: this.signup.nroidentificacion,
          code: this.signup.code,
          myphone: this.signup.myphone,
          country: this.signup.country,
          state: this.signup.state,
          city: this.signup.city,
          postalcode: this.signup.postalcode,
          storename: this.signup.storename,
          rif: this.signup.rif,
          recaptcha: this.signup.recaptcha,
          isstore: this.$store.state.switch1.switch1.switch1boll,
          role: role
        })
        await this.photoRegistration({})
      }
    },

    async getswitch() {
      return window.localStorage.getItem('valudeswitch')
    },

    prueba() {
      this.signup.localet = JSON.parse(window.localStorage.getItem('locale'))
      if (this.localet === 'cn') {
        this.localet = 'zh-cn'
      }
    },

    save(date) {
      this.datePiker = date
      this.$refs.menu.save(date)
    }
  },

  validations: vaalid.validations,

  async mounted() {
    await this.name_component(this.idcomponent)
    this.getNameComponent()
    this.getAllCoutry()
    this.UrlDefault()
    await this.onVerify()

  }
}
</script>
