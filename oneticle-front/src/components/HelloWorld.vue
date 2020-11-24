<template>
  <Fragment>
    <h1>{{ msg }}</h1>
    <b-button type="is-primary">Primary</b-button>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
  components: {
    Fragment,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './HelloWorld.scss';
</style>
