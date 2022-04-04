<template>
  <div>
    <div
      v-if="previewImage"
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage"
    ></div>
    <b-form-file
      ref="fileInput"
      class="mg-t-5"
      placeholder="choix de l'avatar"
      @input="pickFile"
    >
      <template slot="file-name" slot-scope="{ names }">
        <b-badge variant="dark">{{ names[0] }}</b-badge>
      </template>
    </b-form-file>
  </div>
</template>
<script>
export default {
  data() {
    return {
      previewImage: null,
    }
  },
  methods: {
    selectImage() {
      this.$refs.fileInput.click()
    },
    pickFile() {
      const input = this.$refs.fileInput
      const file = input.files
      if (file && file[0]) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
  },
}
</script>
<style scoped lang="css">
.imagePreviewWrapper {
  width: 200px;
  height: 200px;
  display: block;
  cursor: pointer;
  margin: 0 auto 30px;
  background-size: cover;
  background-position: center center;
}
</style>
