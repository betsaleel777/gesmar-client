<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div>
        <nuxt-link to="/" class="sidebar-logo"><span>Gesmar</span></nuxt-link>
        <small class="sidebar-logo-headline">{{ user.role.name }}</small>
      </div>
    </div>
    <!-- sidebar-header -->
    <perfect-scrollbar>
      <div id="dpSidebarBody" class="sidebar-body">
        <ul class="nav nav-sidebar">
          <!-- <li class="nav-label">
            <label class="content-label">Parametres</label>
          </li> -->
          <li
            v-can="accesExploitation"
            class="nav-item"
            :class="{ show: active.exploitation || $route.name.match(/^exploitation/) }"
            @click="activer('exploitation')"
          >
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^exploitation/) }"
              ><feather type="activity" />Exploitation</a
            >
            <nav v-can="accesReception" class="nav nav-sub">
              <nuxt-link
                to="/exploitation/reception"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-reception' }"
                >Reception</nuxt-link
              >
            </nav>
            <nav v-can="accesOrdonnancement" class="nav nav-sub">
              <nuxt-link
                to="/exploitation/ordonnancement"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-ordonnancement' }"
                >Ordonnancement</nuxt-link
              >
            </nav>
            <!-- <nav class="nav nav-sub">
              <nuxt-link
                to="/exploitation/maintenance"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-maintenance' }"
                >Maintenance d'infracstructure</nuxt-link
              >
            </nav> -->
          </li>
          <li
            v-can="accesFinance"
            class="nav-item"
            :class="{ show: active.finance || $route.name.match(/^finance/) }"
            @click="activer('finance')"
          >
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^finance/) }">
              <feather type="dollar-sign" />Finances & quittancement</a
            >
            <nav v-can="accesFactureFinance" class="nav nav-sub">
              <nuxt-link
                to="/finance/facture"
                class="nav-sub-link"
                :class="{ active: $route.name === 'finance-facture' }"
                >Facturation</nuxt-link
              >
            </nav>
            <nav v-can="accesBordereauFinance" class="nav nav-sub">
              <nuxt-link
                to="/finance/bordereau"
                class="nav-sub-link"
                :class="{ active: $route.name === 'finance-bordereau' }"
                >Bordereaux</nuxt-link
              >
            </nav>
            <nav v-can="accesCaisseFinance" class="nav nav-sub">
              <nuxt-link
                to="/finance/caisse"
                class="nav-sub-link"
                :class="{ active: $route.name === 'finance-caisse' }"
                >Caisse</nuxt-link
              >
            </nav>
          </li>
          <li
            v-can="accesParametre"
            class="nav-item"
            :class="{ show: active.setting || $route.name.match(/^parametre/) }"
            @click="activer('setting')"
          >
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^parametre/) }"
              ><feather type="settings" />Paramètres</a
            >
            <nav v-can="accesUtilisateur" class="nav nav-sub">
              <nuxt-link
                to="/parametre/utilisateur"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-utilisateur' }"
                >Utilisateur & fonctions</nuxt-link
              >
            </nav>
            <nav v-can="accesConfigurationParametre" class="nav nav-sub">
              <nuxt-link
                to="/parametre/architecture"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-architecture' }"
                >Configuration de Marché</nuxt-link
              >
            </nav>
            <nav v-can="accesGabarisParametre" class="nav nav-sub">
              <nuxt-link
                to="/parametre/template"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-template' }"
                >Gabaris de documents</nuxt-link
              >
            </nav>
            <nav v-can="accesCaisseParametre" class="nav nav-sub">
              <nuxt-link
                to="/parametre/caisse"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-caisse' }"
                >Caisse</nuxt-link
              >
            </nav>
            <nav v-can="accesApplicationParametre" class="nav nav-sub">
              <nuxt-link
                to="/parametre/application"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-application' }"
                >Application</nuxt-link
              >
            </nav>
          </li>
        </ul>
      </div>
    </perfect-scrollbar>
  </div>
</template>
<script>
import menu from '~/mixins/permissions/menu.js'
export default {
  mixins: [menu],
  data() {
    return {
      active: {
        exploitation: false,
        finance: false,
        paiement: false,
        outils: false,
        setting: false,
      },
    }
  },
  methods: {
    activer(link) {
      this.active[link] = !this.active[link]
      if (this.active[link]) {
        for (const key in this.active) {
          if (Object.hasOwnProperty.call(this.active, key)) {
            if (key !== link) this.active[key] = !this.active[link]
          }
        }
      }
    },
  },
}
</script>
<style lang=""></style>
