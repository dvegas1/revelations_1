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
        <div class="Sera_ninaOnino__ center">
          <p class="nino__">Niño</p>
          <p class="o__">O Será</p>
          <p class="nina__">Niña</p>
        </div>

        <div class="lugar">
          <div class="cont_flugar">
            <p class="title_lugar">Fecha:</p>
            <p class="dir_lugar">Sábado 11 de Diciembre a las 12:00 pm.</p>
          </div>
          <div class="cont_flugar">
            <p class="title_lugar">Lugar:</p>
            <p class="dir_lugar">
              Miranda cúa, urb santa rosa calle nro 15 casa nro 113.
            </p>
          </div>
        </div>

        <p class="title_note hidden" @click="hiddeModal">Nota:</p>
        <div v-show="this.hiddde_modal__" class="container_nota hidden">
          <p>
            Debe agregar cada invitado o acompañante por separadao, escribiendo
            su nombre y su apellido luego presionar el boton
            <v-icon class="plus_peoples">
              mdi-plus
            </v-icon>
          </p>
        </div>
        <p class="p_invt">Agregar invitado(s):</p>
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
            :class="{ 'is-invalid': $v.revelations.nombre.$error }"
            @input="$v.revelations.nombre.$touch()"
            @blur="$v.revelations.nombre.$touch()"
            :error-messages="
              campoErrors(
                this.$v.revelations.nombre,
                osplug($v.revelations.nombre, 'Nombre')
              )
            "
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
            @input="$v.revelations.apellido.$touch()"
            @blur="$v.revelations.apellido.$touch()"
            :error-messages="
              campoErrors(
                this.$v.revelations.apellido,
                osplug($v.revelations.apellido, 'Apellido')
              )
            "
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
            </v-flex>
            <!--DIALOGO VOTAR*/-->
            <v-flex xs12 sm6 md4 text-xs-right mb-2 mt-2 pr-2>
              <v-dialog
                v-model="dialogVote"
                max-width="100%"
                content-class="dlgNewEditItem"
              >
                <v-card>
                  <v-card-title class="darken">
                    <span class="headline ">Elegir team.</span>
                  </v-card-title>
                  <v-card-text class="center">
                    <v-container grid-list-md>
                      <template>
                        <div class="text-center">
                          <v-dialog v-model="dialog_vote_confirm" width="90%">
                            <template v-slot:activator="{ on, attrs }">
                            </template>

                            <v-card>
                              <v-card-title class="text-h5 darken">
                                Confirme team
                              </v-card-title>

                              <v-card-text class="text-left">
                                El team seleccionado no podra ser cambiado.
                              </v-card-text>

                              <v-divider></v-divider>

                              <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" text @click="vote">
                                  VOTAR
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </div>
                      </template>
                      <v-layout wrap>
                        <template v-if="voteItem._id">
                          <div class="container block center">
                            <div class="cont_nina">
                              <div class="titlesetNina"><p>Niña</p></div>
                              <div class="titlesetTeam"></div>

                              <div>
                                <img
                                  src="https://firebasestorage.googleapis.com/v0/b/fir-gps-f49b1.appspot.com/o/ef20e2f1e698e5d1be5c3535496382a1.png?alt=media&token=1ed21aa0-f95a-4bb5-bb1a-bb8fc12880c4"
                                  alt="Girl in a jacket"
                                  width="200"
                                  height="200"
                                  class="team_nina"
                                  @click="vote_confirm('woman')"
                                />
                              </div>
                            </div>
                            <div class="cont_nino">
                              <div class="titlesetNino"><p>Niño</p></div>
                              <div class="titlesetTeam"></div>
                              <div>
                                <img
                                  src="https://firebasestorage.googleapis.com/v0/b/fir-gps-f49b1.appspot.com/o/fda079d3da8765d15d6d248310fa92ed.png?alt=media&token=42bb8db5-556f-4352-b49a-cc3b7882e563"
                                  alt="Girl in a jacket"
                                  width="220px"
                                  height="220px"
                                  class="team_nino"
                                  @click="vote_confirm('man')"
                                />
                              </div>
                            </div>
                          </div>
                        </template>
                      </v-layout>
                    </v-container>
                  </v-card-text>
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
                    <span class="headline "
                      >Desea eliminar este invitado ?</span
                    >
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
                      @click="deleteItem1()"
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
                max-width="500px"
                content-class="dlgNewEditItem"
              >
                <v-card>
                  <v-card-title class="darken">
                    <span class="headline ">Modificar invitado.</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <template v-if="editedItem._id"> </template>
                        <v-flex xs12>
                          <v-text-field
                            id="editedItem_nombre"
                            name="editedItem_nombre"
                            v-model="editedItem.nombre"
                            label="Nombre"
                            data-vv-as="Nombre"
                            :messages="['']"
                            @input="$v.editedItem.nombre.$touch()"
                            @blur="$v.editedItem.nombre.$touch()"
                            :error-messages="
                              campoErrors(
                                this.$v.editedItem.nombre,
                                osplug($v.editedItem.nombre, 'Nombre')
                              )
                            "
                            autocomplete="off"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                          <v-text-field
                            id="editedItem_apellido"
                            name="editedItem_apellido "
                            v-model="editedItem.apellido"
                            label="Apellido"
                            data-vv-as="Apellido"
                            :messages="['']"
                            @input="$v.editedItem.apellido.$touch()"
                            @blur="$v.editedItem.apellido.$touch()"
                            :error-messages="
                              campoErrors(
                                this.$v.editedItem.apellido,
                                osplug($v.editedItem.apellido, 'Apellido')
                              )
                            "
                            autocomplete="off"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-flex xs12 text-xs-center mb-2>
                    <v-card-actions class="transparent">
                      <v-spacer></v-spacer>
                      <v-btn
                        color="alert"
                        flat
                        @click="close"
                        class="btnCancel"
                        >{{ 'Cancelar' }}</v-btn
                      >
                      <v-btn color="" flat @click="save" class="primary">{{
                        'Guardar'
                      }}</v-btn>
                    </v-card-actions>
                  </v-flex>
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
                    <span class="headline "
                      >Desea eliminar este invitado ?</span
                    >
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
                      @click="deleteItem1()"
                      class="primary"
                      >{{ 'Aceptar' }}</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
            <v-data-table
              :loading="dataTableLoading"
              :no-data-text="$t('dataTable.NO_DATA')"
              :no-results-text="$t('dataTable.NO_RESULTS')"
              rows-per-page-text="Registro por pagina."
              :headers="headers"
              :items="items"
              :options.sync="pagination"
              :items-per-page="3"
              :server-items-length="totalItems"
              class="elevation-1 transparent"
              :footer-props="{
                'items-per-page-text': $t('dataTable.ROWS_PER_PAGE'),
                'items-per-page-options': [3, 5, 10, 20]
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
                    <v-tooltip top v-if="props.item.autorizeVote">
                      <v-btn
                        icon
                        class="Btnedit__ BtnVote__"
                        slot="activator"
                        @click="asignPeople(props.item)"
                      >
                        <div class="iconedite">
                          VOTAR
                        </div>
                      </v-btn>
                      <span>{{ 'Votar' }}</span>
                    </v-tooltip>
                  </v-layout>
                </td>
                <!--<td>{{ props.item.status }}</td>-->
                <td>{{ props.item.nombre }}</td>
                <td>{{ props.item.apellido }}</td>

                <td v-if="props.item.vote" class="">
                  <H5 class="woman" v-if="props.item.team == 'woman'">
                    NIÑA
                  </H5>

                  <H5 class="man" v-if="props.item.team == 'man'">
                    NIÑO
                  </H5>
                </td>
                <td v-if="!props.item.vote && props.item.team != ''">
                  ----
                </td>
              </template>
              <template v-slot:pageText="props" class="transparent">
                {{ props.pageStart }} - {{ props.pageStop }}
                {{ 'De:' }}
                {{ props.itemsLength }}
              </template>
              <template v-slot:no-data>{{
                'Sin invitado(s) agregado(s) hasta ahora.'
              }}</template>
              <template v-slot:no-results>{{ 'eeee' }}</template>
            </v-data-table>
          </v-container>
        </template>
        <ErrorMessage />
        <SuccessMessageFirstUser />
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
import vaalid from '@/plugins/vaalidate'
import plumessag from '@/plugins/plumessag'

