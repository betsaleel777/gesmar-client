<template>
  <div id="paneAccount" class="tab-pane">
    <h6 class="tx-uppercase tx-semibold tx-color-01 mg-b-0">Compte</h6>
    <hr />
    <div class="form-settings">
      <div class="form-group">
        <label class="form-label text-danger">Supprimer le compte</label>
        <p class="tx-sm tx-color-04">
          Une fois que vous supprimez votre compte, il n'y a pas de retour en arrière. S'il vous plaît soyez
          certain.
        </p>
        <button href="#modal" data-toggle="modal" class="btn btn-sm btn-danger">suppression du compte</button>
        <div
          id="modal"
          class="modal fade"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h6 id="exampleModalLabel" class="modal-title">Confirmation de suppression</h6>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true"><feather type="x" /></span>
                </button>
              </div>
              <div class="modal-body">
                <p class="mg-b-0">
                  Voulez vous réelement supprimer le compte de l'utilisateur:
                  <b>{{ nom }}</b>
                </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" @click="save">Confirmer</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- form-group -->
    </div>
    <!-- form-settings -->
  </div>
</template>
<script>
export default {
  props: {
    nom: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    save() {
      // supprimer le compte définitivement , si c'est l'utilisateur en cours c'est suivit de la déconnexion de ce dernier
    },
  },
}
</script>
<style lang=""></style>
