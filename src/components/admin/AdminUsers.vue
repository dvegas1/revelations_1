<style lang="css" src="./../../app/css/admin.css"></style>

<template>
  <v-container fluid class="">
    <div>
      <v-layout wrap>
        <v-flex xs12 sm12 md4 mt-3 pl-4>
          <v-toolbar-title>{{
            refText.ADMINUSERS !== undefined
              ? refText.ADMINUSERS.title.contents
              : 'Sin label'
          }}</v-toolbar-title>
        </v-flex>
        <v-flex xs12 sm6 md4 px-3>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="
              refText.ADMINUSERS !== undefined
                ? refText.ADMINUSERS.search.contents
                : 'Sin label'
            "
            single-line
            hide-details
            clearable
            clear-icon="mdi-close"
          ></v-text-field>
        </v-flex>
        <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
          <v-dialog
            v-model="dialog"
            max-width="800px"
            content-class="dlgNewEditItem"
          >
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" v-on="on" class="button">
                <div class="iconnew">
                  <v-icon>mdi-account</v-icon>
                </div>
                {{
                  refText.ADMINUSERS !== undefined
                    ? refText.ADMINUSERS.new_item.contents
                    : 'Sin label'
                }}
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <template v-if="editedItem._id">
                      <v-flex xs12 md4>
                        <label for="createdAt">{{
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.created.contents
                            : 'Sin label'
                        }}</label>
                        <div name="createdAt">
                          {{ getFormat(editedItem.createdAt) }}
                        </div>
                      </v-flex>
                      <v-flex xs12 md4>
                        <label for="updatedAt">{{
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.updated.contents
                            : 'Sin label'
                        }}</label>
                        <div name="updatedAt">
                          {{ getFormat(editedItem.updatedAt) }}
                        </div>
                      </v-flex>
                      <v-flex xs12 md4>
                        <label for="verified">{{
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.verified.contents
                            : 'Sin label'
                        }}</label>
                        <div
                          name="verified"
                          v-html="trueFalse(editedItem.verified)"
                        ></div>
                      </v-flex>
                    </template>
                    <v-flex xs12 md6>
                      <v-text-field
                        id="username"
                        name="username"
                        v-model="editedItem.username"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.username.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.username.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        id="email"
                        name="email"
                        type="email"
                        v-model="editedItem.email"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.email.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.email.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <template v-if="!editedItem._id">
                      <v-flex xs12 md6>
                        <v-text-field
                          id="password"
                          name="password"
                          type="password"
                          :label="
                            refText.ADMINUSERS !== undefined
                              ? refText.ADMINUSERS.password.contents
                              : 'Sin label'
                          "
                          v-model="editedItem.password"
                          :data-vv-as="
                            refText.ADMINUSERS !== undefined
                              ? refText.ADMINUSERS.password.contents
                              : 'Sin label'
                          "
                          key="password"
                          ref="password"
                          autocomplete="off"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 md6>
                        <v-text-field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          :label="
                            refText.ADMINUSERS !== undefined
                              ? refText.ADMINUSERS.confirmPassword.contents
                              : 'Sin label'
                          "
                          v-model="editedItem.confirmPassword"
                          :data-vv-as="
                            refText.ADMINUSERS !== undefined
                              ? refText.ADMINUSERS.password.contents
                              : 'Sin label'
                          "
                          key="confirmPassword"
                          autocomplete="off"
                        ></v-text-field>
                      </v-flex>
                    </template>
                    <v-flex xs12 md6>
                      <v-select
                        clearable
                        id="role"
                        name="role"
                        v-model="editedItem.role"
                        :items="roles"
                        item-text="name"
                        item-value="value"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.role.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.role.contents
                            : 'Sin label'
                        "
                        class="inputRole"
                      ></v-select>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-text-field
                        id="firstname"
                        name="firstname"
                        type="firstname"
                        v-model="editedItem.firstname"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.firstname.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.firstname.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-text-field
                        id="secondname"
                        name="secondname"
                        type="secondname"
                        v-model="editedItem.secondname"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.secondname.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.secondname.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-text-field
                        id="firstsurname"
                        name="firstsurname"
                        type="firstsurname"
                        v-model="editedItem.firstsurname"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.firstsurname.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.firstsurname.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-text-field
                        id="secondsurname"
                        name="secondsurname"
                        type="secondsurname"
                        v-model="editedItem.secondsurname"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.secondsurname.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.secondsurname.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md6>
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
                              v-model="editedItem.date"
                              :label="
                                refText.ADMINUSERS !== undefined
                                  ? refText.ADMINUSERS.birthday_date.contents
                                  : 'Sin label'
                              "
                              prepend-icon="mdi-calendar"
                              readonly
                              clearable
                              v-bind="attrs"
                              v-on="on"
                              @click="prueba"
                            ></v-text-field>
                          </template>

                          <v-date-picker
                            ref="picker"
                            v-model="editedItem.date"
                            :maxValue="new Date().toISOString().substr(0, 10)"
                            minValue="1950-01-01"
                            :locale="localet"
                            @change="save"
                          ></v-date-picker>
                        </v-menu>
                      </template>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-text-field
                        id="nroidentificacion"
                        name="nroidentificacion"
                        type="nroidentificacion"
                        v-model="editedItem.nroidentificacion"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.nroidentificacion.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.nroidentificacion.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md2>
                      <v-autocomplete
                        class="code"
                        id="code"
                        name="code"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.code.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.code.contents
                            : 'Sin label'
                        "
                        v-model="editedItem.code"
                        :items="allCountryCode"
                        :no-data-text="$t('errors.NO_RESULTS_FOUND')"
                        autocomplete="off"
                      />
                    </v-flex>

                    <v-flex xs12 md4>
                      <v-text-field
                        id="myphone"
                        name="myphone"
                        type="myphone"
                        v-model="editedItem.myphone"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.myphone.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.myphone.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-autocomplete
                        id="country"
                        name="country"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.country.contents
                            : 'Sin label'
                        "
                        v-model="editedItem.country"
                        @change="this.changeCountry"
                        :items="allCountryName"
                        clearable
                        clear-icon="mdi-close"
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.country.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      />
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-autocomplete
                        id="state"
                        name="state"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.state.contents
                            : 'Sin label'
                        "
                        v-model="editedItem.state"
                        @change="this.changeState"
                        :items="CountryAllStates"
                        clearable
                        clear-icon="mdi-close"
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.state.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      />
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-autocomplete
                        id="city"
                        name="city"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.city.contents
                            : 'Sin label'
                        "
                        v-model="editedItem.city"
                        :items="StateAllCities"
                        clearable
                        clear-icon="mdi-close"
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.city.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      />
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-text-field
                        id="postalcode"
                        name="postalcode"
                        type="postalcode"
                        v-model="editedItem.postalcode"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.postalcode.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.postalcode.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-text-field
                        id="storename"
                        name="storename"
                        type="storename"
                        v-model="editedItem.storename"
                        :label="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.storename.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.storename.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-text-field
                        id="rif"
                        name="rif"
                        type="rif"
                        v-model="editedItem.rif"
                        :label="$t('users.headers.RIF')"
                        :data-vv-as="$t('users.headers.RIF')"
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red lighten3"
                  flat
                  @click="close"
                  class="btnCancel"
                  >{{
                    refText.ADMINUSERS !== undefined
                      ? refText.ADMINUSERS.cancel.contents
                      : 'Sin label'
                  }}</v-btn
                >
                <v-btn
                  color="yellow lighten3"
                  flat
                  @click="submit"
                  class="btnSave"
                  >{{
                    refText.ADMINUSERS !== undefined
                      ? refText.ADMINUSERS.save.contents
                      : 'Sin label'
                  }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
      <v-data-table
        must-sort
        :loading="dataTableLoading"
        :rows-per-page-text="
          refText.ADMINUSERS !== undefined
            ? refText.ADMINUSERS.rows_per_page.contents
            : 'Sin label'
        "
        :no-data-text="
          refText.ADMINUSERS !== undefined
            ? refText.ADMINUSERS.no_data.contents
            : 'Sin label'
        "
        :no-results-text="
          refText.ADMINUSERS !== undefined
            ? refText.ADMINUSERS.no_results.contents
            : 'Sin label'
        "
        :rows-per-page-items="[5, 10, 25]"
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        :total-items="totalItems"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="fill-height px-0">
            <v-layout class="justify-center">
              <v-tooltip top>
                <v-btn
                  icon
                  class="mx-0"
                  slot="activator"
                  @click="editItem(props.item)"
                >
                  <div class="iconedite">
                    <v-icon>mdi-pencil</v-icon>
                  </div>
                </v-btn>
                <span>{{
                  refText.ADMINUSERS !== undefined
                    ? refText.ADMINUSERS.edit.contents
                    : 'Sin label'
                }}</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  icon
                  class="mx-0"
                  slot="activator"
                  @click="deleteItem(props.item)"
                >
                  <div class="icondelete">
                    <v-icon class="">mdi-delete</v-icon>
                  </div>
                </v-btn>
                <span>{{
                  refText.ADMINUSERS !== undefined
                    ? refText.ADMINUSERS.delete.contents
                    : 'Sin label'
                }}</span>
              </v-tooltip>
            </v-layout>
          </td>
          <td>{{ props.item.username }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ roleName(props.item.role) }}</td>
          <td v-html="trueFalse(props.item.verified)"></td>
          <td>{{ props.item.firstname }}</td>
          <td>{{ props.item.secondname }}</td>
          <td>{{ props.item.firstsurname }}</td>
          <td>{{ props.item.secondsurname }}</td>
          <td>{{ props.item.date }}</td>
          <td>{{ props.item.nroidentificacion }}</td>
          <td>{{ props.item.code }}</td>
          <td>{{ props.item.myphone }}</td>
          <td>{{ props.item.country }}</td>
          <td>{{ props.item.state }}</td>
          <td>{{ props.item.city }}</td>
          <td>{{ props.item.postalcode }}</td>
          <td>{{ props.item.storename }}</td>
          <td>{{ props.item.rif }}</td>
          <td>{{ getFormat(props.item.createdAt) }}</td>
          <td>{{ getFormat(props.item.updatedAt) }}</td>
        </template>
        <template v-slot:pageText="props">
          {{ props.pageStart }} - {{ props.pageStop }}
          {{
            refText.ADMINUSERS !== undefined
              ? refText.ADMINUSERS.of.contents
              : 'Sin label'
          }}
          {{ props.itemsLength }}
        </template>
        <template v-slot:no-data>{{
          refText.ADMINUSERS !== undefined
            ? refText.ADMINUSERS.no_data.contents
            : 'Sin label'
        }}</template>
        <template v-slot:no-results>{{
          refText.ADMINUSERS !== undefined
            ? refText.ADMINUSERS.no_results.contents
            : 'Sin label'
        }}</template>
      </v-data-table>
      <SuccessMessage />
    </div>
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

