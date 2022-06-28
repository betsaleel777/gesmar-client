<template>
  <div class="header">
    <div class="header-left">
      <a class="burger-menu" @click="sidebarHide = !sidebarHide">
        <feather type="menu" />
      </a>
    </div>
    <!-- header-left -->
    <div class="header-right">
      <!-- <a href="" class="header-help-link"><i data-feather="help-circle"></i></a> -->
      <div class="dropdown dropdown-notification">
        <a href="" class="dropdown-link new" data-toggle="dropdown"
          ><feather type="bell"
        /></a>
        <div class="dropdown-menu dropdown-menu-right">
          <div class="dropdown-menu-header">
            <h6>Notifications</h6>
            <a href=""><feather type="more-vertical" /></a>
          </div>
          <!-- dropdown-menu-header -->
          <div class="dropdown-menu-body">
            <a href="" class="dropdown-item">
              <div class="avatar">
                <span
                  class="avatar-initial rounded-circle text-primary bg-primary-light"
                  >s</span
                >
              </div>
              <div class="dropdown-item-body">
                <p>
                  <strong>Socrates Itumay</strong> marked the task as completed.
                </p>
                <span>5 hours ago</span>
              </div>
            </a>
            <a href="" class="dropdown-item">
              <div class="avatar">
                <span
                  class="avatar-initial rounded-circle tx-pink bg-pink-light"
                  >r</span
                >
              </div>
              <div class="dropdown-item-body">
                <p>
                  <strong>Reynante Labares</strong> marked the task as
                  incomplete.
                </p>
                <span>8 hours ago</span>
              </div>
            </a>
            <a href="" class="dropdown-item">
              <div class="avatar">
                <span
                  class="avatar-initial rounded-circle tx-success bg-success-light"
                  >d</span
                >
              </div>
              <div class="dropdown-item-body">
                <p>
                  <strong>Dyanne Aceron</strong> responded to your comment on
                  this <strong>post</strong>.
                </p>
                <span>a day ago</span>
              </div>
            </a>
            <a href="" class="dropdown-item">
              <div class="avatar">
                <span
                  class="avatar-initial rounded-circle tx-indigo bg-indigo-light"
                  >k</span
                >
              </div>
              <div class="dropdown-item-body">
                <p>
                  <strong>Kirby Avendula</strong> marked the task as incomplete.
                </p>
                <span>2 days ago</span>
              </div>
            </a>
          </div>
          <!-- dropdown-menu-body -->
          <div class="dropdown-menu-footer">
            <a href="">View All Notifications</a>
          </div>
        </div>
        <!-- dropdown-menu -->
      </div>
      <div class="dropdown dropdown-loggeduser">
        <a href="" class="dropdown-link" data-toggle="dropdown">
          <div class="avatar avatar-sm">
            <img
              v-if="user.avatar"
              :src="baseURL + 'storage/' + user.avatar"
              class="rounded-circle"
              alt=""
            />
            <img
              v-else
              src="https://via.placeholder.com/500/637382/fff"
              class="rounded-circle"
              alt=""
            />
          </div>
          <!-- avatar -->
        </a>
        <div class="dropdown-menu dropdown-menu-right">
          <div class="dropdown-menu-header">
            <div class="media align-items-center">
              <div class="avatar">
                <img
                  v-if="user.avatar"
                  :src="baseURL + 'storage/' + user.avatar"
                  class="rounded-circle"
                  alt=""
                />
                <img
                  v-else
                  src="https://via.placeholder.com/500/637382/fff"
                  class="rounded-circle"
                  alt=""
                />
              </div>
              <!-- avatar -->
              <div class="media-body mg-l-10">
                <h6>{{ user.name }}</h6>
                <span>Administrator</span>
              </div>
            </div>
            <!-- media -->
          </div>
          <div class="dropdown-menu-body">
            <nuxt-link
              :to="`/parametre/utilisateur/${user.id}/profile`"
              class="dropdown-item"
              ><feather type="user" /> Voir le profil</nuxt-link
            >
            <nuxt-link
              :to="`/parametre/utilisateur/${user.id}/settings`"
              class="dropdown-item"
              ><feather type="briefcase" /> Paramètre de compte</nuxt-link
            >
            <!-- <a href="" class="dropdown-item"
              ><i data-feather="shield"></i> Privacy Settings</a
            > -->
            <a href="#" class="dropdown-item" @click="logout"
              ><feather type="log-out" /> deconnexion</a
            >
          </div>
        </div>
        <!-- dropdown-menu -->
      </div>
    </div>
    <!-- header-right -->
  </div>
  <!-- header -->
</template>
<script>
export default {
  data() {
    return {
      sidebarHide: false,
      baseURL: process.env.BASE_URL,
    }
  },
  head() {
    return {
      bodyAttrs: {
        class: this.sidebarHide ? 'toggle-sidebar' : '',
      },
    }
  },
  methods: {
    async logout() {
      await this.$axios.post('deconnecter', this.user)
      this.$auth.logout().then(() => {
        this.$router.push('/login')
      })
    },
  },
}
</script>
<style lang=""></style>
