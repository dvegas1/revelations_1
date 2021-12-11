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
                : 'Sin label'
            "
            single-line
            hide-details
            clearable
            clear-icon="mdi-close"
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm6 md4 px-3>
          <v-btn
            color="primary"
            class="primary right"
            @click="dialog_set_winner = true"
          >
            <div class="iconnew">
              <v-icon>mdi-account</v-icon>
            </div>
            {{
              refText.ADMINUSERS != undefined
                ? 'Elegir teams ganador'
                : 'Elegir teams ganador'
            }}
          </v-btn>
          <v-btn
            color="primary"
            class="primary right"
            @click="search_winner_()"
          >
            <div class="iconnew">
              <v-icon>mdi-account</v-icon>
            </div>
            {{
              refText.ADMINUSERS != undefined
                ? 'Buscar ganador'
                : 'Buscar ganador'
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
            <v-layout v-if="!props.item.winnerVerifid">
              <v-tooltip top>
                <v-btn
                  icon
                  class="mx-0"
                  slot="activator"
                  @click="confirm_winner(props.item)"
                >
                  <div class="secondary--text">
                    <v-icon>check</v-icon>
                  </div>
                </v-btn>
                <span>Confirmar</span>
              </v-tooltip>
              <v-tooltip top class="hidden">
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
                    : 'Sin label'
                }}</span>
              </v-tooltip>
            </v-layout>
            <v-layout v-else class="center primary--text">
            <v-tooltip top>
                <v-btn
                  icon
                  class="mx-0"
                  slot="activator"
                >
                  <div class="center">
                    <v-icon>fas fa-check-double</v-icon>
                  </div>
                </v-btn>
                <span>Confirmar</span>
              </v-tooltip>
               </v-layout>
          </td>
          <td>{{ props.item._id }}</td>
          <td>{{ props.item.nombre }}</td>
          <td>{{ props.item.apellido }}</td>
          <td>{{ props.item.autorizeVote }}</td>
          <td>{{ props.item.vote }}</td>
          <td>{{ props.item.team }}</td>
          <td>{{ props.item.winnerVerifid }}</td>
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
      <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
        <v-dialog
          v-model="dialog_set_winner"
          max-width="500px"
          content-class="dlgNewEditItem"
        >
          <v-card>
            <v-card-title class="darken">
              <span class="headline ">Eliger ganado.</span>
            </v-card-title>
            <v-container>
              <v-flex xs12 md6>
                <v-autocomplete
                  clearable
                  id="teams_winner"
                  name="teams_winner"
                  v-model="teams_winner"
                  :items="items_teams"
                  item-text="name"
                  item-value="value"
                  label="Teams"
                  data-vv-as="team"
                  class="inputRole"
                ></v-autocomplete>
              </v-flex>
            </v-container>
            <v-card-actions class="transparent">
              <v-spacer></v-spacer>
              <v-btn
                color="alert"
                flat
                @click="close_dialog_set_winner"
                class="btnCancel"
                >{{ 'Cancelar' }}</v-btn
              >
              <v-btn color="" flat @click="set_winner()" class="primary">{{
                'Aceptar'
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
      <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
        <v-dialog
          v-model="dialog_eliminar"
          max-width="500px"
          content-class="dlgNewEditItem"
        >
          <v-card>
            <v-card-title class="darken">
              <span class="headline ">Desea eliminar este ganador ?</span>
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
      <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
        <v-dialog
          v-model="dialog"
          max-width="800px"
          content-class="dlgNewEditItem "
          class=""
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
                      id="nombre"
                      name="nombre"
                      v-model="editedItem.nombre"
                      label="nombre"
                      data-vv-as="nombre"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field
                      id="apellido"
                      name="apellido"
                      v-model="editedItem.apellido"
                      label="apellido"
                      data-vv-as="apellido"
                      autocomplete="off"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-select
                      clearable
                      id="autorizeVote"
                      name="autorizeVote"
                      v-model="editedItem.autorizeVote"
                      :items="autorizeVotes"
                      item-text="name"
                      item-value="value"
                      label="Autorizado a votar ?"
                      data-vv-as="Autorizado a votar"
                      class="inputRole"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-select
                      clearable
                      id="vote"
                      name="vote"
                      v-model="editedItem.vote"
                      :items="items_vote"
                      item-text="name"
                      item-value="value"
                      label="Ya voto ?"
                      data-vv-as="vote"
                      class="inputRole"
                    ></v-select>
                  </v-flex>

                  <v-text-field
                    id="credentialuser"
                    name="credentialuser"
                    v-model="editedItem.credentialuser"
                    label="Clave de acceso"
                    @click:append="show1 = !show1"
                    :type="show1 ? 'text' : 'password'"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    prepend-icon="mdi-lock-outline"
                    ref="credentialuser"
                    autocomplete="off"
                  ></v-text-field>
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
              <v-btn color="primary" flat @click="submit" class="primary">{{
                refText.ADMINUSERS !== undefined
                  ? refText.ADMINUSERS.save.contents
                  : 'GUARDAR'
              }}</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
          <v-dialog
            v-model="dialog_confirm_winner"
            max-width="500px"
            content-class="dlgNewEditItem"
          >
            <v-card>
              <v-card-title class="darken">
                <span class="headline ">Desea confirmar este ganador ?</span>
              </v-card-title>
              <v-card-actions class="transparent">
                <v-spacer></v-spacer>
                <v-btn
                  color="alert"
                  flat
                  @click="close_dig_confirmWinner"
                  class="btnCancel"
                  >{{ 'Cancelar' }}</v-btn
                >
                <v-btn
                  color=""
                  flat
                  @click="confirmPeople_winner_()"
                  class="primary"
                  >{{ 'Aceptar' }}</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-flex>
      </v-flex>
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
      vote: false,
      dialog_set_winner: false,
      dialog_eliminar: false,
      dialog_confirm_winner: false,
      deletedItem: {},
      confirmItem: {},
      show1: false,
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
        'nombre'
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
    teams_winner: {
      get() {
        return this.$store.state.winner.config.teams_winner
      },
      set(value) {
        const data = {
          key: 'teams_winner',
          value
        }
        this.addConfigData(data)
      }
    },
    items_teams() {
      return [
        { name: 'SIN GANADOR', value: 'S/G' },
        { name: 'NIÑA', value: 'woman' },
        { name: 'NIÑO', value: 'man' }
      ]
    },
    items_vote() {
      return [
        { name: 'SI', value: true },
        { name: 'NO', value: false }
      ]
    },
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
    autorizeVotes() {
      return [
        { name: 'AUTORIZADO', value: true },
        { name: 'NO AUTORIZADO', value: false }
      ]
    },
    items_vote() {
      return [
        { name: 'SI', value: true },
        { name: 'NO', value: false }
      ]
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
          text: 'id',
          value: 'id',
          sortable: false,
          width: 100
        },
        {
          text: 'Nombre',
          value: 'nombre',
          sortable: false,
          width: 100
        },
        {
          text: 'Apellido',
          value: 'apellido',
          sortable: false,
          width: 100
        },
        {
          text: 'Autorizado votar ?',
          value: 'autorizeVote',
          sortable: false,
          width: 100
        },
        {
          text: 'Ya voto ?',
          value: 'vote',
          sortable: false,
          width: 100
        },
        {
          text: 'Team',
          value: 'team',
          sortable: false,
          width: 100
        },
        {
          text: 'Ganador verificado',
          value: 'winnerVerifid',
          sortable: true,
          width: 100
        },
        {
          text: 'Creado',
          value: 'createdAt',
          sortable: false,
          width: 100
        },
        {
          text: 'Actualizado',
          value: 'updatedAt',
          sortable: false,
          width: 100
        }
      ]
    },
    items() {
      return this.$store.state.winner.winner
    },
    totalItems() {
      return this.$store.state.winner.totalwinner
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
          await this.getWinner(
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
      'getWinner',
      'editPeople_adm',
      'createPeople',
      'deleteWinner_adm',
      'getText_component',
      'name_component',
      'sendNotify',
      'search_winner',
      'confirmPeople_winner',
      'getConfig',
      'addConfigData',
      'setTeamsWinner'
    ]),
    async People_winner_() {},
    async confirmPeople_winner_() {
      this.close_dig_confirmWinner()
      await this.confirmPeople_winner(this.confirmItem)
    },
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
    async search_winner_() {
      await this.search_winner()
    },
    async confirm_eliminar() {
      try {
        this.dataTableLoading = true
        this.dialog_eliminar = true

        await this.deleteWinner_adm(this.deletedItem)
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
    async changeCountry() {
      // console.log('Entrando a changeCountry.')
    },
    async changeState() {
      // console.log('Entrando a changeState.')
    },

    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getWinner(
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
    async set_winner() {
      let winner = { teams_winner: this.teams_winner }
      console.log('Seleccionando ganador.')

      await this.setTeamsWinner(winner)
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
    async confirm_winner(item) {
      try {
        this.confirmItem = Object.assign({}, item)
        this.dialog_confirm_winner = true
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dialog_confirm_winner = false
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
    close_delete() {
      this.dialog_eliminar = false
      setTimeout(() => {
        this.deletedItem = Object.assign({}, this.defaultItem)
      }, 300)
    },
    close_dialog_set_winner() {
      this.dialog_set_winner = false
      setTimeout(() => {
        this.dialog_set_winner = false
      }, 300)
    },
    close_dig_confirmWinner() {
      this.dialog_confirm_winner = false
      setTimeout(() => {
        this.confirmItem = Object.assign({}, this.defaultItem)
      }, 500)
    },
    async submit() {
      try {
        // const valid = await this.$validator.validateAll()
        if (true) {
          this.dataTableLoading = true
          // Updating item
          if (this.editedItem._id) {
            await this.editPeople_adm(this.editedItem)
            await this.getWinner(
              buildPayloadPagination(this.pagination, this.buildSearch())
            )
            this.dataTableLoading = false
          } else {
            // Creating new item

            await this.createPeople({
              nombre: this.editedItem.nombre,
              apellido: this.editedItem.apellido,
              autorizeVote: this.editedItem.autorizeVote,
              vote: this.editedItem.vote,
              team: this.editedItem.team,
              credentialuser: this.editedItem.credentialuser
            })
            this.dataTableLoading = false
          }
          this.close()
          resolve({})
        }
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
      }
    }
  },
  async mounted() {
    await this.getConfig()
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
