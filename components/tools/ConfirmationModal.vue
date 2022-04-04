<template>
  <b-modal id="modal" v-model="dialog" centered>
    <template #modal-header>
      <h6 id="archiver" class="modal-title">Veuillez confirmer l'action</h6>
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="dialog = false"
      >
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <p class="mg-b-0">
        {{ message }}
      </p>
    </template>
    <template #modal-footer>
      <button
        type="button"
        class="btn btn-primary"
        data-dismiss="modal"
        @click="dialog = false"
      >
        Close
      </button>
      <button type="button" class="btn btn-danger" @click="save">
        Confirmer
      </button>
    </template>
  </b-modal>
</template>
<script>
export default {
  props: {
    id: {
      type: Number,
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
    value: Boolean,
  },
  computed: {
    dialog: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
  methods: {
    save() {
      this.$store.dispatch(`${this.action}`, this.id).then(({ message }) => {
        this.dialog = false
        this.$bvToast.toast(message, {
          title: "succès de l'opération".toLocaleUpperCase(),
          variant: 'success',
          solid: true,
        })
        this.$emit('confirmed')
      })
    },
  },
}
</script>
<style lang=""></style>
