<template>
  <b-modal id="modalCreateTermeContratBail" scrollable size="lg" @show="reset">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">
        Création de Terme de contrats pour emplacements
      </h5>
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
        <quill-editor
          v-model="terme.contenu"
          :options="editorOption"
          theme="snow"
        ></quill-editor>
      </form>
    </template>
    <template #modal-footer>
      <button
        type="button"
        class="btn btn-warning"
        data-dismiss="modal"
        @click="reset"
      >
        Fermer
      </button>
      <button type="button" class="btn btn-primary" @click="save">
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
const texte = `<p>
                 <b>Disposez ces différentes variables là où elles seront utilisés dans le contrat</b><br>
                 <b>$infosLocataire</b>: Les informations concernant le locataire <br />
                 <b>$serviceAnnexeInfos</b>: Le service annexe concernant le contrat <br />
                 <b>$usageLieux</b>: L'utilisation des lieux par le locataire <br/>
                 <b>$dureeContrat</b>: La date de création du contrat <br/>
                 <b>$redevance</b>: Prix en chiffre et en lettre du service annexe avec les charges<br/>
                 <b>$caution</b>: La caution en chiffre et en lettre <br/>
                 <b>$dateCreation</b>: Date à laquelle le contrat a été émis <br/>
                 <b>$nomPrenoms</b>: nom et prénoms du locataire <br/>
               </p>`
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
      contenu: texte,
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
      ajouter: 'template/terme-bail/ajouter',
    }),
    save() {
      this.ajouter({ ...this.terme, user_id: this.user.id })
        .then(({ message }) => {
          this.$bvModal.hide('modalCreateTermeContratBail')
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
    },
    reset() {
      this.terme = {
        contenu: texte,
        site_id: null,
      }
      errorsInitialise(this.errors)
      this.$bvModal.hide('modalCreateTermeContratBail')
    },
  },
}
</script>
