<template>
  <div class="content-header">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li v-for="(lien, index) in liens" :key="index" class="breadcrumb-item" aria-current="page">
          <b-link v-if="liens.length - 1 !== index" :to="lien.path">{{ lien.text }}</b-link>
          <span v-else class="text-primary">{{ lien.text }}</span>
        </li>
      </ol>
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    liens: {
      type: Array,
      required: true,
    },
  },
}
</script>
