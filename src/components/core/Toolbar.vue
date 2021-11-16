<style lang="css" src="./../../app/css/toolbar.css"></style>

<template>
  <div class="transparent">
    <v-navigation-drawer v-model="sidebar" app disable-resize-watcher transparent >
      <v-list class="transparent">
        <v-list-tile class="transparent">
          <v-list-tile-content>{{ appTitle }}</v-list-tile-content>
          <v-list-tile-action>
            <v-btn icon @click.stop="sidebar = !sidebar">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile class="transparent"
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-group v-if="admin" prepend-icon="mdi-lock" no-action class="transparent">
          <v-list-tile slot="activator">
            <v-list-tile-title>{{ $t('adminItems.ADMIN') }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile
            v-for="(item, index) in adminItems"
            :key="index"
            :to="{ name: item.link }"
            exact
          >
            <v-list-tile-content class="d-inline mt-3">
              <v-icon>{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile v-if="isTokenSet" @click="view_ca">
          <v-list-tile-action>
            <v-icon>key</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            MI CLAVE DE ACCESO
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list-tile v-if="isTokenSet" @click="userLogout">
          <v-list-tile-action>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{ $t('menuItems.LOGOUT') }}
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <span class="hidden-md-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
      </span>
      <v-toolbar-title class="headline text-uppercase ml-0">
        <div v-resize-text>
          <router-link
            :to="{ name: 'home' }"
            tag="span"
            style="cursor: pointer"
            v-if="isTokenSet"
            >{{ appTitle }}</router-link
          >
          <router-link
            :to="{ name: 'revelations' }"
            tag="span"
            style="cursor: pointer"
            v-else
            >{{ appTitle }}</router-link
          >
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn
          flat
          v-for="(item, index) in menuItems"
          :key="index"
          :to="{ name: item.link }"
          exact
          :class="['hidden-sm-and-down', item.class]"
        >
          <v-icon>{{ item.icon }}</v-icon>
          &nbsp;{{ item.title }}
        </v-btn>
        <v-menu v-if="admin" offset-y class="hidden-sm-and-down">
          <v-btn slot="activator" flat class="">
            <v-icon>mdi-lock</v-icon>
            &nbsp;{{ $t('adminItems.ADMIN') }}
          </v-btn>
          <v-list>
            <v-list-tile
              active-class="white--text"
              v-for="(item, index) in adminItems"
              :key="index"
              :to="{ name: item.link }"
              exact
              :class="[item.class]"
            >
              <v-list-tile-title>
                <v-icon>{{ item.icon }}</v-icon>
                {{ item.title }}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      <v-btn
          flat
          v-if="isTokenSet"
          @click="view_ca"
          class="hidden-sm-and-down btnLogout"
        >
          <v-icon left>key</v-icon>
          MI CLAVE DE ACCESO
        </v-btn>
        <v-btn
          flat
          v-if="isTokenSet"
          @click="userLogout"
          class="hidden-sm-and-down btnLogout"
        >
          <v-icon left>mdi-exit-to-app</v-icon>
          {{ $t('menuItems.LOGOUT') }}
        </v-btn>
        <LocaleChanger />
      </v-toolbar-items>
    </v-toolbar>
    <template>
  <div class="text-center">
    <v-dialog
      v-model="modal_ca"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 darken">
          Clave de acceso:
        </v-card-title>

        <v-card-text>
        <div class="key_cont" v-if="this.user !== null">
      <v-text-field ref="textToCopy" v-model="key" ></v-text-field>
      <i @click="copyText" class="far fa-copy copyKey"></i>
      </div>

        <!--<div v-if="this.user !== null">
          <div v-html="'<div class="container_key"> <div class="v-input text_key v-text-field v-input--is-label-active v-input--is-dirty theme--light"><div class="v-input__control"><div class="v-input__slot"><div class="v-text-field__slot"><input disabled id="myInput"  autocomplete="off" type="text"></div></div><p id="st_text_copy"></p></div></div><button type="button" onclick="copyKey()" class="btn_light_copy v-btn--flat v-btn theme--light"><div class="v-btn__content"><i onclick="copyKey()" class="far fa-copy"></i></div></button></div>'">
            </div>
     </div>
-->
         
     </v-card-text>
        <v-divider></v-divider>
      </v-card>
    </v-dialog>
  </div>
</template>

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

import { mapGetters } from 'vuex'
import LocaleChanger from '@/components/core/LocaleChanger'
import ResizeText from 'vue-resize-text'
import { buildSuccess, handleError, handleError_api } from '@/utils/utils.js'

import { mapActions } from 'vuex'
// import plumessag from '@/plugins/plumessag'

export default {
  name: 'Toolbar',
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      htmlAttrs: {
        lang: this.$i18n.locale
      },
      meta: [
        { name: 'msapplication-TileColor', content: '#ffc40d' },
        { name: 'theme-color', content: '#ffffff' },
        {
          name: 'apple-mobile-web-app-title',
          content: this.$store.getters.appTitle
        },
        { name: 'application-name', content: this.$store.getters.appTitle }
      ],
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png'
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png'
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', color: '#5bbad5', href: '/safari-pinned-tab.svg' },
        { rel: 'favicon', href: '/favicon.ico' }
      ]
    }
  },
  components: {
    LocaleChanger
  },
  directives: {
    ResizeText
  },
  data() {
    return {
      key:'',
      disabled_inpKey:true,
      modal_ca:false,
      sidebar: false,
      refText: '',
      idcomponent: 'TOOLBAR',
      bars: [
        { class: '' },
        { class: '', dark: true },
        { class: 'primary', dark: true },
        { class: 'elevation-0' }
      ]
    }
  },
  computed: {
    ...mapGetters(['appTitle', 'isTokenSet', 'user']),
    admin() {
      return this.user !== null ? this.user.role === 'admin' : false
    },
    /* getJson() {
      return this.$store.state.messages.message
    },
    getNameComponent() {
      return this.$store.state.messages.name_components
    },*/
    adminItems() {
      return [
        {
          title: this.$t('adminItems.USERS'),
          link: 'admin-users',
          icon: 'mdi-account-supervisor',
          class: ''
        },
        {
          title: this.$t('adminItems.COUNTRY'),
          link: 'admin-country',
          icon: 'mdi-flag',
          class: ''
        },
        {
          title: this.$t('adminItems.STATE'),
          link: 'admin-state',
          icon: 'mdi-map',
          class: ''
        },
        {
          title: this.$t('adminItems.CITIES'),
          link: 'admin-cities',
          icon: 'mdi-city',
          class: ''
        },
        {
          title: this.$t('adminItems.CONTENTS'),
          link: 'admin-text',
          icon: 'mdi-pencil',
          class: ''
        },
        {
          title: this.$t('adminItems.COMPONENTS'),
          link: 'admin-components',
          icon: 'mdi-folder',
          class: ''
        },
        {
          title: this.$t('adminItems.NATION'),
          link: 'admin-nation',
          icon: 'mdi-routes',
          class: ''
        }
      ]
    },
    historyItems() {
      return [
        {
          title: this.$t('adminItems.PURCHASES'),
          link: 'history-mypurchases',
          icon: 'mdi-cart',
          class: ''
        },
        {
          title: this.$t('adminItems.SALES'),
          link: 'history-mysales',
          icon: 'mdi-cash-multiple',
          class: ''
        }
      ]
    },
    myStoreItems() {
      return [
        {
          title: this.$t('myStoreItems.VIEW_STORE'),
          link: 'store',
          icon: 'mdi-store',
          class: ''
        }
      ]
    },
    menuItems() {
      if (this.isTokenSet) {
        return [
          {
            title: 'REVELACIÓN',
            link: 'home',
            icon: 'mdi-home',
            class: ''
          },
         /* {
            title: this.$t('menuItems.MY_PROFILE'),
            link: 'profile',
            icon: 'mdi-face',
            class: ''
          },
               {
            title: this.$t('menuItems.FAVORITES'),
            link: 'Favorites',
            icon: 'mdi-star',
            class: ''
          },
          {
            title: this.$t('menuItems.CATEGORIES'),
            link: 'Categories',
            icon: 'mdi-table-large',
            class: ''
          },
          {
            title: this.$t('menuItems.KNOWUS'),
            link: 'KnowUs',
            icon: 'mdi-marker-check',
            class: ''
          },
          {
            title: this.$t('menuItems.DOWNLOADTHEAPP'),
            link: 'DownloadTheApp',
            icon: 'mdi-download',
            class: ''
          }*/
        ]
      }
      return [
        {
          title: 'REVELACIÓN',
          link: 'revelations',
          icon: 'mdi-home',
          class: ''
        },
        {
          title: this.$t('menuItems.LOGIN'),
          link: 'login',
          icon: 'mdi-login',
          class: ''
        }
        /*  {
          title: this.$t('menuItems.FAVORITES'),
          link: 'Favorites',
          icon: 'mdi-star',
          class: ''
        },
        {
          title: this.$t('menuItems.CATEGORIES'),
          link: 'Categories',
          icon: 'mdi-table-large',
          class: ''
        },
        {
          title: this.$t('menuItems.KNOWUS'),
          link: 'KnowUs',
          icon: 'mdi-marker-check',
          class: ''
        },
        {
          title: this.$t('menuItems.DOWNLOADTHEAPP'),
          link: 'DownloadTheApp',
          icon: 'mdi-download',
          class: ''
        },
      {
          title: this.$t('menuItems.SIGNUP'),
          link: 'signup',
          icon: 'mdi-plus-circle-outline',
          class: ''
        }*/
      ]
    }
  },
  methods: {
    ...mapActions(['sendNotify']),

    userLogout() {
      this.$store.dispatch('userLogout')
    },
    view_ca() {
      this.modal_ca = true
    },
    async copyText () {
          let textToCopy = this.$refs.textToCopy.$el.querySelector('input')
          textToCopy.select()
          document.execCommand("copy");
          this.sendNotify({
              duration: 6000,
              progress: 'auto',
              title: 'Clave de acceso.',
              text: 'Clave copiada con exito.',
              color: 'success',
              position: 'bottom-center',
              width: '50%'
            })
        }
  },
   async mounted() {
 //   await this.name_component(this.idcomponent)
        const time = setInterval(() => {
          if(this.user !== null){
            console.log("key:" + this.key)
              this.key = this.user.credentialuser
          }
          }, 1000)
  }
}
</script>
<style>
.v-btn__content {
    color: white;
}
.v-toolbar__content {
    background: linear-gradient(
270deg, #3367d2, #811a92,#6e4390);
    background-size: 400% 400%;

    -webkit-animation: AnimationName 21s ease infinite;
    -moz-animation: AnimationName 21s ease infinite;
    animation: AnimationName 21s ease infinite;
}

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}

.key_cont {
    display: flex;
    line-height: 10px;
    padding: 5px;
    margin: 4px;
}

i.far.fa-copy.copyKey {
    margin: 5px;
    padding: 7px;
    width: 30px;
    height: 32px;
    background: #f1f1f1;
    line-height: 18px;
    border: 1px solid #c1c1c1;
    border-radius: 5px;
    font-size: 13pt;
    color: #5d596e;
    cursor:pointer !important;
}

.it__Btn {
    display: flex;
    width: 100%;
}
</style>
