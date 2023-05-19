<template>
  <div>
    <PartialBreadcrumb :liens="liens" />
    <div class="container">
      <b-overlay :show="$fetchState.pending" rounded="sm">
        <div class="row">
          <div class="col-sm-6 col-md-3">
            <b-overlay :show="processing" rounded="sm">
              <div class="profile-sidebar-header">
                <div class="avatar">
                  <img
                    v-if="!enterprise.logo"
                    src="https://via.placeholder.com/500/637382/fff"
                    class="rounded-circle"
                    alt=""
                  />
                  <img v-else :src="enterprise.logo" class="rounded-circle" alt="" />
                </div>

                <h5 v-if="enterprise.sigle">{{ enterprise.sigle }}</h5>
                <h5 v-else>SIGLE</h5>
                <p v-if="enterprise.nom">{{ enterprise.nom }}</p>
                <p v-else>nom complet de la société</p>
                <span v-if="enterprise.siege">{{ enterprise.siege }}</span>
                <span v-else>siège de la société</span>
              </div>
              <!-- profile-sidebar-header -->
              <div class="profile-sidebar-body">
                <hr class="mg-y-25" />

                <label class="content-label text-center">Contact Information</label>
                <div class="d-flex">
                  <ul class="list-unstyled mx-auto justify-content-center">
                    <li>
                      <i data-feather="briefcase"></i>
                      <span v-if="enterprise.siege" class="tx-color-03">{{ enterprise.siege }}</span>
                      <span v-else class="tx-color-03">siège de la société</span>
                    </li>
                    <!-- <li><i data-feather="home"></i> <span class="tx-color-03">Westfield, Oakland, CA</span></li> -->
                    <li v-if="enterprise.smartphone">
                      <feather type="smartphone" :size="15" /><a href="#">{{ enterprise.smartphone }}</a>
                    </li>
                    <li v-else><feather type="smartphone" :size="15" /><a href="#">Téléphone mobile</a></li>
                    <li v-if="enterprise.phone">
                      <feather type="phone" :size="15" /><a href="#">{{ enterprise.phone }}</a>
                    </li>
                    <li v-else><feather type="phone" :size="15" /><a href="#">Téléphone fixe</a></li>
                    <li v-if="enterprise.email">
                      <feather type="mail" :size="15" /><a href="">{{ enterprise.email }}</a>
                    </li>
                    <li v-else><feather type="mail" :size="15" /><a href="">email entreprise</a></li>
                  </ul>
                </div>
              </div>
            </b-overlay>
            <!-- profile-sidebar-body -->
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
                  <label class="form-label mg-t-10"
                    >Nom de la société<span class="text-danger">*</span></label
                  >
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
                  <label class="form-label mg-t-10"
                    >Sigle de la société<span class="text-danger">*</span></label
                  >
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
                  <input
                    v-model="societe.smartphone"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.smartphone.exist }"
                  />
                  <span v-if="errors.smartphone.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.smartphone.message }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Téléphone fixe<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.phone"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.phone.exist }"
                  />
                  <span v-if="errors.phone.exist" class="invalid-feedback" role="alert">
                    <strong>{{ errors.phone.message }}</strong>
                  </span>
                </div>
                <div class="form-group my-1">
                  <label class="form-label mg-t-10">Email<span class="text-danger">*</span></label>
                  <input
                    v-model="societe.email"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.email.exist }"
                  />
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
                <button
                  :disabled="processing"
                  type="button"
                  class="btn btn-primary float-right text-white"
                  @click="save"
                >
                  enregistrer
                </button>
              </form>
            </div>
            <!-- tab-content -->
          </b-card>
          <!-- profile-body -->
        </div>
      </b-overlay>
    </div>
    <!-- content-body -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ImagePreview from '~/components/tools/ImagePreview.vue'
import PartialBreadcrumb from '~/components/partials/PartialBreadcrumb.vue'
import { errorsWriting, errorsInitialise } from '~/helper/handleErrors'
export default {
  components: {
    PartialBreadcrumb,
    ImagePreview,
  },
  data: () => ({
    liens: [{ path: '#', text: 'Application' }],
    processing: false,
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
    ...mapGetters({ enterprise: 'architecture/application/societe' }),
  },
  methods: {
    ...mapActions({
      getOne: 'architecture/application/getOne',
      ajouter: 'architecture/application/ajouter',
      modifier: 'architecture/application/modifier',
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
          this.processing = false
          this.$bvToast.toast(message, {
            title: 'succès de la création'.toLocaleUpperCase(),
            variant: 'success',
            solid: true,
          })
        })
        .catch((err) => {
          this.processing = false
          const { data } = err.response
          if (data) {
            errorsInitialise(this.errors)
            errorsWriting(data.errors, this.errors)
          }
        })
    },
  },
}
</script>
<style></style>
