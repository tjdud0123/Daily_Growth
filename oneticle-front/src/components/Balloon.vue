<template>
  <div class="balloon bg-success text-white text-nowrap py-3 px-5 mb-4">
    {{ text }}
    <div class="triangle"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      defualt: '',
    },
  },
};
</script>

<style lang="scss" scoped>
.balloon {
  border-radius: 10px;
  width: 80%;
  min-width: 130px;
  max-width: 570px;
  position: relative;
}

.triangle {
  position: absolute;
  background-color: #08d50d;
  text-align: left;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
}
.triangle:before,
.triangle:after {
  content: '';
  position: absolute;
  background-color: inherit;
}
.triangle,
.triangle:before,
.triangle:after {
  width: 20px;
  height: 20px;
  border-top-right-radius: 40%;
}

.triangle {
  transform: rotate(0deg) skewX(-30deg) scale(1, 0.866);
}
.triangle:before {
  transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707)
    translate(0, -50%);
}
.triangle:after {
  transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
}
</style>
