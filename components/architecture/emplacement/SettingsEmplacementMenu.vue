<template>
  <div class="content-right content-right-components">
    <label>Options d'emplacement</label>
    <nav id="navSection" class="nav flex-column">
      <a
        href="/architecture/setting/emplacement/index?tab=1"
        class="nav-link"
        :class="activeTab === 1 ? 'active' : ''"
        >Type d'emplacement</a
      >
      <a
        href="/architecture/setting/emplacement/index?tab=2"
        class="nav-link"
        :class="activeTab === 2 ? 'active' : ''"
        >Equipements</a
      >
      <a
        href="/architecture/setting/emplacement/index?tab=3"
        class="nav-link"
        :class="activeTab === 3 ? 'active' : ''"
        >Type d'équipements</a
      >
    </nav>
  </div>
</template>
<script>
export default {
  props: {
    activeTab: {
      type: Number,
      default: 0,
    },
  },
  emits: ['switch'],
}
</script>
<style lang=""></style>
