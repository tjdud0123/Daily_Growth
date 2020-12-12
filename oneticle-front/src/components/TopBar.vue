<template>
  <div id="topBar" class="d-flex justify-content-between align-items-center">
    <img
      v-if="left"
      src="../assets/icon/back_arrow.png"
      alt="back"
      id="back_arrow"
      @click="goBack"
    />
    <h3 class="m-0 font-weight-bold">{{ title }}</h3>
    <h4 class="m-0 p-3" style="width:66px">{{ rightText }}</h4>
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
  },
  components: {},

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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#back_arrow {
  height: 100%;
}
#topBar {
  height: 50px;
  width: 100vw;
}
</style>
