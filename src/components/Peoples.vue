<style lang="css" src="./../app/css/Peoples.css"></style>

<template>
  <v-layout row wrap container_peoples>
    <v-container class="transparent">
      <div class="quierenCompartir__">
        <div class="da_compartir">Andrea y Darwin</div>
        <div class="da_queremos">
          Quieren compartir una noticia importante con ustedes.
        </div>
      </div>
      <form @submit.prevent="submit()">
        <!--   <div class="ninaOnino"></div>-->
        <div class="Sera_ninaOnino__ center">
          <p class="nino__">Niño</p>
          <p class="o__">Sera</p>
          <p class="nina__">Niña</p>
        </div>

        <div class="fechaHora">Sábado 11 de Diciembre a la 12:00 pm.</div>
        <div class=" justify-center text-xs-center d-block">
          <div class="lugar">
            Lugar: Miranda cúa, urb santa rosa calle nro 15 casa nro 113.
          </div>
        </div>
        <br /><br /><br />

        <v-flex d-flex flex-row mb-6 transparent class="container__formText1">
          <v-text-field
            name="nombre"
            id="nombre"
            type="text"
            v-model="revelations.nombre"
            :label="
              refText.REVELATIONS !== undefined
                ? refText.REVELATIONS.nombre.contents
                : 'Nombre'
            "
            :messages="['']"
            :error-messages="campoErrors(this.$v.revelations.nombre, 'nombre')"
            @keyup="osplug($v.revelations.nombre, 'nombre')"
            prepend-icon="mdi-email-outline"
            autocomplete="off"
          ></v-text-field>
          <v-text-field
            name="apellido"
            id="apellido"
            type="text"
            v-model="revelations.apellido"
            :label="
              refText.REVELATIONS !== undefined
                ? refText.REVELATIONS.apellido.contents
                : 'Apellido'
            "
            :messages="['']"
            :error-messages="
              campoErrors(this.$v.revelations.apellido, 'apellido')
            "
            @keyup="osplug($v.revelations.apellido, 'apellido')"
            prepend-icon="mdi-email-outline"
            autocomplete="off"
          ></v-text-field>
          <div class="containr_btn_add">
            <v-btn class="mx-2 add_people" dark color="" @click="save()">
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </div>
        </v-flex>

        <template>
          <v-container class="lista_invitado">
            <div mt-3 pl-4 center>
              <v-toolbar-title class="title_ls_invitado"
                >Invitado(s) agregado(s)</v-toolbar-title
              >
            </div>
            <v-flex px-3 flex-desc>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Buscar"
                single-line
                hide-details
                clearable
                clear-icon="mdi-close"
                class="btn_buscar hidden"
              ></v-text-field>
              <div class="btn_guardar text-right">
                <v-btn rounded color="primary">
                  Guardar
                </v-btn>
              </div>
            </v-flex>

            <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
              <v-dialog
                v-model="dialog"
                max-width="500px"
                content-class="dlgNewEditItem"
              >
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <template v-if="editedItem._id"> </template>
                        <v-flex xs12>
                          <v-text-field
                            id="nombre"
                            name="nombre"
                            v-model="editedItem.nombre"
                            label="Nombre"
                            data-vv-as="Nombre"
                            autocomplete="off"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            id="apellido"
                            name="apellido "
                            v-model="editedItem.apellido"
                            label="Apellido"
                            data-vv-as="Apellido"
                            autocomplete="off"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions class="transparent">
                    <v-spacer></v-spacer>
                    <v-btn
                      color="red lighten3"
                      flat
                      @click="close"
                      class="btnCancel"
                      >{{ 'Cancelar' }}</v-btn
                    >
                    <v-btn
                      color="yellow lighten3"
                      flat
                      @click="save"
                      class="btnSave"
                      >{{ 'Guardar' }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-data-table
              :loading="dataTableLoading"
              :no-data-text="$t('dataTable.NO_DATA')"
              :no-results-text="$t('dataTable.NO_RESULTS')"
              :headers="headers"
              :items="items"
              :options.sync="pagination"
              :items-per-page="3"
              :server-items-length="totalItems"
              class="elevation-1 transparent"
              :footer-props="{
                'items-per-page-text': $t('dataTable.ROWS_PER_PAGE'),
                'items-per-page-options': [3, 5, 10,20]
              }"
            >
              <template v-slot:items="props" class="transparent na">
                <td class="fill-height px-0">
                  <v-layout class="justify-center">
                    <v-tooltip top>
                      <v-btn
                        icon
                        class="Btnedit__"
                        slot="activator"
                        @click="editItem(props.item)"
                      >
                        <div class="iconedite">
                          <v-icon>mdi-pencil</v-icon>
                        </div>
                      </v-btn>
                      <span>{{ 'Mofificar' }}</span>
                    </v-tooltip>
                    <v-tooltip top>
                      <v-btn
                        icon
                        class="Btndelete__"
                        slot="activator"
                        @click="deleteItem(props.item)"
                      >
                        <div class="icondelete">
                          <v-icon>mdi-delete</v-icon>
                        </div>
                      </v-btn>
                      <span>{{ 'Eliminar' }}</span>
                    </v-tooltip>
                  </v-layout>
                </td>
                <!--<td>{{ props.item.status }}</td>-->
                <td>{{ props.item.nombre }}</td>
                <td>{{ props.item.apellido }}</td>
                <td><v-btn
                      flat
                      @click="close"
                      class="btn_votar"
                      >{{ 'VOTAR' }}</v-btn
                    ></td>
              </template>
              <template v-slot:pageText="props" class="transparent">
                {{ props.pageStart }} - {{ props.pageStop }}
                {{ 'dddd' }}
                {{ props.itemsLength }}
              </template>
              <template v-slot:no-data>{{
                'Sin invitado(s) agregado(s) hasta ahora.'
              }}</template>
              <template v-slot:no-results>{{ 'eeee' }}</template>
            </v-data-table>
          </v-container>
        </template>

        <SuccessMessage />
      </form>
    </v-container>
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
/* eslint-disable eqeqeq */ /* eslint-disable no-use-before-define */ /* eslint-disable no-empty */ /* eslint-disable no-irregular-whitespace */
/* eslint-disable no-constant-condition */ /* eslint-disable func-style */

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
import vaalid from '@/plugins/vaalidate'