import { mapActions } from 'vuex'
import plumessag from '@/plugins/plumessag'
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('users.TITLE')} - %s`
    }
  },
  data() {
    return {
      refText: '',
      idcomponent: 'ADMINUSERS',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      menu: false,
      localet: 'es',
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: [
        'username'
        /* ,  'email',
        // 'password',
        'role',
        'firstname',
        'secondname',
        'firstsurname',
        'secondsurname',
        'birthayte',
        'nroidentificacion',
        'code',
        'myphone',
        'country',
        'state',
        'city',
        'emapostalcode',
        'storename',
        'rif'*/
      ]
    }
  },
  computed: {
    getJson() {
      return this.$store.state.messages.message
    },
    getNameComponent() {
      return this.$store.state.messages.name_components
    },
    roles() {
      return [
        { name: this.$t('roles.ADMIN'), value: 'admin' },
        { name: this.$t('roles.STORE'), value: 'store' },
        { name: this.$t('roles.USER'), value: 'user' }
      ]
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
      // console.log(`STTSelect ${this.$store.state.allid.allstatesContry}`)
      return this.$store.state.allid.allstatesContry
    },
    StateAllCities() {
      return this.$store.state.allid.allcitiesStates
    },
    formTitle() {
      return this.editedItem._id
        ? this.refText.ADMINUSERS.edit_item.contents
        : this.refText.ADMINUSERS.new_item.contents
    },
    headers() {
      return [
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.actions.contents
              : 'Sin label',
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.username.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'usermane'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.email.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'email'
        },
        /* {
          text: this.$i18n.t('users.PASSWORD'),
          align: 'left',
          sortable: true,
          value: 'password'
        },*/
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.role.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'role'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.updated.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'verified'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.firstname.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'firstname'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.secondname.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'secondname'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.firstsurname.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'firstsurname'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.secondsurname.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'secondsurname'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.birthday_date.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'date'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.nroidentificacion.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'nroidentificacion'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.code.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'code'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.myphone.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'myphone'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.country.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'country'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.state.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'state'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? refText.ADMINUSERS.city.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'city'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.postalcode.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'postalcode'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? refText.ADMINUSERS.storename.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'storename'
        },
        {
          text: this.$i18n.t('users.headers.RIF'),
          align: 'left',
          sortable: true,
          value: 'rif'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.created.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text:
            this.refText.ADMINUSERS !== undefined
              ? this.refText.ADMINUSERS.updated.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.adminUsers.users
    },
    totalItems() {
      return this.$store.state.adminUsers.totalUsers
    }
  },
  watch: {
    dialog(value) {
      return value ? true : this.close()
    },
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.getUsers(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          this.dataTableLoading = false
        }
      },
      deep: true
    },
    search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    }
  },
  methods: {
    ...mapActions([
      'getAllCoutry',
      'getCountryAllStates',
      'getStateAllCities',
      'getUsers',
      'editUser',
      'saveUser',
      'deleteUser',
      'getText_component',
      'name_component'
    ]),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'ddd, MMMM D YYYY, h:mm a')
    },
    roleName(value) {
      switch (value) {
        case 'admin':
          return this.$t('roles.ADMIN')
        case 'store':
          return this.$t('roles.STORE')
        case 'user':
          return this.$t('roles.USER')
        default:
          break
      }
      return this.refText.ADMINUSERS !== undefined
        ? this.refText.ADMINUSERS.not_found.contents
        : 'Sin label'
    },
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
    },
    async changeCountry() {
      // console.log('Entrando a changeCountry.')
      await this.getCountryAllStates({
        country: this.editedItem.country
      })
    },
    async changeState() {
      // console.log('Entrando a changeState.')
      this.getStateAllCities({
        state: this.editedItem.state
      })
    },

    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getUsers(
          buildPayloadPagination(this.pagination, this.buildSearch())
        )
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    buildSearch() {
      return this.search
        ? { query: this.search, fields: this.fieldsToSearch.join(',') }
        : {}
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.getCountryAllStates({
        country: this.editedItem.country
      })
      this.getStateAllCities({
        state: this.editedItem.state
      })
    },
    async deleteItem(item) {
      try {
        const response = await this.$confirm(
          this.refText.ADMINUSERS !== undefined
            ? this.refText.ADMINUSERS.do_you_really_want_to_delete_this_item
                .contents
            : 'Sin label',
          {
            title:
              this.refText.ADMINUSERS !== undefined
                ? this.refText.ADMINUSERS.warning.contents
                : 'Sin label',
            buttonTrueText:
              this.refText.ADMINUSERS !== undefined
                ? this.refText.ADMINUSERS.delete.contents
                : 'Sin label',
            buttonFalseText:
              this.refText.ADMINUSERS !== undefined
                ? this.refText.ADMINUSERS.cancel.contents
                : 'Sin label',
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'yellow lighten3'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteUser(item._id)
          await this.getUsers(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
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
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async submit() {
      try {
        // const valid = await this.$validator.validateAll()
        if (true) {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            await this.editUser(this.editedItem)
            await this.getUsers(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveUser({
              username: this.editedItem.username,
              email: this.editedItem.email,
              password: this.editedItem.password,
              role: this.editedItem.role,
              firstname: this.editedItem.firstname,
              secondname: this.editedItem.secondname,
              firstsurname: this.editedItem.firstsurname,
              secondsurname: this.editedItem.secondsurname,
              date: this.editedItem.date,
              nroidentificacion: this.editedItem.nroidentificacion,
              code: this.editedItem.code,
              myphone: this.editedItem.myphone,
              country: this.editedItem.country,
              state: this.editedItem.state,
              city: this.editedItem.city,
              postalcode: this.editedItem.postalcode,
              storename: this.editedItem.storename,
              rif: this.editedItem.rif
            })
            await this.getUsers(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          }
          this.close()
          return
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
      }
    }
  },
  async mounted() {
    await this.name_component(this.idcomponent)
    await this.getAllCoutry()
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
