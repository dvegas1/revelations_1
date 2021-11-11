<template>
  <v-footer  height="42" class=" justify-center text-xs-center d-block" >
     <div class="nota"><p class="nota_txt p__txt">NOTA:</p><p class="p__txt">Obligatorio traer tapaboca.</p></div>
  </v-footer>
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

export default {
  name: 'Footer',
  computed: {
    appVersion() {
      return this.$store.getters.appVersion
    }
  }
}
</script>
<style>

.p__txt{
      margin-bottom: 0px !important;
}
h4.nota_txt {
    padding-right: 8px;
}

.footer {
    width: 6em;
    text-align:center;
    font-size:30px;
    background-image: radial-gradient(at 50% 0, #ea00ff 0%, #146acc 50%, transparent 75%);
    background-size: 100% 2px;
    background-repeat: no-repeat;
}

.footer:after {
    content: '\00a0';
    background-image:
      radial-gradient(at 50% 0, blue 0%, red 50%, transparent 75%);
    background-size: 100% 2px;
    background-repeat: no-repeat;
    float:left;
    width:100%;
}

.lugar2 {
    text-transform: uppercase;
}

</style>
