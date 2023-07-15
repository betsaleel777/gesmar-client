<template>
  <b-modal id="modalCreateTermeContratAnnexe" scrollable size="lg" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création de Terme de contrats produits annexes</h5>
      <button type="button" class="close" aria-label="Close" @click="reset">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form>
        <v-app>
          <v-row>
            <v-col cols="4">
              <v-autocomplete
                v-model="terme.site_id"
                :items="marches"
                item-text="nom"
                item-value="id"
                outlined
                dense
                :error="errors.site_id.exist"
                :error-messages="errors.site_id.message"
              >
                <template #label>
                  Choix du marché
                  <span class="red--text"><strong>* </strong></span>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
        </v-app>
        <quill-editor v-model="terme.contenu" :options="editorOption" theme="snow"></quill-editor>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="reset">Fermer</button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
export default {
  components: {
    quillEditor,
  },
  props: {
    marches: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    terme: {
      contenu: null,
      site_id: null,
    },
    errors: {
      contenu: { exist: false, message: null },
      site_id: { exist: false, message: null },
    },
    editorOption: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video'],
          ['template-partediario'],
        ],
      },
    },
  }),
  methods: {
    ...mapActions({
      ajouter: 'template/terme-annexe/ajouter',
    }),
    save() {
      this.submiting = true
      this.ajouter({ ...this.terme, user_id: this.user.id })
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateTermeContratAnnexe')
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
        })
        .catch((err) => {
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
        .finally(() => (this.submiting = false))
    },
    reset() {
      this.terme = {
        contenu: null,
        site_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateTermeContratAnnexe')
    },
  },
}
</script>
