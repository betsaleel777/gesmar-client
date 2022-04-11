<template>
  <div id="paneBilling" class="tab-pane">
    <v-app>
      <ul id="tabPermission" class="nav nav-line" role="tablist">
        <li class="nav-item">
          <a
            id="edrole-tab"
            class="nav-link active"
            data-toggle="tab"
            href="#edrole"
            role="tab"
            aria-controls="edrole"
            aria-selected="true"
            >Assignation par Rôle</a
          >
        </li>
        <li class="nav-item">
          <a
            id="direct-tab"
            class="nav-link"
            data-toggle="tab"
            href="#direct"
            role="tab"
            aria-controls="direct"
            aria-selected="false"
            >Assignation Directe</a
          >
        </li>
        <li class="nav-item">
          <a
            id="apercu-tab"
            class="nav-link"
            data-toggle="tab"
            href="#apercu"
            role="tab"
            aria-controls="apercu"
            aria-selected="false"
            >Aperçu</a
          >
        </li>
      </ul>
      <div id="tabPermissionContent" class="tab-content mg-t-20">
        <div
          id="edrole"
          class="tab-pane fade show active"
          role="tabpanel"
          aria-labelledby="edrole-tab"
        >
          <PermissionRole />
        </div>
        <div
          id="direct"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="direct-tab"
        >
          <PermissionDirect />
        </div>
        <div
          id="apercu"
          class="tab-pane fade"
          role="tabpanel"
          aria-labelledby="apercu-tab"
        >
          <PermissionShow />
        </div>
      </div>
    </v-app>
  </div>
</template>
<script>
import PermissionRole from './permissions-tabs/PermissionRole.vue'
import PermissionDirect from './permissions-tabs/PermissionDirect.vue'
import PermissionShow from './permissions-tabs/PermissionShow.vue'
export default {
  components: {
    PermissionRole,
    PermissionDirect,
    PermissionShow,
  },
  provide() {
    return {
      id: this.id,
    }
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
}
</script>
<style></style>
