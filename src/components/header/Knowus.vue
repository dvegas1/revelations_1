<style lang="css" src="./../../app/css/knowus.css"></style>

<template>
  <v-layout row wrap>
    <v-flex xs12 sm10 offset-sm1>
      <v-card>
        <v-tabs v-model="tab" centered icons-and-text>
          <v-tabs-slider></v-tabs-slider>

          <v-tab href="#tab-1">
            <template>
              <v-flex xs12 sm20 text-xs-center>
                <v-icon class="iconTab" color="white">mdi-human</v-icon>
                <NameTab
                  :title="
                    refText.KNOWUS !== undefined
                      ? refText.KNOWUS.structure.contents
                      : 'Sin label'
                  "
                />
              </v-flex>
            </template>
          </v-tab>

          <v-tab href="#tab-2">
            <template>
              <v-flex xs12 sm20 text-xs-center>
                <v-icon class="iconTab" color="white">mdi-store</v-icon>
                <NameTab
                  :title="
                    refText.KNOWUS !== undefined
                      ? refText.KNOWUS.store.contents
                      : 'Sin label'
                  "
                />
              </v-flex>
            </template>
          </v-tab>

          <v-tab href="#tab-3">
            <template>
              <v-flex xs12 sm20 text-xs-center>
                <v-icon class="iconTab" color="white">mdi-image-filter</v-icon>
                <NameTab
                  :title="
                    refText.KNOWUS !== undefined
                      ? refText.KNOWUS.galleryandevents.contents
                      : 'Sin label'
                  "
                />
              </v-flex>
            </template>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item key="1" :value="'tab-1'">
            <v-card flat>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex text-xs-center>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.edtaee.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.edtaeetext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex xs12 text-xs-center md6>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.mission.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.missiontext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md6>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.vision.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.visiontext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex xs12 text-xs-center md6>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.purpose.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.purposetext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md6>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.values.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.valuestext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>

                    <v-flex xs12></v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex text-xs-center>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.leaders.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex xs12 text-xs-center md6>
                      <img
                        src="https://www.facebook.com/profile/pic.php?cuid=AYhjc_Um-ieF7uPOtpAGBuoKjeOXh6fDTl1NyZDHqiereBTo55JVgUtaZ6t7ye2ombNYdB0FryjOEcbWRt3KWgLRZ48OqL9S-ZWobIvj8tjZjbf-mSAXhlGOO1YGcuogemgJ-eb4frA4Ntu8OG7BIR7d2mRXyYbzsSffxgHnBpFPEhWMnxhLGJRPueQsfXqDTTLqAK1ehVP0Yu0sJRvID77rfb8Sdzqs3KrG7dq72WsxJ741eyxUF4dJHtbPVDe-FAhLmoypGJcZXC2ORXHfCdkh&square_px=64"
                        title="Darwin Vegas"
                        class="imageceo"
                      />
                      <Description
                        :description="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.ceo1.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.ceo1b.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md6>
                      <img
                        src="https://instagram.fccs1-1.fna.fbcdn.net/v/t51.2885-15/s150x150/73108738_536379386947501_2313300493912806501_n.jpg?tp=1&_nc_ht=instagram.fccs1-1.fna.fbcdn.net&_nc_ohc=62BvdVsKpVUAX8_OHwD&edm=AGW0Xe4AAAAA&ccb=7-4&oh=0699ee1b61030fa660feb02cd59c4952&oe=609B3D2A&_nc_sid=acd11b"
                        title="Miguel Angel Mendoza Diaz"
                        class="imageceo"
                      />
                      <Description
                        :description="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.ceo2.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.ceo2b.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12></v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="2" :value="'tab-2'">
            <v-card flat>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <v-flex text-xs-center>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.brand.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.brandtext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>

                    <v-flex xs12></v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.income.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.incometext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.scope.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.scopetext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.site.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.sitetext.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>

                    <v-flex xs12></v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <img
                        src="https://images.vexels.com/media/users/3/157872/isolated/preview/8d20eee691b54d23d865a69f08a40cd7-icono-de-tierra-b-aacute-sica-by-vexels.png"
                        title="Visits"
                        class="imagemet"
                      />
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.nvisits.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.visits.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <img
                        src="https://i.pinimg.com/originals/63/31/25/6331252a3eabe94dd723647e2ad7c565.png"
                        title="Users"
                        class="imagemet"
                      />
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.nusers.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.users.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <img
                        src="https://img.icons8.com/carbon-copy/2x/shop.png"
                        title="Stores"
                        class="imagemet"
                      />
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.nstores.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.stores.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex xs12></v-flex>

                    <v-flex text-xs-center>
                      <Heading
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.testimonials.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12></v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGcMYbWn6ytl_7vPvmjbn2mLa_1CFx8Exvw&usqp=CAU&reload=on"
                        title="Osniel"
                        class="imagetes"
                      />
                      <Description
                        :description="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.testimony1.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.testimony1.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGcMYbWn6ytl_7vPvmjbn2mLa_1CFx8Exvw&usqp=CAU&reload=on"
                        title="Osniel"
                        class="imagetes"
                      />
                      <Description
                        :description="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.testimony2.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.testimony2.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                    <v-flex xs12 text-xs-center md4>
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGcMYbWn6ytl_7vPvmjbn2mLa_1CFx8Exvw&usqp=CAU&reload=on"
                        title="Osniel"
                        class="imagetes"
                      />
                      <Description
                        :description="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.testimony3.contents
                            : 'Sin label'
                        "
                      />
                      <Definition
                        :title="
                          refText.KNOWUS !== undefined
                            ? refText.KNOWUS.testimony3.contents
                            : 'Sin label'
                        "
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="3" :value="'tab-3'">
            <v-card flat>
              <v-card-text>
                <v-container fluid>
                  <v-layout row wrap>
                    <template>
                      <v-container fluid>
                        <v-flex xs12 text-xs-center md4>
                          <v-img
                            src="https://picsum.photos/510/300?random"
                          ></v-img>
                          <div>
                            <a target="_blank" href=""></a>
                          </div>
                        </v-flex>

                        <v-flex xs12 text-xs-center md4>
                          <v-img
                            src="https://picsum.photos/510/300?random"
                          ></v-img>
                          <div>
                            <a target="_blank" href=""></a>
                          </div>
                        </v-flex>
                      </v-container>
                    </template>
                  </v-layout>
                </v-container>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-flex>
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

import Heading from '../common/Heading.vue'
import { mapActions } from 'vuex'
import plumessag from '@/plugins/plumessag'
// import { mapActions } from 'vuex'//
// import NameTab from '../common/NameTab.vue'

export default {
  name: 'KnowUs',
  components: { Heading },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('menuItems.KNOWUS')} - %s`
    }
  },

  data() {
    return {
      refText: '',
      idcomponent: 'KNOWUS',
      tab: null
    }
  },

  computed: {
    getJson() {
      return this.$store.state.messages.message
    },
    getNameComponent() {
      return this.$store.state.messages.name_components
    }
  },

  methods: {
    ...mapActions(['getText_component', 'name_component'])
  },

  async mounted() {
    await this.name_component(this.idcomponent)
  }
}
</script>
