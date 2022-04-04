<template>
  <div id="paneNotification" class="tab-pane">
    <h6 class="tx-uppercase tx-semibold tx-color-01 mg-b-0">
      Parametre de notification
    </h6>
    <hr />
    <div class="form-settings mx-wd-100p">
      <div class="form-group">
        <label class="form-label mg-b-2">Alertes de sécurité</label>
        <p class="tx-sm tx-color-04">
          Recevoir les alertes de sécurité par email
        </p>

        <div class="custom-control custom-checkbox">
          <input
            id="customCheck1"
            type="checkbox"
            class="custom-control-input"
          />
          <label class="custom-control-label" for="customCheck1"
            >Email each time a vulnerability is found</label
          >
        </div>
        <div class="custom-control custom-checkbox">
          <input
            id="customCheck2"
            type="checkbox"
            class="custom-control-input"
          />
          <label class="custom-control-label" for="customCheck2"
            >Email a digest summary of vulnerabilities</label
          >
        </div>
      </div>
      <!-- form-group -->

      <div class="form-group">
        <label class="form-label">SMS Notifications</label>
        <ul class="list-group list-group-notification">
          <li class="list-group-item">
            <p class="mg-b-0">Comments</p>
            <div class="custom-control custom-switch">
              <input
                id="customSwitch1"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="customSwitch1"
                >&nbsp;</label
              >
            </div>
          </li>
          <li class="list-group-item">
            <p class="mg-b-0">Updates From People</p>
            <div class="custom-control custom-switch">
              <input
                id="customSwitch2"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="customSwitch2"
                >&nbsp;</label
              >
            </div>
          </li>
          <li class="list-group-item">
            <p class="mg-b-0">Reminders</p>
            <div class="custom-control custom-switch">
              <input
                id="customSwitch3"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="customSwitch3"
                >&nbsp;</label
              >
            </div>
          </li>
          <li class="list-group-item">
            <p class="mg-b-0">Events</p>
            <div class="custom-control custom-switch">
              <input
                id="customSwitch4"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="customSwitch4"
                >&nbsp;</label
              >
            </div>
          </li>
          <li class="list-group-item">
            <p class="mg-b-0">Pages You Follow</p>
            <div class="custom-control custom-switch">
              <input
                id="customSwitch5"
                type="checkbox"
                class="custom-control-input"
              />
              <label class="custom-control-label" for="customSwitch5"
                >&nbsp;</label
              >
            </div>
          </li>
        </ul>
      </div>
      <!-- form-group -->
    </div>
    <!-- form-setting -->
  </div>
</template>
<script>
export default {}
</script>
<style lang=""></style>
