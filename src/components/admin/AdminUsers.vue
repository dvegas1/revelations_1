<style lang="css" src="./../../app/css/admin.css"></style>

<template>
  <v-container fluid class="">
    <div>
      <v-layout wrap>
        <v-flex xs12 sm6 md4 px-3>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="
              refText.ADMINUSERS !== undefined
                ? refText.ADMINUSERS.search.contents
                : 'Busqueda'
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
            content-class="dlgNewEditItem "
            class="backmultiPand"
          >
            <v-card>
              <v-card-title class="darken">
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
                            : 'Creado'
                        }}</label>
                        <div name="createdAt">
                          {{ getFormat(editedItem.createdAt) }}
                        </div>
                      </v-flex>
                      <v-flex xs12 md4>
                        <label for="updatedAt">{{
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.updated.contents
                            : 'Actualizado'
                        }}</label>
                        <div name="updatedAt">
                          {{ getFormat(editedItem.updatedAt) }}
                        </div>
                      </v-flex>
                      <v-flex xs12 md4>
                        <label for="verified">{{
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.verified.contents
                            : 'Verificado'
                        }}</label>
                        <div
                          name="verified"
                          v-html="trueFalse(editedItem.verified)"
                        ></div>
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
                            : 'Rol'
                        "
                        :data-vv-as="
                          refText.ADMINUSERS !== undefined
                            ? refText.ADMINUSERS.role.contents
                            : 'Rol'
                        "
                        class="inputRole"
                      ></v-select>
                    </v-flex>
                    <v-flex xs12 md6>
                      <v-text-field
                        id="credentialuser"
                        name="credentialuser"
                        v-model="editedItem.credentialuser"
                        label="Credencial"
                        data-vv-as="Credencial"
                        autocomplete="off"
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="alert" flat @click="close" class="btnCancel">{{
                  refText.ADMINUSERS !== undefined
                    ? refText.ADMINUSERS.cancel.contents
                    : 'CANCELAR'
                }}</v-btn>
                <v-btn color="" flat @click="submit" class="primary">{{
                  refText.ADMINUSERS !== undefined
                    ? refText.ADMINUSERS.save.contents
                    : 'CANCELAR'
                }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
            <v-dialog
              v-model="dialog_eliminar"
              max-width="500px"
              content-class="dlgNewEditItem"
            >
              <v-card>
                <v-card-title class="darken">
                  <span class="headline ">Desea eliminar este invitado ?</span>
                </v-card-title>
                <v-card-actions class="transparent">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="alert"
                    flat
                    @click="close_delete"
                    class="btnCancel"
                    >{{ 'Cancelar' }}</v-btn
                  >
                  <v-btn
                    color=""
                    flat
                    @click="confirm_eliminar()"
                    class="primary"
                    >{{ 'Aceptar' }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-flex>
        </v-flex>
        <v-flex xs12 sm6 md4 px-3>
          <v-btn color="primary" class="primary right" @click="dialog = true">
            <div class="iconnew">
              <v-icon>mdi-account</v-icon>
            </div>
            {{
              refText.ADMINUSERS != undefined
                ? refText.ADMINUSERS.new_item.contents
                : 'NUEVO'
            }}
          </v-btn>
        </v-flex>
      </v-layout>
      <v-data-table
        must-sort
        :loading="dataTableLoading"
        :rows-per-page-text="
          refText.ADMINUSERS !== undefined
            ? refText.ADMINUSERS.rows_per_page.contents
            : 'Registro por pagina'
        "
        :no-data-text="
          refText.ADMINUSERS !== undefined
            ? refText.ADMINUSERS.no_data.contents
            : 'Sin registros'
        "
        :no-results-text="
          refText.ADMINUSERS !== undefined
            ? refText.ADMINUSERS.no_results.contents
            : 'Sin registros'
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
            <v-layout
              v-if="!user(props.item.credentialuser)"
              class="justify-center"
            >
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
                <span>editar</span>
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
                    : 'ELIMINAR'
                }}</span>
              </v-tooltip>
            </v-layout>
            <v-layout v-else>
              <v-btn icon class="primary center" disabled slot="activator"
                >Yo
              </v-btn>
            </v-layout>
          </td>
          <td>{{ props.item._id }}</td>
          <td>{{ roleName(props.item.role) }}</td>
          <td style="text-align:left">{{ props.item.credentialuser }}</td>
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
import vaalid from '@/plugins/vaalidate'

