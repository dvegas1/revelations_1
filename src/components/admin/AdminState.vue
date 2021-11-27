<style lang="css" src="./../../app/css/admin.css"></style>

<template>
  <v-container fluid>
    <div>
      <v-layout wrap>
        <v-flex xs12 sm12 md4 mt-3 pl-4>
          <v-toolbar-title>{{
            refText.ADMINSTATE !== undefined
              ? refText.ADMINSTATE.title.contents
              : 'Sin label'
          }}</v-toolbar-title>
        </v-flex>
        <v-flex xs12 sm6 md4 px-3>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="
              refText.ADMINSTATE !== undefined
                ? refText.ADMINSTATE.search.contents
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
            max-width="500px"
            content-class="dlgNewEditItem"
          >
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" v-on="on" class="button">
                <div class="iconnew">
                  <v-icon>mdi-map</v-icon>
                </div>
                {{
                  refText.ADMINSTATE !== undefined
                    ? refText.ADMINSTATE.new_item.contents
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
                      <v-flex xs12 md6>
                        <label for="createdAt">{{
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.created.contents
                            : 'Sin label'
                        }}</label>
                        <div name="createdAt">
                          {{ getFormat(editedItem.createdAt) }}
                        </div>
                      </v-flex>
                      <v-flex xs12 md6>
                        <label for="updatedAt">{{
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.updated.contents
                            : 'Sin label'
                        }}</label>
                        <div name="updatedAt">
                          {{ getFormat(editedItem.updatedAt) }}
                        </div>
                      </v-flex>
                    </template>
                    <v-flex xs12>
                      <v-autocomplete
                        id="status"
                        name="status"
                        :label="
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.status.contents
                            : 'Sin label'
                        "
                        v-model="editedItem.status"
                        :items="allstatus"
                        clearable
                        clear-icon="mdi-close"
                        :no-data-text="
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.no_results_found.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.status.contents
                            : 'Sin label'
                        "
                        disable="'required'"
                        autocomplete="off"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="state"
                        name="state"
                        v-model="editedItem.state"
                        :label="
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.state.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.state.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="stateID"
                        name="stateID "
                        v-model="editedItem.stateID"
                        :label="
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.state_id.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINSTATE !== undefined
                            ? refText.ADMINSTATE.state_id.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                      <v-flex xs12>
                        <v-autocomplete
                          id="countryID"
                          name="countryID"
                          :label="
                            refText.ADMINSTATE !== undefined
                              ? refText.ADMINSTATE.country_id.contents
                              : 'Sin label'
                          "
                          v-model="editedItem.countryID"
                          :items="allCountryID"
                          clearable
                          clear-icon="mdi-close"
                          :no-data-text="
                            refText.ADMINSTATE !== undefined
                              ? refText.ADMINSTATE.no_results_found.contents
                              : 'Sin label'
                          "
                          :data-vv-as="
                            refText.ADMINSTATE !== undefined
                              ? refText.ADMINSTATE.country_id.contents
                              : 'Sin label'
                          "
                          disable="'required'"
                          autocomplete="off"
                        />
                      </v-flex>
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
                    refText.ADMINSTATE !== undefined
                      ? refText.ADMINSTATE.cancel.contents
                      : 'Sin label'
                  }}</v-btn
                >
                <v-btn
                  color="yellow lighten3"
                  flat
                  @click="save"
                  class="btnSave"
                  >{{
                    refText.ADMINSTATE !== undefined
                      ? refText.ADMINSTATE.save.contents
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
          refText.ADMINSTATE !== undefined
            ? refText.ADMINSTATE.rows_per_page.contents
            : 'Sin label'
        "
        :no-data-text="
          refText.ADMINSTATE !== undefined
            ? refText.ADMINSTATE.no_data.contents
            : 'Sin label'
        "
        :no-results-text="
          refText.ADMINSTATE !== undefined
            ? refText.ADMINSTATE.no_results.contents
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
                <span>{{ $t('dataTable.EDIT') }}</span>
              </v-tooltip>
              <v-tooltip top>
                <v-btn
                  icon
                  class="mx-0"
                  slot="activator"
                  @click="deleteItem(props.item)"
                >
                  <div class="icondelete">
                    <v-icon>mdi-delete</v-icon>
                  </div>
                </v-btn>
                <span>{{
                  this.refText.ADMINSTATE !== undefined
                    ? this.refText.ADMINSTATE.delete.contents
                    : 'Sin label'
                }}</span>
              </v-tooltip>
            </v-layout>
          </td>
          <td>{{ props.item.status }}</td>
          <td>{{ props.item.state }}</td>
          <td>{{ props.item.stateID }}</td>
          <td>{{ props.item.countryID }}</td>
          <td>{{ getFormat(props.item.createdAt) }}</td>
          <td>{{ getFormat(props.item.updatedAt) }}</td>
        </template>
        <template v-slot:pageText="props">
          {{ props.pageStart }} - {{ props.pageStop }}
          {{
            refText.ADMINSTATE !== undefined
              ? refText.ADMINSTATE.of.contents
              : 'Sin label'
          }}
          {{ props.itemsLength }}
        </template>
        <template v-slot:no-data>{{
          refText.ADMINSTATE !== undefined
            ? refText.ADMINSTATE.no_data.contents
            : 'Sin label'
        }}</template>
        <template v-slot:no-results>{{
          refText.ADMINSTATE !== undefined
            ? refText.ADMINSTATE.no_results.contents
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
      titleTemplate: `${this.$t('state.TITLE')} - %s`
    }
  },
  data() {
    return {
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['country'],
      refText: '',
      idcomponent: 'ADMINSTATE'
    }
  },
  computed: {
    getJson() {
      return this.$store.state.messages.message
    },
    formTitle() {
      return this.editedItem._id
        ? this.refText.ADMINSTATE.edit_item.contents
        : this.refText.ADMINSTATE.new_item.contents
    },
    headers() {
      return [
        {
          text: this.refText.ADMINSTATE.actions.contents,
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text: this.refText.ADMINSTATE.status.contents,
          align: 'left',
          sortable: true,
          value: 'status'
        },
        {
          text: this.refText.ADMINSTATE.state.contents,
          align: 'left',
          sortable: true,
          value: 'state'
        },
        {
          text: this.refText.ADMINSTATE.state_id.contents,
          align: 'left',
          sortable: true,
          value: 'stateID'
        },
        {
          text: this.refText.ADMINSTATE.country_id.contents,
          align: 'left',
          sortable: true,
          value: 'countryID'
        },
        {
          text: this.refText.ADMINSTATE.created.contents,
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: this.refText.ADMINSTATE.updated.contents,
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.adminState.states
    },
    totalItems() {
      return this.$store.state.adminState.totalStates
    },
    allCountryID() {
      return this.$store.state.allid.allCountryID
    },
    allstatus() {
      return this.$store.state.status.allstatus
    }
  },
  status: {
    get() {
      switch (this.$store.state.status.status) {
        case 'true':
          return 'ACTIVADO'

        case 'false':
          return 'DESACTIVADO'

        default:
          break
      }
      return 'false'
    },
    set(value) {
      const data = {
        key: 'status',
        value
      }
      this.addStatusData(data)
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
          await this.getState(
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
    async search() {
      clearTimeout(this.delayTimer)
      this.delayTimer = setTimeout(() => {
        this.doSearch()
      }, 400)
    }
  },
  methods: {
    ...mapActions([
      'getText_component',
      'name_component',
      'getState',
      'editState',
      'saveState',
      'deleteState',
      'addStatusData',
      'getAllID'
    ]),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'ddd, MMMM D YYYY, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getState(
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
    },
    async deleteItem(item) {
      try {
        const response = await this.$confirm(
          this.refText.ADMINSTATE !== undefined
            ? this.refText.ADMINSTATE.do_you_really_want_to_delete_this_item
                .contents
            : 'Sin label',
          {
            title:
              this.refText.ADMINSTATE !== undefined
                ? this.refText.ADMINSTATE.warning.contents
                : 'Sin label',
            buttonTrueText:
              this.refText.ADMINSTATE !== undefined
                ? this.refText.ADMINSTATE.delete.contents
                : 'Sin label',
            buttonFalseText:
              this.refText.ADMINSTATE !== undefined
                ? this.refText.ADMINSTATE.cancel.contents
                : 'Sin label',
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'yellow lighten3'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteState(item._id)
          await this.getState(
            buildPayloadPagination(this.pagination, this.buildSearch())
          )
          this.dataTableLoading = false
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async save() {
      try {
        // const valid = await this.$validator.validateAll()
        if (true) {
          this.dataTableLoading = true

          switch (this.editedItem.status) {
            case 'ACTIVADO':
              console.log(`ESTATUS ACTIVO ${this.editedItem.status}`)
              this.editedItem.status = 'true'
              break
            case 'DESACTIVADO':
              console.log(`ESTATUS DESACTIVADO ${this.editedItem.status}`)
              this.editedItem.status = 'false'
              break
            default:
              console.error('No se ha seleccionado un estatus.')
              break
          }

          // Updating item
          if (this.editedItem._id) {
            await this.editState(this.editedItem)
            await this.getState(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item

            await this.saveState({
              status: this.editedItem.status,
              state: this.editedItem.state,
              stateID: this.editedItem.stateID,
              countryID: this.editedItem.countryID
            })
            await this.getState(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          }
          this.close()
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
    await this.getAllID()
    this.getNameComponent()
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
