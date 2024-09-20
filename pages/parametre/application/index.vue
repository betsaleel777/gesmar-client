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
                  <ImagePreview v-model="societe.logo" :error-state="errors.hasOwnProperty('logo')" />
                  <div v-if="errors.hasOwnProperty('logo')" class="text-danger text-thin" role="alert">
                    <strong>{{ errors.logo }}</strong>
                  </div>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Nom de la société<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.nom"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.hasOwnProperty('nom') }"
                    placeholder="Entrer le nom de la société"
                  />
                  <span v-if="errors.hasOwnProperty('nom')" class="invalid-feedback" role="alert">
                    <strong>{{ errors.nom }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Sigle de la société<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.sigle"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.hasOwnProperty('sigle') }"
                    placeholder="Entrer le sigle de la société"
                  />
                  <span v-if="errors.hasOwnProperty('sigle')" class="invalid-feedback" role="alert">
                    <strong>{{ errors.sigle }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Siège<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.siege"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.hasOwnProperty('siege') }"
                    placeholder="Entrer le siège de la société"
                  />
                  <span v-if="errors.hasOwnProperty('siege')" class="invalid-feedback" role="alert">
                    <strong>{{ errors.siege }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Contact mobile<span class="text-danger">*</span></label>
                  <input v-model="societe.smartphone" type="text" class="form-control" :class="{ 'is-invalid': errors.hasOwnProperty('smartphone') }" />
                  <span v-if="errors.hasOwnProperty('smartphone')" class="invalid-feedback" role="alert">
                    <strong>{{ errors.smartphone }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Téléphone fixe<span class="text-danger">*</span></label>
                  <input v-model="societe.phone" type="text" class="form-control" :class="{ 'is-invalid': errors.hasOwnProperty('phone') }" />
                  <span v-if="errors.hasOwnProperty('phone')" class="invalid-feedback" role="alert">
                    <strong>{{ errors.phone }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Email<span class="text-danger">*</span></label>
                  <input v-model="societe.email" type="text" class="form-control" :class="{ 'is-invalid': errors.hasOwnProperty('email') }" />
                  <span v-if="errors.hasOwnProperty('email')" class="invalid-feedback" role="alert">
                    <strong>{{ errors.email }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Capital<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.capital"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.hasOwnProperty('capital') }"
                    placeholder="Entrer le capital"
                  />
                  <span v-if="errors.hasOwnProperty('capital')" class="invalid-feedback" role="alert">
                    <strong>{{ errors.capital }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <div class="row">
                    <div class="col-md-6 col-sm-6">
                      <label class="form-label mg-t-10" for="postale">Boîte Postale <span class="text-danger">*</span></label>
                      <b-form-input
                        id="postale"
                        v-model="societe.boite_postale"
                        :class="{ 'is-invalid': errors.hasOwnProperty('boite_postale') }"
                        type="text"
                      ></b-form-input>
                      <span v-if="errors.hasOwnProperty('boite_postale')" class="invalid-feedback" role="alert">
                        <strong>{{ errors.boite_postale }}</strong>
                      </span>
                    </div>
                    <div class="col-md-6 col-sm-6">
                      <label class="form-label mg-t-10" for="timbre">Timbre de loyer<span class="text-danger">*</span></label>
                      <b-form-input
                        id="timbre"
                        v-model="societe.timbre_loyer"
                        type="text"
                        :class="{ 'is-invalid': errors.hasOwnProperty('timbre_loyer') }"
                      ></b-form-input>
                      <span v-if="errors.hasOwnProperty('timbre_loyer')" class="invalid-feedback" role="alert">
                        <strong>{{ errors.timbre_loyer }}</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="form-group my-1">
                  <div class="row">
                    <div class="col-md-6 col-sm-6">
                      <label class="form-label mg-t-10" for="primaire">Couleur primaire <span class="text-danger">*</span></label>
                      <b-form-input
                        id="primaire"
                        v-model="societe.primaire"
                        :class="{ 'is-invalid': errors.hasOwnProperty('primaire') }"
                        type="color"
                      ></b-form-input>
                      <span v-if="errors.hasOwnProperty('primaire')" class="invalid-feedback" role="alert">
                        <strong>{{ errors.primaire }}</strong>
                      </span>
                    </div>
                    <div class="col-md-6 col-sm-6">
                      <label class="form-label mg-t-10" for="secondaire">Couleur secondaire <span class="text-danger">*</span></label>
                      <b-form-input
                        id="secondaire"
                        v-model="societe.secondaire"
                        type="color"
                        :class="{ 'is-invalid': errors.hasOwnProperty('secondaire') }"
                      ></b-form-input>
                      <span v-if="errors.hasOwnProperty('secondaire')" class="invalid-feedback" role="alert">
                        <strong>{{ errors.secondaire }}</strong>
                      </span>
                    </div>
                  </div>
                </div>
                <button v-can="permissions.edit" :disabled="processing" type="button" class="btn btn-primary float-right text-white mt-2" @click="save">
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
import { application } from '~/helper/permissions'
import { MODULES } from '~/helper/modules-types'
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
      primaire: null,
      secondaire: null,
      boite_postale: '',
      timbre_loyer: 0,
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
      this.fillErrors([{}])
      traiter(data)
        .then(({ message }) => {
          this.$notify({ text: message, title: "succès de l'opération", type: 'success' })
        })
        .catch((err) => {
          this.fillErrors(err.response.data.errors)
        })
        .finally(() => (this.processing = false))
    },
  },
}
</script>
<style></style>
