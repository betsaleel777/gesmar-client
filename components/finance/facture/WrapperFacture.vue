<template>
  <div class="content-body">
    <div id="printable" class="card card-invoice">
      <div class="card-header align-items-center orange-sgmt">
        <img :src="societe.logo" class="img-fluid" width="125" height="125" alt="logo sgmt" />
        <span class="tx-26 tx-bold tx-white flex-grow-1 text-center text-uppercase">société de gestion du grand marché de treichville</span>
      </div>
      <slot />
      <div class="card-footer vert-sgmt">
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
.orange-sgmt {
  background-color: #ff4c00 !important;
}
.vert-sgmt {
  background-color: #0e4732 !important;
}
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
