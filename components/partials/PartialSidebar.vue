<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <div>
        <nuxt-link to="/" class="sidebar-logo"><span>Gesmar</span></nuxt-link>
        <small class="sidebar-logo-headline">(site user)</small>
      </div>
    </div>
    <!-- sidebar-header -->
    <perfect-scrollbar>
      <div id="dpSidebarBody" class="sidebar-body">
        <ul class="nav nav-sidebar">
          <!-- <li class="nav-label">
            <label class="content-label">Parametres</label>
          </li> -->
          <li class="nav-item" :class="{ show: active.exploitation }" @click="activer('exploitation')">
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^exploitation/) }"
              ><feather type="activity" /> Exploitation</a
            >
            <nav class="nav nav-sub">
              <nuxt-link
                to="/exploitation/reception"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-reception' }"
                >Reception</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link
                to="/exploitation/ordonnancement"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-ordonnancement' }"
                >ordonnancement</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link
                to="/exploitation/maintenance"
                class="nav-sub-link"
                :class="{ active: $route.name === 'exploitation-maintenance' }"
                >Maintenance d'infracstructure</nuxt-link
              >
            </nav>
          </li>
          <li class="nav-item" :class="{ show: active.finance }" @click="activer('finance')">
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^finance/) }">
              <feather type="dollar-sign" />Finances & quittancement</a
            >
            <nav class="nav nav-sub">
              <nuxt-link
                to="/finance/facture"
                class="nav-sub-link"
                :class="{ active: $route.name === 'finance-facture' }"
                >Facturation</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link
                to="/finance/bordereau"
                class="nav-sub-link"
                :class="{ active: $route.name === 'finance-bordereau' }"
                >Bordereaux</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link">Caisse</nuxt-link>
            </nav>
          </li>
          <!-- <li
            class="nav-item"
            :class="{ show: active.paiement }"
            @click="activer('paiement')"
          >
            <a class="nav-link with-sub">
              <feather type="file-text" />Comptabilité & Paiement</a
            >
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link"
                >Encaissement/Paiement</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link"
                >Encaissement Mobile & TPE</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link"
                >Export/Import SAGE</nuxt-link
              >
            </nav>
          </li> -->
          <!-- <li
            class="nav-item"
            :class="{ show: active.outils }"
            @click="activer('outils')"
          >
            <a class="nav-link with-sub">
              <feather type="cpu" />Outils & Taches</a
            >
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link"
                >Quittancement Automatique</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link"
                >Génération d’Emplacements</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link"
                >Génération d’Emplacements</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link"
                >Devis de Location</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link"
                >Révision de Loyers & Indice</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link">Forums</nuxt-link>
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link to="" class="nav-sub-link">Répertoire</nuxt-link>
            </nav>
          </li> -->
          <li class="nav-item" :class="{ show: active.setting }" @click="activer('setting')">
            <a class="nav-link with-sub" :class="{ active: $route.name.match(/^parametre/) }"
              ><feather type="settings" />Paramètres</a
            >
            <nav class="nav nav-sub">
              <nuxt-link
                to="/parametre/utilisateur"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-utilisateur' }"
                >Utilisateur & fonctions</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link
                to="/parametre/architecture"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-architecture' }"
                >Configuration de Marché</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link
                to="/parametre/template"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-template' }"
                >Gabaris de documents</nuxt-link
              >
            </nav>
            <nav class="nav nav-sub">
              <nuxt-link
                to="/parametre/caisse"
                class="nav-sub-link"
                :class="{ active: $route.name === 'parametre-template' }"
                >Caisse</nuxt-link
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
