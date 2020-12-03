<template>
  <Fragment>
    <h1>MyPage</h1>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';
export default {
  name: 'MyPage',
  props: {},
  components: {
    Fragment,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './MyPage.scss';
</style>