export default {
  metaInfo() {
    return {
      title: 'Revelación',
      titleTemplate: `${this.$t('city.TITLE')} - %s`
    }
  },
  data() {
    return {
      revelations: {
        nombre: '',
        apellido: ''
      },
      refText: '',
      idcomponent: 'REVELATIONS',
      dataTableLoading: false,
      delayTimer: null,
      dialog: false,
      search: '',
      pagination: {},
      editedItem: {},
      defaultItem: {},
      fieldsToSearch: ['nombre']
    }
  },
  computed: {
    getRspPeopleSave() {
      return this.$store.state.peoples.RspsavePeople
    },
    getJson() {
      return this.$store.state.messages.message
    },

    getNameComponent() {
      return this.$store.state.messages.name_components
    },
    formTitle() {
      return this.editedItem._id
    },
    headers() {
      return [
        {
          text: '',
          value: '',
          sortable: false,
          width: 10
        },
        {
          text: 'NOMBRE',
          value: '_id',
          sortable: false,
          width: 5
        },
        {
          text: 'APELLIDO',
          align: 'left',
          sortable: true,
          value: 'status',
          width: 5
        },
        {
          text: 'VOTAR',
          sortable: false,
          value: 'Votar',
          width: 1
        }
      ]
    },
    items() {
      return this.$store.state.peoples.peoples
    },
    totalItems() {
      /* console.log(
        `responseall ${JSON.stringify(
          this.$store.state.adminCities.totalCities
        )}`
      ) */
      console.log(
        'this.$store.state.peoples.totalPeoples:' +
          this.$store.state.peoples.totalPeoples
      )
      return this.$store.state.peoples.totalPeoples
    },
    allStateID() {
      /* console.log(
        `allstaeid: ${JSON.stringify(this.$store.state.allid.allStateID)}`
      ) /**/
      return this.$store.state.allid.allStateID
    },
    /* stateID: {
      get() {
        return this.$store.state.allid.stateID
      },
      set(value) {
        const data = {
          key: 'stateID',
          value
        }
        this.getAllID(data)
      }
    }, /**/
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
    getCred() {
      console.log('Cambios en set_User:' + this.$store.state.peoples.set_User)
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
          await this.getPeoples({
            id: this.$store.state.auth.user.credentialuser
          })
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
      'getPeoples',
      'editPeople',
      'savePeople',
      'deletePeople',
      'addStatusData',
      'setCred',
      'getAllID'
    ]),
    async RspsavePeople() {
      console.log(
        'this.$store.state.peoples.RspsavePeople:' +
          this.$store.state.peoples.RspsavePeople
      )
      return this.$store.state.peoples.RspsavePeople
    },
    getCred() {
      console.log(
        'this.$store.state.peoples.set_User:' +
          this.$store.state.peoples.set_User
      )
      return this.$store.state.peoples.set_User
    },
    getFormat(date) {
      window.__localeId__ = this.$store.getters.locale
      return getFormat(date, 'ddd, MMMM D YYYY, h:mm a')
    },
    async doSearch() {
      try {
        this.dataTableLoading = true
        await this.getPeoples({
          id: this.$store.state.auth.user.credentialuser
        })
        this.dataTableLoading = false
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
      }
    },
    buildSearch() {
      return this.search ? this.search : '1234'
    },
    editItem(item) {
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem(item) {
      console.log('json:' + JSON.stringify(item))
      try {
        const response = await this.$confirm('Confirmar', {
          title: 'alert',
          buttonTrueText: 'Acceptar',
          buttonFalseText: 'Cancelar',
          buttonTrueColor: 'red lighten3',
          buttonFalseColor: 'yellow lighten3'
        })
        if (response) {
          this.dataTableLoading = true
          await this.deletePeople(item._id)
          await this.getPeoples({
            id: this.$store.state.auth.user.credentialuser
          })
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
        let data = []
        // const valid = await this.$validator.validateAll()
        this.dataTableLoading = true
        console.log('Guardando')
        console.log('editedItem ' + JSON.stringify(this.editedItem))
        // Updating item
        if (this.editedItem._id) {
          await this.editPeople(this.editedItem)
          await this.getPeoples({
            id: this.$store.state.auth.user.credentialuser
          })
          this.dataTableLoading = false
        } else {
          // Creating new item
          console.log('getCred:' + this.getCred())

          var peoples = [
            {
              nombre: this.revelations.nombre,
              apellido: this.revelations.apellido
            }
          ]

          console.log('validamos id en cache:' + this.$store.state.auth.user)

          console.log('peoples:' + JSON.stringify(peoples))

          if (this.$store.state.auth.user != undefined) {
            data = await this.savePeople({
              peoples: JSON.stringify(peoples),
              credentialuser: this.$store.state.auth.user
            })
          } else {
            data = await this.savePeople({
              peoples: JSON.stringify(peoples)
            })

            this.revelations.nombre = ''
            this.revelations.apellido = ''

            console.log('RspsavePeople:' + JSON.stringify(data))
          }
          this.dataTableLoading = false
        }
        this.close()

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
        console.error(error)
      } finally {
        this.revelations.nombre = ''
        this.revelations.apellido = ''
        this.dataTableLoading = false
      }
    }
  },
  validations: vaalid.validations,
  async mounted() {
    console.log("dddddddddddddddddddddddddddddddddddd "+ JSON.stringify(this.$store.state.auth))
    try {
      if (
        this.$store.state.auth.user != undefined ||
        this.$store.state.auth.user != null ||
        this.$store.state.auth.user != ''
      ) {
        await this.getPeoples({
          id: this.$store.state.auth.user.credentialuser
        })
      }
    } catch (error) {
      console.error(error)
    }

    await this.name_component(this.idcomponent)
    // await this.getAllID()
  }
}
</script>

<style>
table.v-table {
  max-width: none;
}
</style>
