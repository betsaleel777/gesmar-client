<template>
  <div class="content-header">
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li v-for="(lien, index) in liens" :key="index" class="breadcrumb-item" :class="{ active: liens.length - 1 !== index }" aria-current="page">
            <b-link v-if="liens.length - 1 !== index" :to="lien.path">{{ lien.text }}</b-link>
            <span v-else>{{ lien.text }}</span>
          </li>
        </ol>
      </nav>
      <h4 class="content-title content-title-xs"></h4>
    </div>
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
