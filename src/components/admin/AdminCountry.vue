<style lang="css" src="./../../app/css/admin.css"></style>

<template>
  <v-container fluid>
    <div>
      <v-layout wrap>
        <v-flex xs12 sm12 md4 mt-3 pl-4>
          <v-toolbar-title>{{
            refText.ADMINCOUNTRY !== undefined
              ? refText.ADMINCOUNTRY.title.contents
              : 'Sin label'
          }}</v-toolbar-title>
        </v-flex>
        <v-flex xs12 sm6 md4 px-3>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="
              refText.ADMINCOUNTRY !== undefined
                ? refText.ADMINCOUNTRY.search.contents
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
                  <v-icon>mdi-flag</v-icon>
                </div>
                {{
                  refText.ADMINCOUNTRY !== undefined
                    ? refText.ADMINCOUNTRY.new_item.contents
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
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.created.contents
                            : 'Sin label'
                        }}</label>
                        <div name="createdAt">
                          {{ getFormat(editedItem.createdAt) }}
                        </div>
                      </v-flex>
                      <v-flex xs12 md6>
                        <label for="updatedAt">{{
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.updated.contents
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
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.status.contents
                            : 'Sin label'
                        "
                        v-model="editedItem.status"
                        :items="allstatus"
                        clearable
                        clear-icon="mdi-close"
                        :no-data-text="
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.no_results_found.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.status.contents
                            : 'Sin label'
                        "
                        disable="'required'"
                        autocomplete="off"
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="country"
                        name="country"
                        v-model="editedItem.country"
                        :label="
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.country.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.country.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="countryID"
                        name="countryID"
                        v-model="editedItem.countryID"
                        :label="
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.country_id.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.country_id.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="code"
                        name="code"
                        v-model="editedItem.code"
                        :label="
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.code.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINCOUNTRY !== undefined
                            ? refText.ADMINCOUNTRY.code.contents
                            : 'Sin label'
                        "
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
                    refText.ADMINCOUNTRY !== undefined
                      ? refText.ADMINCOUNTRY.cancel.contents
                      : 'Sin label'
                  }}</v-btn
                >
                <v-btn
                  color="yellow lighten3"
                  flat
                  @click="save"
                  class="btnSave"
                  >{{
                    refText.ADMINCOUNTRY !== undefined
                      ? refText.ADMINCOUNTRY.save.contents
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
          refText.ADMINCOUNTRY !== undefined
            ? refText.ADMINCOUNTRY.rows_per_page.contents
            : 'Sin label'
        "
        :no-data-text="
          refText.ADMINCOUNTRY !== undefined
            ? refText.ADMINCOUNTRY.no_data.contents
            : 'Sin label'
        "
        :no-results-text="
          refText.ADMINCOUNTRY !== undefined
            ? refText.ADMINCOUNTRY.no_results.contents
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
                  refText.ADMINCOUNTRY !== undefined
                    ? refText.ADMINCOUNTRY.edit.contents
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
                    <v-icon>mdi-delete</v-icon>
                  </div>
                </v-btn>
                <span>{{
                  refText.ADMINCOUNTRY !== undefined
                    ? refText.ADMINCOUNTRY.delete.contents
                    : 'Sin label'
                }}</span>
              </v-tooltip>
            </v-layout>
          </td>
          <td>{{ props.item.status }}</td>
          <td>{{ props.item.country }}</td>
          <td>{{ props.item.countryID }}</td>
          <td>{{ props.item.code }}</td>
          <td>{{ getFormat(props.item.createdAt) }}</td>
          <td>{{ getFormat(props.item.updatedAt) }}</td>
        </template>
        <template v-slot:pageText="props">
          {{ props.pageStart }} - {{ props.pageStop }}
          {{
            refText.ADMINCOUNTRY !== undefined
              ? refText.ADMINCOUNTRY.of.contents
              : 'Sin label'
          }}
          {{ props.itemsLength }}
        </template>
        <template v-slot:no-data>{{
          refText.ADMINCOUNTRY !== undefined
            ? refText.ADMINCOUNTRY.no_data.contents
            : 'Sin label'
        }}</template>
        <template v-slot:no-results>{{
          refText.ADMINCOUNTRY !== undefined
            ? refText.ADMINCOUNTRY.no_results.contents
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
      titleTemplate: `${this.$t('country.TITLE')} - %s`
    }
  },
  data() {
    return {
      refText: '',
      idcomponent: 'ADMINCOUNTRY',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['country']
    }
  },
  computed: {
    getJson() {
      return this.$store.state.messages.message
    },
    getNameComponent() {
      return this.$store.state.messages.name_components
    },
    formTitle() {
      return this.editedItem._id
        ? this.refText.ADMINCOUNTRY.edit_item.contents
        : this.refText.ADMINCOUNTRY.new_item.contents
    },
    headers() {
      return [
        {
          text: this.refText.ADMINCOUNTRY.actions.contents,
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text: this.refText.ADMINCOUNTRY.status.contents,
          align: 'left',
          sortable: true,
          value: 'status'
        },
        {
          text: this.refText.ADMINCOUNTRY.country.contents,
          align: 'left',
          sortable: true,
          value: 'country'
        },
        {
          text: this.refText.ADMINCOUNTRY.country_id.contents,
          align: 'left',
          sortable: true,
          value: 'countryID'
        },
        {
          text: this.refText.ADMINCOUNTRY.code.contents,
          align: 'left',
          sortable: true,
          value: 'code'
        },
        {
          text: this.refText.ADMINCOUNTRY.created.contents,
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text: this.refText.ADMINCOUNTRY.updated.contents,
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.adminCountry.countrys
    },
    totalItems() {
      return this.$store.state.adminCountry.totalcountrys
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
          await this.getCountry(
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
      'getCountry',
      'editCountry',
      'saveCountry',
      'deleteCountry',
      'addStatusData'
    ]),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'ddd, MMMM D YYYY, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getCountry(
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
          this.refText.ADMINCOUNTRY.do_you_really_want_to_delete_this_item
            .contents,
          {
            title: this.refText.ADMINCOUNTRY.warning.contents,
            buttonTrueText: this.refText.ADMINCOUNTRY.delete.contents,
            buttonFalseText: this.refText.ADMINCOUNTRY.cancel.contents,
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'yellow lighten3'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteCountry(item._id)
          await this.getCountry(
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
              this.editedItem.status = 'true'
              break
            case 'DESACTIVADO':
              this.editedItem.status = 'false'
              break
            default:
              console.error('No se ha seleccionado un estatus.')
              break
          }

          // Updating item
          if (this.editedItem._id) {
            await this.editCountry(this.editedItem)
            await this.getCountry(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveCountry({
              status: this.editedItem.status,
              country: this.editedItem.country,
              countryID: this.editedItem.countryID,
              code: this.editedItem.code
            })
            await this.getCountry(
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
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
