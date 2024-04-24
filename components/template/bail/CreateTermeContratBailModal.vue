<template>
  <b-modal v-model="dialog" static lazy scrollable size="xl">
    <template #modal-header>
      <h5 id="archiver" class="modal-title text-primary">Création de Terme de contrats pour emplacements</h5>
      <button type="button" class="close" aria-label="Close" @click="dialog = false">
        <span aria-hidden="true"><feather type="x" /></span>
      </button>
    </template>
    <template #default>
      <form>
        <v-app>
          <v-row>
            <v-col cols="6">
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
          <v-expansion-panels class="my-5">
            <v-expansion-panel>
              <v-expansion-panel-header>Aide</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-row>
                  <v-col>
                    <p class="subtitle-0">
                      <b>$nomComplet:</b> Le nom complet du locataire.<br />
                      <b>$adresseLocataire:</b> L'adresse du locataire.<br />
                      <b>$telephone:</b> Le téléphone du locataire.<br />
                      <b>$professionLocataire:</b> La profession du locataire.<br />
                      <b>$compteLocataire:</b> Le compte en banque du locataire.<br />
                      <b>$nationalite:</b> La nationalité du locataire.<br />
                      <b>$dateNaissance:</b> La date de naissance du locataire.<br />
                      <b>$nomCompletMere:</b>Le nom complet de la mère du locataire.<br />
                      <b>$nomCompletPere:</b> Le nom complet du père du locataire.<br />
                      <b>$nomCompletEpoux:</b> Le nom complet de l'époux du locataire.<br />
                      <b>$professionEpoux:</b> La profession de l'époux du locataire.<br />
                    </p>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col>
                    <p class="subtitle-0">
                      <b>$dateLocalisationMariage:</b> Date et lieu du mariage.<br />
                      <b>$regimeMatrimonial:</b> Régime matrimonial.<br />
                      <b>$siteVille:</b> La ville du site.<br />
                      <b>$siteCommune:</b> La commune du site.<br />
                      <b>$superficie:</b> La superficie de l'emplacement.<br />
                      <b>$codeEmplacement:</b> Le code de l'emplacement.<br />
                      <b>$contratDepart:</b> La date de départ du contrat.<br />
                      <b>$contratFin:</b> La date de fin du contrat.<br />
                      <b>$montantCaution:</b> Le montant de la caution de l'emplacement.<br />
                      <b>$dateContrat:</b> La date d'émission du contrat.<br />
                    </p>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-app>
        <quill-editor v-model="terme.contenu" :options="editorOption" theme="snow"></quill-editor>
      </form>
    </template>
    <template #modal-footer>
      <button type="button" class="btn btn-warning" data-dismiss="modal" @click="dialog = false">
        Fermer
      </button>
      <button type="button" :disabled="submiting" class="btn btn-primary text-white" @click="save">
        Valider
      </button>
    </template>
  </b-modal>
</template>
<script>
import { mapActions } from 'vuex'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import modal from '~/mixins/modal'
import { MODULES } from '~/helper/modules-types'
import { errorHandling } from '~/helper/helpers'
export default {
  components: { quillEditor },
  mixins: [modal],
  props: {
    marches: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    submiting: false,
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
    ...mapActions({ ajouter: MODULES.GABARI.ACTIONS.ADD }),
    save() {
      this.submiting = true
      this.ajouter({ ...this.terme, user_id: this.user.id })
        .then(({ message }) => {
          this.dialog = false
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.submiting = false))
    },
  },
}
</script>