export default {
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('users.TITLE')} - %s`
    }
  },
  data() {
    return {
      deletedItem: {},
      dialog_eliminar: false,
      refText: {},
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
        'credentialuser'
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
    notify() {
      return this.$store.state.peoples.notify
    },
    getJson() {
      return this.$store.state.messages.message
    },
    roles() {
      return [
        { name: this.$t('roles.ADMIN'), value: 'admin' },
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
      return this.$store.state.allid.allstatesContry
    },
    StateAllCities() {
      return this.$store.state.allid.allcitiesStates
    },
    formTitle() {
      if (this.editedItem._id != undefined) {
        return `id: ${this.editedItem._id}`
      }
      return 'Nuevo registro. '
    },
    headers() {
      return [
        {
          text: '',
          value: '',
          sortable: false,
          width: 100
        },
        {
          text: 'Id',
          value: '_id',
          sortable: false,
          width: 100
        },
        {
          text: 'Rol',
          value: 'role',
          sortable: false,
          width: 100
        },
        {
          text: 'Clave',
          value: 'credentialuser',
          sortable: false,
          align: 'left',
          width: 100
        },
        {
          text: 'Creado',
          value: 'createdAt',
          sortable: true,
          width: 100
        },
        {
          text: 'Actualizado',
          value: 'updatedAt',
          sortable: true,
          width: 100
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
    notify() {
      this.openNotification(this.$store.state.peoples.notify)
      return this.$store.state.peoples.notify
    },
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
      'getUsers',
      'editUser_admin',
      'saveUser_admin',
      'deleteUser_adm',
      'getText_component',
      'name_component',
      'sendNotify',
      'user'
    ]),
    user(cred) {
      try {
        if (this.$store.state.auth.user.credentialuser == cred) {
          return true
        }
        return false
      } catch (error) {
        return false
      }
      return false
    },
    openNotification() {
      this.$vs.notification(this.notify)
    },
    close_delete() {
      this.dialog_eliminar = false
      setTimeout(() => {
        this.deletedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    async confirm_eliminar() {
      try {
        this.dataTableLoading = true
        this.dialog_eliminar = true
        await this.deleteUser_adm(this.deletedItem)
        this.dataTableLoading = false
        this.dialog_eliminar = false
      } catch (error) {
        this.dialog_eliminar = true
        this.dataTableLoading = false
      }
    },
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
      return this.$t('roles.USER')
    },
    trueFalse(value) {
      return value
        ? '<i aria-hidden="true" class="v-icon mdi mdi-check green--text" style="font-size: 16px;"></i>'
        : '<i aria-hidden="true" class="v-icon mdi mdi-close red--text" style="font-size: 16px;"></i>'
    },
    async changeState() {
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
    },
    async deleteItem(item) {
      try {
        this.deletedItem = Object.assign({}, item)
        this.dialog_eliminar = true
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
            await this.editUser_admin(this.editedItem)
            this.dataTableLoading = false
          } else {
            // Creating new item
            await this.saveUser_admin({
              role: this.editedItem.role,
              credentialuser: this.editedItem.credentialuser
            })
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
    this.getNameComponent()
    /*  this.sendNotify({
      square: true,
      duration: 60000,
      progress: 'auto',
      text: `adasdad ${this.idcomponent}`,
      color: 'warn',
      position: 'bottom-center',
      width: '50%'
    })*/
    /*
    this.sendNotify({
      square: true,
      duration: 600000,
      progress: 'auto',
      title: `<i class='bx bx-folder-open' >Advertencia </i> <i class="fas fa-check-circle"></i>`,
      text: `<p class='p_textNotify' >Usuario o contraseña errados. </p>`,
      color: 'success',
      position: 'bottom-center',
      width: '50%'
    })*/
    await this.name_component(this.idcomponent)
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
