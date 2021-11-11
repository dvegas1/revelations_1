<template>
  <div class="container_search flex">
    <v-flex flex xs12 px-3>
      <div class="template_resultSearch">
        <div>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="$t('dataTable.SEARCH')"
            single-line
            hide-details
            clearable
            clear-icon="mdi-close"
          ></v-text-field>
          <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
            <v-dialog
              v-model="dialog"
              max-width="800px"
              content-class="dlgNewEditItem"
            >
            </v-dialog>
          </v-flex>
          <v-data-table
            must-sort
            :loading="dataTableLoading"
            :rows-per-page-text="$t('dataTable.ROWS_PER_PAGE')"
            :no-data-text="$t('dataTable.NO_DATA')"
            :no-results-text="$t('dataTable.NO_RESULTS')"
            :rows-per-page-items="[5, 10, 25]"
            :headers="headers"
            :items="items"
            :pagination.sync="pagination"
            :total-items="totalItems"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td class="fill-height px-0"></td>
              <td>{{ roleName(props.item.role) }}</td>
            </template>
            <template v-slot:pageText="props">
              {{ props.pageStart }} - {{ props.pageStop }}
              {{ $t('dataTable.OF') }}
              {{ props.itemsLength }}
            </template>
            <template v-slot:no-data>{{ $t('dataTable.NO_DATA') }}</template>
            <template v-slot:no-results>{{
              $t('dataTable.NO_RESULTS')
            }}</template>
          </v-data-table>
        </div>
      </div>
    </v-flex>
  </div>
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

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('users.TITLE')} - %s`
    }
  },
  data() {
    return {
      searchInput: '',
      dataTableLoading: true,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['name', 'email', 'role', 'city', 'country', 'phone']
    }
  },
  computed: {
    roles() {
      return [
        { name: this.$t('roles.ADMIN'), value: 'admin' },
        { name: this.$t('roles.USER'), value: 'user' }
      ]
    },
    allCities() {
      return this.$store.state.cities.allCities
    },
    formTitle() {
      return this.editedItem._id
        ? this.$t('dataTable.EDIT_ITEM')
        : this.$t('dataTable.NEW_ITEM')
    },
    headers() {
      return [{}]
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
      'getAllCities',
      'getUsers',
      'editUser',
      'saveUser',
      'deleteUser'
    ]),
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'ddd, MMMM D YYYY, h:mm a')
    },
    roleName(value) {
      return value === 'admin' ? this.$t('roles.ADMIN') : this.$t('roles.USER')
    },
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
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
    },
    async deleteItem(item) {
      try {
        const response = await this.$confirm(
          this.$t('common.DO_YOU_REALLY_WANT_TO_DELETE_THIS_ITEM'),
          {
            title: this.$t('common.WARNING'),
            buttonTrueText: this.$t('common.DELETE'),
            buttonFalseText: this.$t('common.CANCEL'),
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
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async save() {
      try {
        const valid = await this.$validator.validateAll()
        if (valid) {
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
              name: this.editedItem.name,
              email: this.editedItem.email,
              password: this.editedItem.password,
              role: this.editedItem.role,
              phone: this.editedItem.phone,
              city: this.editedItem.city,
              country: this.editedItem.country
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
    await this.getAllCities()
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
