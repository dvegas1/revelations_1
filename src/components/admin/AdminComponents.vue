<style lang="css" src="./../../app/css/admin.css"></style>

<template>
  <v-container fluid>
    <div>
      <v-layout wrap>
        <v-flex xs12 sm12 md4 mt-3 pl-4>
          <v-toolbar-title>{{
            this.refText.ADMINCOMPONENTS !== undefined
              ? this.refText.ADMINCOMPONENTS.title.contents
              : 'Sin label'
          }}</v-toolbar-title>
        </v-flex>
        <v-flex xs12 sm6 md4 px-3>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="
              this.refText.ADMINCOMPONENTS !== undefined
                ? this.refText.ADMINCOMPONENTS.search.contents
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
                  <v-icon>mdi-folder</v-icon>
                </div>
                {{
                  this.refText.ADMINCOMPONENTS !== undefined
                    ? this.refText.ADMINCOMPONENTS.new_item.contents
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
                          this.refText.ADMINCOMPONENTS !== undefined
                            ? this.refText.ADMINCOMPONENTS.created.contents
                            : 'Sin label'
                        }}</label>
                        <div name="createdAt">
                          {{ getFormat(editedItem.createdAt) }}
                        </div>
                      </v-flex>
                      <v-flex xs12 md6>
                        <label for="updatedAt">{{
                          this.refText.ADMINCOMPONENTS !== undefined
                            ? this.refText.ADMINCOMPONENTS.updated.contents
                            : 'Sin label'
                        }}</label>
                        <div name="updatedAt">
                          {{ getFormat(editedItem.updatedAt) }}
                        </div>
                      </v-flex>
                    </template>
                    <v-flex xs12>
                      <v-text-field
                        id="components"
                        name="components"
                        v-model="editedItem.components"
                        :label="
                          this.refText.ADMINCOMPONENTS !== undefined
                            ? this.refText.ADMINCOMPONENTS.component.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          this.refText.ADMINCOMPONENTS !== undefined
                            ? this.refText.ADMINCOMPONENTS.component.contents
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
                    this.refText.ADMINCOMPONENTS !== undefined
                      ? this.refText.ADMINCOMPONENTS.cancel.contents
                      : 'Sin label'
                  }}</v-btn
                >
                <v-btn
                  color="yellow lighten3"
                  flat
                  @click="save"
                  class="btnSave"
                  >{{
                    this.refText.ADMINCOMPONENTS !== undefined
                      ? this.refText.ADMINCOMPONENTS.save.contents
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
          this.refText.ADMINCOMPONENTS !== undefined
            ? this.refText.ADMINCOMPONENTS.rows_per_page.contents
            : 'Sin label'
        "
        :no-data-text="
          this.refText.ADMINCOMPONENTS !== undefined
            ? this.refText.ADMINCOMPONENTS.no_data.contents
            : 'Sin label'
        "
        :no-results-text="
          this.refText.ADMINCOMPONENTS !== undefined
            ? this.refText.ADMINCOMPONENTS.no_result.contents
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
                  this.refText.ADMINCOMPONENTS !== undefined
                    ? this.refText.ADMINCOMPONENTS.edit.contents
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
                  this.refText.ADMINCOMPONENTS !== undefined
                    ? this.refText.ADMINCOMPONENTS.delete.contents
                    : 'Sin label'
                }}</span>
              </v-tooltip>
            </v-layout>
          </td>
          <td>{{ props.item.components }}</td>
          <td>{{ getFormat(props.item.createdAt) }}</td>
          <td>{{ getFormat(props.item.updatedAt) }}</td>
        </template>
        <template v-slot:pageText="props">
          {{ props.pageStart }} - {{ props.pageStop }}
          {{
            this.refText.ADMINCOMPONENTS !== undefined
              ? this.refText.ADMINCOMPONENTS.of.contents
              : 'Sin label'
          }}
          {{ props.itemsLength }}
        </template>
        <template v-slot:no-data>{{
          this.refText.ADMINCOMPONENTS !== undefined
            ? this.refText.ADMINCOMPONENTS.no_data.contents
            : 'Sin label'
        }}</template>
        <template v-slot:no-results>{{
          this.refText.ADMINCOMPONENTS !== undefined
            ? this.refText.ADMINCOMPONENTS.no_result.contents
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
import { getFormat, buildPayloadPagination } from '@/utils/utils.js'
import plumessag from '@/plugins/plumessag'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('components.TITLE')} - %s`
    }
  },
  data() {
    return {
      refText: '',
      idcomponent: 'ADMINCOMPONENTS',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['components']
    }
  },
  computed: {
    getJson() {
      return this.$store.state.messages.message
    },
    formTitle() {
      return this.editedItem._id
    },
    headers() {
      return [
        {
          text:
            this.refText.ADMINCOMPONENTS !== undefined
              ? this.refText.ADMINCOMPONENTS.actions.contents
              : 'Sin label',
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text:
            this.refText.ADMINCOMPONENTS !== undefined
              ? this.refText.ADMINCOMPONENTS.component.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'components'
        },
        {
          text:
            this.refText.ADMINCOMPONENTS !== undefined
              ? this.refText.ADMINCOMPONENTS.created.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text:
            this.refText.ADMINCOMPONENTS !== undefined
              ? this.refText.ADMINCOMPONENTS.updated.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.adminComponents.components
    },
    totalItems() {
      return this.$store.state.adminComponents.totalComponents
    }
  },
  watch: {
    getCred() {
      return this.$store.state.peoples.set_User
    },
    getJson() {
      this.refText = this.$store.state.messages.message

      return this.$store.state.messages.message
    },
    dialog(value) {
      return value ? true : this.close()
    },
    pagination: {
      async handler() {
        try {
          this.dataTableLoading = true
          await this.getComponents(
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
      'getComponents',
      'editComponents',
      'saveComponents',
      'deleteComponents'
    ]),
    isEmptyObject(obj, name) {
      for (name in obj) {
        if (obj.hasOwnProperty(name)) {
          return false
        }
      }
      return true
    },
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'ddd, MMMM D YYYY, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getComponents(
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
          this.refText.ADMINCOMPONENTS !== undefined
            ? this.refText.ADMINCOMPONENTS
                .do_you_really_want_to_delete_this_item.contents
            : 'Sin label',
          {
            title:
              this.refText.ADMINCOMPONENTS !== undefined
                ? this.refText.ADMINCOMPONENTS.warning.contents
                : 'Sin label',
            buttonTrueText:
              this.refText.ADMINCOMPONENTS !== undefined
                ? this.refText.ADMINCOMPONENTS.delete.contents
                : 'Sin label',
            buttonFalseText:
              this.refText.ADMINCOMPONENTS !== undefined
                ? this.refText.ADMINCOMPONENTS.cancel.contents
                : 'Sin label',
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'yellow lighten3'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteComponents(item._id)
          await this.getComponents(
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
          // Updating item
          if (this.editedItem._id) {
            await this.editComponents(this.editedItem)
            await this.getComponents(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveComponents({
              components: this.editedItem.components
            })
            await this.getComponents(
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
    this.getNameComponent()
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
