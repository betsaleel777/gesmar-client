<template>
  <div class="login-layout">
    <notifications classes="n-light" />
    <nuxt />
  </div>
</template>
<style scoped>
.login-layout {
  height: 100vh;
  background-color: aliceblue;
}
.n-light {
  margin: 10px;
  margin-bottom: 0;
  border-radius: 3px;
  font-size: 13px;
  padding: 10px 20px;
  color: #495061;
  background: #eaf4fe;
  border: 1px solid #d4e8fd;
  .notification-title {
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 10px;
    color: #2589f3;
  }
  &.success {
    color: #495061;
    background: #eafeed;
    border: 1px solid #abfcb6;
    .notification-title {
      color: #00be03;
    }
  }
  &.warning {
    color: #495061;
    background: #fff5cf;
    border: 1px solid #ffe89c;
    .notification-title {
      color: #cc9900;
    }
  }
  &.error {
    color: #495061;
    background: #ffcfcf;
    border: 1px solid #fe8f8f;
    .notification-title {
      color: #dc0000;
    }
  }
}
</style>
