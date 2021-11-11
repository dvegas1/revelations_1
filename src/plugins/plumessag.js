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

export default {
  install(Vue, options) {
    Vue.mixin({
      watch: {
        getJson() {
          this.refText = this.$store.state.messages.message
        },

        getNameComponent() {
          this.nameComponent = this.$store.state.messages.name_components
          let finalize = true
          let idioma = ''

          const run = async () => {
            if (finalize) {
              finalize = false
              idioma = JSON.parse(window.localStorage.getItem('locale'))
              await this.getText_component({
                idcomponent: this.idcomponent,
                lenguage: idioma
              })
            }
            finalize = true
            await this.delay(2000)
          }
          const time = setInterval(() => {
            this.nameComponent = this.$store.state.messages.name_components

            if (this.nameComponent !== this.idcomponent) {
              clearTimeout(time)
            } else {
              run()
            }
          }, 1000)
        }
      },
      methods: {
        async delay(ms) {
          // return await for better async stack trace support in case of errors.
          return await new Promise(resolve => setTimeout(resolve, ms))
        }
      }
    })
  }
}
