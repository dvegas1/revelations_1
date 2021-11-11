<script src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=6LfgPdkaAAAAAFUAATmGKU6OOpOlPUo-b16-gb0o"></script>
<style lang="css" src="./../../app/css/grapes.min.css"></style>
<style lang="css" src="./../../app/css/customGrappers.css"></style>

<template>
  <div id="gjs" style="height:0px; overflow:hidden;">
    <div class="panel">
      <h1 class="welcome">Welcome to</h1>
    </div>
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

import router from '@/router'
import { mapActions } from 'vuex'
import plumessag from '@/plugins/plumessag'
import vaalid from '@/plugins/vaalidate'
import VueRecaptcha from 'vue-recaptcha'
import grapesjs from 'grapesjs'

export default {
  name: 'Login',
  components: {
    VueRecaptcha,
    grapesjs
  },
  metaInfo() {
    return {
      title: this.$store.getters.appTitle,
      titleTemplate: `${this.$t('login.TITLE')} - %s`
    }
  },
  data() {
    return {
      login: {
        email: '',
        password: '',
        recaptcha: null
      },
      refText: '',
      idcomponent: 'STORE',
      key: '6LfgPdkaAAAAAFUAATmGKU6OOpOlPUo-b16-gb0o',
      dialog: false,
      show1: false
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
    ...mapActions(['userLogin', 'getText_component', 'name_component']),

    onVerify(response) {
      this.login.recaptcha = response
    },
    loadGrapper() {
      var editor = grapesjs.init({
        showOffsets: 1,
        noticeOnUnload: 0,
        container: '#gjs',
        height: '100%',
        fromElement: true,
        storageManager: { autoload: 0 },
        styleManager: {
          sectors: [
            {
              name: 'General',
              open: false,
              buildProps: [
                'float',
                'display',
                'position',
                'top',
                'right',
                'left',
                'bottom'
              ]
            },
            {
              name: 'Flex',
              open: false,
              buildProps: [
                'flex-direction',
                'flex-wrap',
                'justify-content',
                'align-items',
                'align-content',
                'order',
                'flex-basis',
                'flex-grow',
                'flex-shrink',
                'align-self'
              ]
            },
            {
              name: 'Dimension',
              open: false,
              buildProps: [
                'width',
                'height',
                'max-width',
                'min-height',
                'margin',
                'padding'
              ]
            },
            {
              name: 'Typography',
              open: false,
              buildProps: [
                'font-family',
                'font-size',
                'font-weight',
                'letter-spacing',
                'color',
                'line-height',
                'text-shadow'
              ]
            },
            {
              name: 'Decorations',
              open: false,
              buildProps: [
                'border-radius-c',
                'background-color',
                'border-radius',
                'border',
                'box-shadow',
                'background'
              ]
            },
            {
              name: 'Extra',
              open: false,
              buildProps: ['transition', 'perspective', 'transform']
            }
          ]
        }
      })

      const svgText = `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
<path fill="currentColor" d="M18.5,4L19.66,8.35L18.7,8.61C18.25,7.74 17.79,6.87 17.26,6.43C16.73,6 16.11,6 15.5,6H13V16.5C13,17 13,17.5 13.33,17.75C13.67,18 14.33,18 15,18V19H9V18C9.67,18 10.33,18 10.67,17.75C11,17.5 11,17 11,16.5V6H8.5C7.89,6 7.27,6 6.74,6.43C6.21,6.87 5.75,7.74 5.3,8.61L4.34,8.35L5.5,4H18.5Z" />
</svg>`

      const svgImage = `<svg style="width:48px;height:48px" viewBox="0 0 24 24">
<path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
</svg>`

      editor.BlockManager.add('column3-7', {
        label: 'column3-7',
        attributes: {
          class: 'gjs-fonts gjs-f-b37'
        },
        content: `<div style="display: flex;"><div  data-gjs-type="text" draggable="true" data-highlightable="1" class="flex_columm3" style="     width: 100%;     display: flex; ">Test block</div><div  data-gjs-type="text" draggable="true" data-highlightable="1" class="flex_columm3" style="     width: 100%;     display: flex; ">Test block</div><div  data-gjs-type="text" draggable="true" data-highlightable="1" class="flex_columm3" style="     width: 100%;     display: flex; ">Test block</div></div>`
      }),
        editor.BlockManager.add('testBlock', {
          label: 'Block',
          attributes: { class: 'gjs-fonts gjs-f-b1' },
          content: `<div style="padding-top:50px; padding-bottom:50px; text-align:center">Test block</div>`
        }),
        editor.BlockManager.add('my_test', {
          label: 'my_test',
          attributes: { class: 'gjs-fonts gjs-f-b1' },
          content: `<div style="padding-top:50px; padding-bottom:50px; text-align:center">Test block</div>`
        })

      editor.BlockManager.add('text', {
        label: 'text',
        media: svgText,
        content: {
          type: 'text',
          content: 'Insert your text here',
          style: { padding: '10px' }
        }
      })

      editor.BlockManager.add('image', {
        label: 'image',
        media: svgImage,
        content: { type: 'image' }
      })
    },
    onCaptchaExpired: function() {
      this.$refs.recaptcha.reset()
    },

    async submit() {
      // const valid = await this.$validator.validateAll()
      await this.$v.$reset()
      await this.$v.$touch()
      await this.subvali(this.$v.login)

      if (this.$v.login.$invalid) {
        return false
      }
      /*if (this.login.recaptcha == null) {
        this.dialog = true
        return false
      }*/

      if (!this.$v.login.$invalid) {
        await this.userLogin({
          email: this.login.email,
          password: this.login.password,
          recaptcha: this.login.recaptcha
        })
      }
    }
  },

  validations: vaalid.validations,

  created() {
    /*  if (this.$store.state.auth.isTokenSet) {
      router.push({ name: 'home' })
    }*/
  },

  async mounted() {
    this.loadGrapper()
    await this.name_component(this.idcomponent)
  }
}
</script>

<style>
.panel {
  width: 90%;
  max-width: 700px;
  border-radius: 3px;
  padding: 30px 20px;
  margin: 150px auto 0px;
  background-color: #eeeeee;
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.25);
  color: rgba(255, 255, 255, 0.75);
  font: caption;
  font-weight: 100;
}

.welcome {
  text-align: center;
  font-weight: 100;
  margin: 0px;
}

.logo {
  width: 70px;
  height: 70px;
  vertical-align: middle;
}

.logo path {
  pointer-events: none;
  fill: none;
  stroke-linecap: round;
  stroke-width: 7;
  stroke: #fff;
}

.big-title {
  text-align: center;
  font-size: 3.5rem;
  margin: 15px 0;
  background-color: rgba(43, 43, 43, 0.926);
}

.spend {
  font-size: 18px;
  font-family: Helvetica, Arial, sans-serif;
  color: #1e1e1e;
}

.save {
  font-size: 30px;
  font-family: Helvetica, Arial, sans-serif;
  color: #d63c3c;
}

.done {
  font-size: 14px;
  font-family: Helvetica, Arial, sans-serif;
  color: #1e1e1e;
}
/*CUSTOM */

/**/
</style>
