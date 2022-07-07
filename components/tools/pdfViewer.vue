<template>
  <pdf :src="source"></pdf>
</template>

<script>
import pdf from 'vue-pdf'
export default {
  components: {
    pdf
  },
  props: {
    source: {
      type: String,
      required:true
    }
  }
}
