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
            v-can="permissions.exploitation.acceder"
            class="nav-item"
            :class="{ show: active.exploitation }"
            @click="activer('exploitation')"
          >
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^exploitation/) }"
              ><feather type="activity" />Exploitation</a
            >
            <nav v-can="permissions.exploitation.reception.acceder" class="nav nav-sub">
              <nuxt-link
                to="/exploitation/reception"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-reception' }"
                >Reception</nuxt-link
              >
            </nav>
            <nav v-can="permissions.exploitation.ordonnancements.acceder" class="nav nav-sub">
              <nuxt-link
                to="/exploitation/ordonnancement"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-ordonnancement' }"
                >Ordonnancement</nuxt-link
              >
            </nav>
            <nav v-can="permissions.exploitation.maintenance.acceder" class="nav nav-sub">
              <nuxt-link
                to="/exploitation/maintenance"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-maintenance' }"
                >Maintenance d'infracstructure</nuxt-link
              >
            </nav>
          </li>
          <li
            v-can="permissions.finance.acceder"
            class="nav-item"
            :class="{ show: active.finance }"
            @click="activer('finance')"
          >
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^finance/) }">
              <feather type="dollar-sign" />Finances & quittancement</a
            >
            <nav v-can="permissions.finance.facturation.acceder" class="nav nav-sub">
              <nuxt-link
                to="/finance/facture"
                class="nav-sub-link"
                :class="{ active: $route.name === 'finance-facture' }"
                >Facturation</nuxt-link
              >
            </nav>
            <nav v-can="permissions.finance.bordereaux.acceder" class="nav nav-sub">
              <nuxt-link
                to="/finance/bordereau"
                class="nav-sub-link"
                :class="{ active: $route.name === 'finance-bordereau' }"
                >Bordereaux</nuxt-link
              >
            </nav>
            <nav v-can="permissions.finance.caisse.acceder" class="nav nav-sub">
              <nuxt-link
                to="/finance/caisse"
                class="nav-sub-link"
                :class="{ active: $route.name === 'finance-caisse' }"
                >Caisse</nuxt-link
              >
            </nav>
          </li>
          <li
            v-can="permissions.parametre.acceder"
            class="nav-item"
            :class="{ show: active.setting }"
            @click="activer('setting')"
          >
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^parametre/) }"
              ><feather type="settings" />Paramètres</a
            >
            <nav v-can="permissions.parametre.utilisateur.acceder" class="nav nav-sub">
              <nuxt-link
                to="/parametre/utilisateur"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-utilisateur' }"
                >Utilisateur & fonctions</nuxt-link
              >
            </nav>
            <nav v-can="permissions.parametre.configuration.acceder" class="nav nav-sub">
              <nuxt-link
                to="/parametre/architecture"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-architecture' }"
                >Configuration de Marché</nuxt-link
              >
            </nav>
            <nav v-can="permissions.parametre.gabaris.acceder" class="nav nav-sub">
              <nuxt-link
                to="/parametre/template"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-template' }"
                >Gabaris de documents</nuxt-link
              >
            </nav>
            <nav v-can="permissions.parametre.caisse.acceder" class="nav nav-sub">
              <nuxt-link
                to="/parametre/caisse"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-caisse' }"
                >Caisse</nuxt-link
              >
            </nav>
            <nav v-can="permissions.parametre.application.acceder" class="nav nav-sub">
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
    <!-- sidebar-body -->
  </div>
  <!-- sidebar -->
</template>
<script>
import { parametre, exploitation, finance } from '~/helper/permissions'
export default {
  data() {
    return {
      active: {
        exploitation: false,
        finance: false,
        paiement: false,
        outils: false,
        setting: false,
      },
      permissions: {
        parametre,
        exploitation,
        finance,
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
