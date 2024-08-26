<template>
  <div class="container-fluid">
    <PartialBreadcrumb :liens="liens" />
    <div class="container">
      <b-overlay :show="$fetchState.pending || processing" spinner-variant="primary" rounded="sm">
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <b-overlay :show="processing" rounded="sm">
              <div class="profile-sidebar-header">
                <div class="avatar">
                  <img v-if="!enterprise.logo" src="https://via.placeholder.com/500/637382/fff" class="rounded-circle" alt="" />
                  <img v-else :src="enterprise.logo" class="rounded-circle" alt="" />
                </div>

                <h5 v-if="enterprise.sigle">{{ enterprise.sigle }}</h5>
                <h5 v-else>SIGLE</h5>
                <p v-if="enterprise.nom">{{ enterprise.nom }}</p>
                <p v-else>nom complet de la société</p>
              </div>
              <hr class="mg-y-20" />
              <div class="profile-sidebar-body">
                <div class="row">
                  <div class="col-md-2">
                    <feather stroke-width="2" stroke="blue" size="18" type="map" />
                  </div>
                  <div class="col-md-10">
                    <h5 v-if="enterprise.siege" class="lead">{{ enterprise.siege }}</h5>
                    <h5 v-else class="lead">siège de la société</h5>
                  </div>
                  <div class="col-md-2">
                    <feather stroke-width="2" stroke="blue" size="18" type="smartphone" />
                  </div>
                  <div class="col-md-10">
                    <h5 v-if="enterprise.smartphone" class="lead">{{ enterprise.smartphone }}</h5>
                    <h5 v-else class="lead">Téléphone mobile</h5>
                  </div>
                  <div class="col-md-2">
                    <feather stroke-width="2" stroke="blue" size="18" type="phone" />
                  </div>
                  <div class="col-md-10">
                    <h5 v-if="enterprise.phone" class="lead">{{ enterprise.phone }}</h5>
                    <h5 v-else class="lead">Téléphone fixe</h5>
                  </div>
                  <div class="col-md-2">
                    <feather stroke-width="2" stroke="blue" size="18" type="mail" />
                  </div>
                  <div class="col-md-10">
                    <h5 v-if="enterprise.mail" class="lead">{{ enterprise.mail }}</h5>
                    <h5 v-else class="lead">Adresse Email</h5>
                  </div>
                </div>
              </div>
            </b-overlay>
          </div>
          <!-- profile-sidebar -->
          <b-card class="col-sm-6 col-md-9">
            <div class="container">
              <form ref="form" enctype="multipart/form-data">
                <div class="form-group my-1">
                  <ImagePreview v-model="societe.logo" :error-state="errors.logo.exist" />
                  <div v-if="errors.logo.exist" class="text-danger text-thin" role="alert">
                    <strong>{{ errors.logo.message }}</strong>
                  </div>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Nom de la société<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.nom"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.nom.exist }"
                    placeholder="Entrer le nom de la société"
                  />
                  <span v-if="errors.nom.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.nom.message }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Sigle de la société<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.sigle"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.sigle.exist }"
                    placeholder="Entrer le sigle de la société"
                  />
                  <span v-if="errors.sigle.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.sigle.message }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Siège<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.siege"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.siege.exist }"
                    placeholder="Entrer le siège de la société"
                  />
                  <span v-if="errors.siege.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.siege.message }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Contact mobile<span class="text-danger">*</span></label>
                  <input v-model="societe.smartphone" type="text" class="form-control" :class="{ 'is-invalid': errors.smartphone.exist }" />
                  <span v-if="errors.smartphone.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.smartphone.message }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Téléphone fixe<span class="text-danger">*</span></label>
                  <input v-model="societe.phone" type="text" class="form-control" :class="{ 'is-invalid': errors.phone.exist }" />
                  <span v-if="errors.phone.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.phone.message }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Email<span class="text-danger">*</span></label>
                  <input v-model="societe.email" type="text" class="form-control" :class="{ 'is-invalid': errors.email.exist }" />
                  <span v-if="errors.email.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.email.message }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Capital<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.capital"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.capital.exist }"
                    placeholder="Entrer le capital"
                  />
                  <span v-if="errors.capital.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.capital.message }}</strong>
                  </span>
                </div>
                <button v-can="permissions.edit" :disabled="processing" type="button" class="btn btn-primary float-right text-white" @click="save">
                  enregistrer
                </button>
              </form>
            </div>
          </b-card>
        </div>
      </b-overlay>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ImagePreview from '~/components/tools/ImagePreview.vue'
import { errorsInitialise } from '~/helper/handleErrors'
import { application } from '~/helper/permissions'
import { MODULES } from '~/helper/modules-types'
import { errorHandling } from '~/helper/helpers'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
export default {
  components: { ImagePreview, PartialBreadcrumb },
  data: () => ({
    liens: [{ path: '#', text: "Paramétrage de l'application" }],
    processing: false,
    permissions: application,
    societe: {
      nom: '',
      sigle: '',
      siege: '',
      smartphone: '',
      phone: '',
      email: '',
      logo: null,
      capital: null,
    },
    errors: {
      nom: { exist: false, message: null },
      sigle: { exist: false, message: null },
      siege: { exist: false, message: null },
      smartphone: { exist: false, message: null },
      phone: { exist: false, message: null },
      email: { exist: false, message: null },
      capital: { exist: false, message: null },
      logo: { exist: false, message: null },
    },
  }),
  async fetch() {
    await this.getOne()
    this.societe = Object.assign({}, this.enterprise)
  },
  computed: {
    ...mapGetters({ enterprise: MODULES.APPLICATION.GETTERS.SOCIETE }),
  },
  methods: {
    ...mapActions({
      getOne: MODULES.APPLICATION.ACTIONS.ONE,
      ajouter: MODULES.APPLICATION.ACTIONS.ADD,
      modifier: MODULES.APPLICATION.ACTIONS.EDIT,
    }),
    save() {
      this.processing = true
      const data = new FormData()
      for (const key in this.societe) {
        data.append(key, this.societe[key])
      }
      const traiter = this.societe.id ? this.modifier : this.ajouter
      errorsInitialise(this.errors)
      traiter(data)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
        })
        .catch((err) => {
          errorHandling(err.response, this.errors)
        })
        .finally(() => (this.processing = false))
    },
  },
}
</script>
<style></style>
