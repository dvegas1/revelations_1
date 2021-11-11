<style lang="css" src="./../../app/css/admin.css"></style>

<template>
  <v-container fluid>
    <div>
      <v-layout wrap>
        <v-flex xs12 sm12 md4 mt-3 pl-4>
          <v-toolbar-title>{{
            refText.ADMINTEXT !== undefined
              ? refText.ADMINTEXT.title.contents
              : 'Sin label'
          }}</v-toolbar-title>
        </v-flex>
        <v-flex xs12 sm6 md4 px-3>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="
              refText.ADMINTEXT !== undefined
                ? refText.ADMINTEXT.search.contents
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
                  <v-icon>mdi-comment-text</v-icon>
                </div>

                {{
                  refText.ADMINTEXT !== undefined
                    ? refText.ADMINTEXT.new_item.contents
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
                          refText.ADMINTEXT !== undefined
                            ? refText.ADMINTEXT.created.contents
                            : 'Sin label'
                        }}</label>
                        <div name="createdAt">
                          {{ getFormat(editedItem.createdAt) }}
                        </div>
                      </v-flex>
                      <v-flex xs12 md6>
                        <label for="updatedAt">{{
                          $t('common.UPDATED')
                        }}</label>
                        <div name="updatedAt">
                          {{ getFormat(editedItem.updatedAt) }}
                        </div>
                      </v-flex>
                    </template>
                    <v-flex xs12>
                      <v-autocomplete
                        id="component"
                        name="component"
                        :label="
                          refText.ADMINTEXT !== undefined
                            ? refText.ADMINTEXT.component.contents
                            : 'Sin label'
                        "
                        v-model="editedItem.component"
                        :items="allcomponents"
                        clearable
                        clear-icon="mdi-close"
                        :no-data-text="
                          refText.ADMINTEXT !== undefined
                            ? refText.ADMINTEXT.no_results_found.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINTEXT !== undefined
                            ? refText.ADMINTEXT.component.contents
                            : 'Sin label'
                        "
                        disable="'required'"
                        autocomplete="off"
                      />
                    </v-flex>

                    <v-flex xs12>
                      <v-text-field
                        id="contents"
                        name="contents"
                        v-model="editedItem.contents"
                        :label="
                          refText.ADMINTEXT !== undefined
                            ? refText.ADMINTEXT.contens.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINTEXT !== undefined
                            ? refText.ADMINTEXT.contens.contents
                            : 'Sin label'
                        "
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        id="description"
                        name="description"
                        v-model="editedItem.description"
                        :label="
                          refText.ADMINTEXT !== undefined
                            ? refText.ADMINTEXT.description.contents
                            : 'Sin label'
                        "
                        :data-vv-as="
                          refText.ADMINTEXT !== undefined
                            ? refText.ADMINTEXT.description.contents
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
                    refText.ADMINTEXT !== undefined
                      ? refText.ADMINTEXT.cancel.contents
                      : 'Sin label'
                  }}</v-btn
                >
                <v-btn
                  color="yellow lighten3"
                  flat
                  @click="save"
                  class="btnSave"
                  >{{
                    refText.ADMINTEXT !== undefined
                      ? refText.ADMINTEXT.save.contents
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
          refText.ADMINTEXT !== undefined
            ? refText.ADMINTEXT.rows_per_page.contents
            : 'Sin label'
        "
        :no-data-text="
          refText.ADMINTEXT !== undefined
            ? refText.ADMINTEXT.no_data.contents
            : 'Sin label'
        "
        :no-results-text="
          refText.ADMINTEXT !== undefined
            ? refText.ADMINTEXT.no_results.contents
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
                  refText.ADMINTEXT !== undefined
                    ? refText.ADMINTEXT.edit.contents
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
                  refText.ADMINTEXT !== undefined
                    ? refText.ADMINTEXT.delete.contents
                    : 'Sin label'
                }}</span>
              </v-tooltip>
            </v-layout>
          </td>
          <td>{{ props.item._id }}</td>
          <td>{{ props.item.component }}</td>
          <td>{{ props.item.contents }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ getFormat(props.item.updatedAt) }}</td>
          <td>{{ getFormat(props.item.createdAt) }}</td>
        </template>
        <template v-slot:pageText="props">
          {{ props.pageStart }} - {{ props.pageStop }}
          {{
            refText.ADMINTEXT !== undefined
              ? refText.ADMINTEXT.of.contents
              : 'Sin label'
          }}
          {{ props.itemsLength }}
        </template>
        <template v-slot:no-data>{{
          refText.ADMINTEXT !== undefined
            ? refText.ADMINTEXT.no_data.contents
            : 'Sin label'
        }}</template>
        <template v-slot:no-results>{{
          refText.ADMINTEXT !== undefined
            ? refText.ADMINTEXT.no_results.contents
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
      titleTemplate: `${this.$t('contents.TITLE')} - %s`
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
      fieldsToSearch: ['component', '_id', 'description'],
      refText: '',
      idcomponent: 'ADMINTEXT'
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
        ? this.refText.ADMINTEXT.edit_item.contents
        : this.refText.ADMINTEXT.new_item.contents
    },
    allcomponents() {
      return this.$store.state.adminComponents.allcomponents
    },

    headers() {
      return [
        {
          text:
            this.refText.ADMINTEXT !== undefined
              ? this.refText.ADMINTEXT.actions.contents
              : 'Sin label',
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text:
            this.refText.ADMINTEXT !== undefined
              ? this.refText.ADMINTEXT.component.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: '_id'
        },
        {
          text:
            this.refText.ADMINTEXT !== undefined
              ? this.refText.ADMINTEXT.idcontents.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'component'
        },

        {
          text:
            this.refText.ADMINTEXT !== undefined
              ? this.refText.ADMINTEXT.search.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'contents'
        },
        {
          text:
            this.refText.ADMINTEXT !== undefined
              ? this.refText.ADMINTEXT.description.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'description'
        },
        {
          text:
            this.refText.ADMINTEXT !== undefined
              ? this.refText.ADMINTEXT.created.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'createdAt'
        },
        {
          text:
            this.refText.ADMINTEXT !== undefined
              ? this.refText.ADMINTEXT.updated.contents
              : 'Sin label',
          align: 'left',
          sortable: true,
          value: 'updatedAt'
        }
      ]
    },
    items() {
      return this.$store.state.adminText.text
    },
    totalItems() {
      return this.$store.state.adminText.totaltext
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
          await this.getText(
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
      'getText',
      'editText',
      'saveText',
      'deleteText',
      'getAllComponents'
    ]),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'ddd, MMMM D YYYY, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getText(
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
          this.refText.ADMINTEXT !== undefined
            ? this.refText.ADMINTEXT.do_you_really_want_to_delete_this_item
                .contents
            : 'Sin label',
          {
            title:
              this.refText.ADMINTEXT !== undefined
                ? this.refText.ADMINTEXT.warning.contents
                : 'Sin label',
            buttonTrueText:
              this.refText.ADMINTEXT !== undefined
                ? this.refText.ADMINTEXT.delete.contents
                : 'Sin label',
            buttonFalseText:
              this.refText.ADMINTEXT !== undefined
                ? this.refText.ADMINTEXT.cancel.contents
                : 'Sin label',
            buttonTrueColor: 'red lighten3',
            buttonFalseColor: 'yellow lighten3'
          }
        )
        if (response) {
          this.dataTableLoading = true
          await this.deleteText(item._id)
          await this.getText(
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
            await this.editText(this.editedItem)
            await this.getText(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveText({
              component: this.editedItem.component,
              contents: this.editedItem.contents,
              description: this.editedItem.description
            })
            await this.getText(
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
    await this.getAllComponents()
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
