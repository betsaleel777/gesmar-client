<template>
  <div class="content-body">
    <div id="printable" class="card card-invoice">
      <div :style="{ backgroundColor: societe.primaire }" class="card-header align-items-center">
        <img :src="societe.logo" class="img-fluid" width="125" height="125" alt="logo sgmt" />
        <span class="tx-26 tx-bold tx-white flex-grow-1 text-center text-uppercase">société de gestion du grand marché de treichville</span>
      </div>
      <slot />
      <div :style="{ backgroundColor: societe.secondaire }" class="card-footer">
        <p class="mb-0 text-center tx-white">
          siège social: {{ societe.siege }}, contact: {{ societe.phone }}-{{ societe.smartphone }}, Email: {{ societe.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    societe: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
@media print {
  .content-body {
    padding-inline: 0px;
  }
  #printable,
  #printable * {
    visibility: visible;
  }
}
</style>
