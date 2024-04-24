<template>
  <b-modal :id="modalId" v-model="dialog" centered>
    <template #modal-header>
      <h6 id="archiver" class="modal-title">Veuillez confirmer l'action</h6>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <p class="mg-b-0">
        {{ message }}
      </p>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-primary text-white" data-dismiss="modal" @click="dialog = false">
        Close
      </button>
      <button type="button" class="btn btn-danger text-white" @click="save">Confirmer</button>
    </template>
  </b-modal>
</template>
<script>
import modal from '~/mixins/modal'
export default {
  mixins: [modal],
  props: {
    id: {
      type: Number,
      required: true,
    },
    modalId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  methods: {
    save() {
      this.$store.dispatch(`${this.action}`, this.id).then(({ message }) => {
        this.dialog = false
        this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
        this.$emit('confirmed')
      })
    },
  },
}
</script>
<style lang=""></style>
