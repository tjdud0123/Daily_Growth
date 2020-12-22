<template>
  <div
    id="selectBar"
    class="c-pointer mt-4 bg-gray-white d-flex align-items-center"
  >
    <div
      @click="setTab(true)"
      class="select-tab w-50 "
      :class="{ 'bg-white': totalSelected }"
    >
      전체
    </div>
    <div
      @click="setTab(false)"
      class="select-tab w-50"
      :class="{ 'bg-white': !totalSelected }"
    >
      관심글
    </div>
  </div>
</template>

<script>
export default {
  props: ['totalSelected'],
  methods: {
    setTab(totalSelected) {
      this.$emit('setTab', totalSelected);
    },
  },
};
</script>
<style lang="scss" scoped>
#selectBar {
  padding: 2px 0;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
}
.select-tab {
  border-radius: 8px;
}
</style>
