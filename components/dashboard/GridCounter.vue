<template>
  <div class="card card-hover card-pie-one">
    <div class="card-header bg-transparent pa-1">
      <div class="card-title row align-items-center">
        <div class="col-sm-9">
          <h6 class="mg-b-0">{{ options.title }}</h6>
        </div>
        <div class="col-sm-3">
          <v-app>
            <div class="d-flex flex-row-reverse">
              <v-menu
                ref="menu"
                v-model="menu"
                left
                :close-on-content-click="false"
                :return-value.sync="dates"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-btn icon x-small v-bind="attrs" v-on="on">
                    <v-icon>mdi-calendar-blank-outline</v-icon>
                  </v-btn>
                </template>
                <v-date-picker v-model="dates" locale="fr" color="blue darken-4" range no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="warning" @click="closeMenu()"> Annuler </v-btn>
                  <v-btn :disabled="dates.length < 2" text color="success" @click="setMenu()"> OK </v-btn>
                </v-date-picker>
              </v-menu>
              <v-btn icon x-small @click="refresh">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </div>
          </v-app>
        </div>
      </div>
    </div>
    <b-overlay :show="loading[options.key]" spinner-variant="primary" rounded="sm">
      <div class="card-body pie-body pa-4">
        <div class="row row-sm">
          <div class="col-4">
            <p v-b-tooltip.hover :title="options.firstPercentName" class="tx-12 mg-b-5 text-truncate">
              {{ options.firstCount }} {{ options.firstPercentName }}
            </p>
            <h4>
              <span>{{ firstPercent }}%</span>
            </h4>
            <b-progress
              variant="warning"
              height="4px"
              :value="options.firstCount"
              :max="maxCount"
            ></b-progress>
          </div>
          <div class="col-4">
            <p v-b-tooltip.hover :title="options.secondPercentName" class="tx-12 mg-b-5 text-truncate">
              {{ options.secondCount }} {{ options.secondPercentName }}
            </p>
            <h4>
              <span class="mr-2">{{ secondPercent }}%</span>
            </h4>
            <b-progress
              variant="primary"
              height="4px"
              :value="options.secondCount"
              :max="maxCount"
            ></b-progress>
          </div>
          <div class="col-4">
            <vue-progress
              style="width: inherit"
              :size="80"
              :legend="true"
              :determinate="false"
              :thickness="2.5"
              :gap="3"
              line-mode="in 10"
              :data="progressData"
            >
              <template #legend-caption>
                <h4 slot="legend-caption" class="my-0">{{ maxCount }}</h4>
                <small slot="legend-caption" class="">Total</small>
              </template>
            </vue-progress>
          </div>
        </div>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { VueEllipseProgress } from 'vue-ellipse-progress'
import { MODULES } from '~/helper/modules-types'
export default {
  components: { VueProgress: VueEllipseProgress },
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    menu: false,
    dates: [],
  }),
  computed: {
    ...mapGetters({ loading: MODULES.DASHBOARD.RECEPTION.GETTERS.LOADING }),
    maxCount() {
      return this.options.firstCount + this.options.secondCount
    },
    firstPercent() {
      return this.maxCount !== 0 ? Math.floor((this.options.firstCount / this.maxCount) * 100) : 0
    },
    secondPercent() {
      return this.maxCount !== 0 ? Math.floor((this.options.secondCount / this.maxCount) * 100) : 0
    },
    progressData() {
      return [
        { color: '#FEB019', progress: this.firstPercent },
        { color: '#008FFB', progress: this.secondPercent },
      ]
    },
    module() {
      if (this.options.key === 'validation') return MODULES.DASHBOARD.RECEPTION.ACTIONS.VALIDATION_RATE
      else if (this.options.key === 'conversion') return MODULES.DASHBOARD.RECEPTION.ACTIONS.CONVERSION_RATE
      else if (this.options.key === 'busy') return MODULES.DASHBOARD.RECEPTION.ACTIONS.BUSY_RATE
      else if (this.options.key === 'equipped') return MODULES.DASHBOARD.RECEPTION.ACTIONS.EQUIPPED_RATE
      else if (this.options.key === 'linked') return MODULES.DASHBOARD.RECEPTION.ACTIONS.LINKED_RATE
      else return MODULES.DASHBOARD.RECEPTION.ACTIONS.SUBSCRIBED_RATE
    },
    // pieOptions() {
    //   return {
    //     chartOptions: {
    //       chart: {
    //         type: 'pie',
    //         width: '100%',
    //       },
    //       labels: [this.options.firstPercentName, this.options.secondPercentName],
    //       legend: { show: false },
    //       colors: ['#FEB019', '#008FFB'],
    //     },
    //     series: [this.options.firstCount, this.options.secondCount],
    //   }
    // },
  },
  methods: {
    closeMenu() {
      this.menu = false
      this.dates.splice(0)
    },
    setMenu() {
      this.$refs.menu.save(this.dates)
      this.$store.dispatch(this.module, this.dates)
    },
    refresh() {
      this.$store.dispatch(this.module)
    },
  },
}
</script>

<style scoped></style>
