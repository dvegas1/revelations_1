<template>
  <div class="example-avatar">
    <div v-show="$refs.upload && $refs.upload.dropActive" class="drop-active">
      <h3>Drop files to upload</h3>
    </div>
    <div class="avatar-upload" v-show="!edit" for="avatar">
      <div class="text-center p-2"></div>

      <div class="text-center p-2">
        <div class="perfil">
          <img
            name="imgperfil"
            id="imgperfil"
            :src="files.length ? files[0].url : imgP"
            :value="files.length ? files[0].url : imgP"
            class="perfil_registro circle imagen"
          />
        </div>
        <file-upload
          extensions="gif,jpg,jpeg,png,webp"
          accept="image/png,image/gif,image/jpeg,image/webp"
          name="avatar"
          :drop="!edit"
          v-model="files"
          @input-filter="inputFilter"
          @input-file="inputFile"
          ref="upload"
          type="file"
        >
        </file-upload>
      </div>
    </div>

    <div class="avatar-edit" v-show="files.length && edit">
      <div class="avatar-edit-image" v-if="files.length">
        <img ref="editImage" :src="files[0].url" class="hidden avatar-upload" />
        <cropper :src="files[0].url" @change="change" />
      </div>
      <div class="contn_btn_img_pf">
        <div class="text-center p-4">
          <v-btn type="button" class="imgP" @click.prevent="$refs.upload.clear">
            Cancel
          </v-btn>

          <v-btn type="submit" class="imgP" @click.prevent="editSave">
            Save
          </v-btn>
        </div>
      </div>
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

import { Cropper } from 'vue-advanced-cropper'
import FileUpload from 'vue-upload-component'
import 'vue-advanced-cropper/dist/style.css'
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  props: {
    imgP: String
  },
  components: {
    Cropper,
    FileUpload
  },
  data() {
    return {
      files: [],
      edit: false,
      message: '',
      coordinates_cropperNew: '',
      canvas: '',
      urlDefault: 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'
    }
  },
  computed: {
    imgperfil: {
      get() {
        return this.$store.state.signup.imgperfil
      },
      set(value) {
        const data = {
          key: 'imgperfil',
          value
        }
        this.addItems(data)
        //  this.countrys = country
      }
    }
  },
  watch: {
    edit(value) {
      if (value) {
        this.$nextTick(function() {
          if (!this.$refs.editImage) {
          }
        })
      }
    }
  },
  methods: {
    ...mapActions(['addItems', 'addForData']),
    change({ coordinates, canvas }) {
      this.coordinates_cropperNew = coordinates
      this.canvas = canvas
    },

    async saveImgU() {
      const formData = new FormData()
      formData.append('imgperfil', this.files[0].file)
      const data = {
        key: 'file',
        formData
      }
      this.addForData(formData)
      console.log(` files ${this.files[0].name}`)

      try {
        await axios.post(
          'http://192.168.6.104:3004/uploadPhotoPerfil',
          formData
        )
        this.message = 'Uploaded!!'
      } catch (err) {
        this.message = err.response.data.error
      }
    },
    editSave() {
      this.edit = false
      const oldFile = this.files[0]
      this.saveImgU()

      this.Cropper = this.canvas
      const binStr = atob(this.Cropper.toDataURL(oldFile.type).split(',')[1])
      const arr = new Uint8Array(binStr.length)
      for (let i = 0; i < binStr.length; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      const file = new File([arr], oldFile.name, { type: oldFile.type })

      const data = {
        key: 'imgperfil',
        value: oldFile.url
      }

      this.addItems(data)

      console.log(oldFile.id)
      console.log(file.type)

      this.$refs.upload.update(oldFile.id, {
        file,
        type: file.type,
        size: file.size,
        active: true
      })
    },
    alert(message) {
      alert(message)
    },
    inputFile(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        this.$nextTick(function() {
          this.edit = true
        })
      }
      if (!newFile && oldFile) {
        this.edit = false
      }
    },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')
          return prevent()
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = ''
        const URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    }
  }
}
</script>
