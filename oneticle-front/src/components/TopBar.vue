<template>
  <div id="topBar" class="d-flex justify-content-between align-items-center">
    <img
      v-if="left"
      src="../assets/icon/back_arrow.png"
      alt="back"
      id="back_arrow"
      @click="goBack"
    />
    <h3 class="m-0 font-weight-bold text-truncate text-dark">
      {{ title }}
    </h3>
    <h4
      class="m-0 p-3 font-weight-bold c-pointer"
      :class="{ 'text-dark': canNext }"
      style="width:66px"
      @click="goNext"
    >
      {{ rightText }}
    </h4>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    // show Type
    title: {
      type: String,
      default: '',
    },
    left: {
      type: Boolean,
      default: true,
    },
    rightText: {
      type: String,
      default: '',
    },

    // route Type
    backRoute: {
      type: Boolean,
      default: true,
    },

    // avail Next
    canNext: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goBack() {
      this.backRoute ? this.goBackPage() : this.goBackStep();
    },
    goBackPage() {
      this.$router.go(-1);
    },
    goBackStep() {
      this.$emit('backStep');
    },
    goNext() {
      if (this.canNext) {
        this.$emit('goNext');
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#back_arrow {
  height: 100%;
  cursor: pointer;
}
#topBar {
  max-width: 375px;
  height: 50px;
  width: 100vw;
}
h4 {
  color: #b5b5b5;
}
h3 {
  max-width: 200px;
}
</style>
