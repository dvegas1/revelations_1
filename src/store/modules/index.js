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

import camelCase from 'lodash/camelCase'
const requireModule = require.context('.', false, /\.js$/) // Get js files inside modules folder
const modules = {}

requireModule.keys().forEach(fileName => {
  // Avoid the index.js file
  if (fileName === './index.js') {
    return
  }
  const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
  modules[moduleName] = requireModule(fileName).default
})

export default modules