export default {
  metaInfo() {
    return {
      title: 'Revelación',
      titleTemplate: 'Revelación'
    }
  },
  data() {
    return {
      dialog_vote_confirm: false,
      hiddde_modal__: false,
      dialog_eliminar: false,
      key: '',
      revelations: {
        nombre: '',
        apellido: ''
      },
      editedItem: {
        nombre: '',
        apellido: ''
      },
      refText: '',
      idcomponent: 'REVELATIONS',
      dataTableLoading: false,
      delayTimer: null,
      dialog: false,
      dialogVote: false,
      search: '',
      pagination: {},
      arrNotify: {},
      deletedItem: {},
      voteItem: {},
      defaultItem: {},
      fieldsToSearch: ['nombre']
    }
  },
  computed: {
    notify() {
      return this.$store.state.peoples.notify
    },
    getRspPeopleSave() {
      return this.$store.state.peoples.RspsavePeople
    },
    getJson() {
      return this.$store.state.messages.message
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
          sortable: true,
          width: 5
        },
        {
          text: 'APELLIDO',
          align: 'left',
          sortable: true,
          value: 'status',
          width: '50px'
        },
        {
          text: 'TEAMS',
          align: 'left',
          sortable: true,
          value: 'Teams',
          width: '50px'
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
        `this.$store.state.peoples.totalPeoples:${this.$store.state.peoples.totalPeoples}`
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
    notify() {
      this.openNotification(this.$store.state.peoples.notify)
      return this.$store.state.peoples.notify
    },
    getCred() {
      console.log(`Cambios en set_User:${this.$store.state.peoples.set_User}`)
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
      'getAllID',
      'sendNotify',
      'test__Notify',
      'votePeople'
    ]),
    vote_confirm(select) {
      console.log(`select:${select}`)
      this.voteItem.team = select
      console.log(`this.voteItem:${JSON.stringify(this.voteItem)}`)
      this.dialog_vote_confirm = true
    },
    async vote() {
      console.log(`this.voteItem:${JSON.stringify(this.voteItem)}`)

      await this.votePeople(this.voteItem)
      this.dialog_vote_confirm = false
      this.dialogVote = false
      this.voteItem = {}
    },
    openNotification() {
      this.$vs.notification(this.notify)
    },
    hiddeModal() {
      this.hiddde_modal__ = true
    },
    user() {
      try {
        if (this.$store.state.auth.user.credentialuser) {
          return true
        }
      } catch (error) {
        return false
      }
      return true
    },
    copyKey() {
      const copyText = document.getElementById('myInput')
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      navigator.clipboard.writeText(copyText.value)

      const tooltip = document.getElementById('st_text_copy')
      tooltip.innerHTML = 'Texto copiado.'
    },
    outFunc() {
      const tooltip = document.getElementById('myTooltip')
      tooltip.innerHTML = 'Copy to clipboard'
    },
    async RspsavePeople() {
      console.log(
        `this.$store.state.peoples.RspsavePeople:${this.$store.state.peoples.RspsavePeople}`
      )
      return this.$store.state.peoples.RspsavePeople
    },
    getCred() {
      console.log(
        `this.$store.state.peoples.set_User:${this.$store.state.peoples.set_User}`
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
      this.deletedItem.credentialuser = this.$store.state.auth.user.credentialuser
      this.dialog = true
    },
    deleteItem(item) {
      this.deletedItem = Object.assign({}, item)
      this.dialog_eliminar = true
    },
    asignPeople(item) {
      console.log(`asignPeople:${JSON.stringify(item)}`)
      this.voteItem = Object.assign({}, item)
      this.dialogVote = true
    },
    async deleteItem1() {
      try {
        this.dataTableLoading = true
        this.dialog_eliminar = false
        this.deletedItem.credentialuser = this.$store.state.auth.user.credentialuser
        await this.deletePeople(this.deletedItem)
        this.dataTableLoading = false
        this.dialog_eliminar = false
      } catch (error) {
        this.dialog_eliminar = true
        this.dataTableLoading = false
      }
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
    async save() {
      // this.sendNotify()
      try {
        this.dataTableLoading = true
        let data = []
        // const valid = await this.$validator.validateAll()
        console.log(`editedItem ${JSON.stringify(this.editedItem)}`)
        // Updating item
        if (this.editedItem._id) {
          this.$v.editedItem.$reset()
          this.$v.editedItem.$touch()

          console.log(`edit:${JSON.stringify(this.$v.editedItem)}`)
          if (
            this.$v.editedItem.nombre.$invalid ||
            this.$v.editedItem.apellido.$invalid
          ) {
            this.sendNotify({
              duration: 6000,
              progress: 'auto',
              title: 'Advertencia.',
              text: 'Debe ingresar el Nombre y Apellido correctamente.',
              color: 'warn',
              position: 'bottom-center',
              width: '50%'
            })
            return
          }
          await this.editPeople(this.editedItem)
          this.dataTableLoading = false
          this.close()
        } else {
          console.log(`SAVE:${JSON.stringify(this.$v.revelations)}`)

          this.$v.revelations.$reset()
          this.$v.revelations.$touch()

          if (
            this.$v.revelations.nombre.$invalid ||
            this.$v.revelations.apellido.$invalid
          ) {
            this.sendNotify({
              duration: 6000,
              progress: 'auto',
              title: 'Advertencia.',
              text: 'Debe ingresar el Nombre y Apellido correctamente.',
              color: 'warn ',
              position: 'bottom-center'
            })
            return
          }
          const peoples = [
            {
              nombre: this.revelations.nombre,
              apellido: this.revelations.apellido
            }
          ]

          if (this.$store.state.auth.user != undefined) {
            data = await this.savePeople({
              peoples: JSON.stringify(peoples),
              credentialuser: this.$store.state.auth.user
            })

            this.$v.revelations.nombre.$reset()
            this.$v.revelations.apellido.$reset()
            this.revelations.nombre = ''
            this.revelations.apellido = ''
          } else {
            data = await this.savePeople({
              peoples: JSON.stringify(peoples)
            })

            this.$v.revelations.nombre.$reset()
            this.$v.revelations.apellido.$reset()
            this.revelations.nombre = ''
            this.revelations.apellido = ''
          }
          this.dataTableLoading = false

          this.close()
        }

        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        this.dataTableLoading = false
        this.close()
        console.error(error)
      } finally {
        this.dataTableLoading = false
        this.close()
        this.$v.$reset()
      }
    }
  },
  validations: vaalid.validations,
  async mounted() {
    this.getNameComponent()
    if (this.user()) {
      await this.getPeoples({
        id: this.$store.state.auth.user.credentialuser
      })
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
