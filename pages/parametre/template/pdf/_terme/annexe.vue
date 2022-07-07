<template>
  <PdfViewer v-if="source" :source="source" />
</template>

<script>
import { mapActions } from 'vuex'
import PdfViewer from '~/components/tools/pdfViewer.vue'
export default {
  components: {
    PdfViewer,
  },
  computed: {
    source() {
      return this.getSource()
    },
  },
  methods: {
    ...mapActions({ getPdf: 'template/terme-annexe/getPdf' }),
    getSource() {
      this.getPdf(this.$route.params.terme).then(({ path }) => {
        return path
      })
    },
  },
}
</script>

<style></style>
