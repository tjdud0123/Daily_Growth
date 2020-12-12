<template>
  <div class="d-flex flex-center p-3 flex-column">
    <div class="d-flex flex-column align-items-center mt-large mb-3">
      <img
        src="../../assets/main/mainLogo.png"
        class="px-4 fade"
        id="main-logo"
        alt="mainLogo"
      />
      <small class="text-primary">새싹에서 나무까지, 원티클</small>
    </div>
    <img
      src="../../assets/main/loginBtn.png"
      class="px-4 mt-5 fade"
      id="login-btn"
      @click="goLoginPage"
      alt="mainLogo"
    />
    <div class="d-flex mt-3 align-itmes-center c-pointer" @click="goSignUpPage">
      <span class="text-sub mr-2">아직 회원이 아니세요?</span>
      <u class="text-sub">회원가입 하기</u>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {},
  components: {},
  methods: {
    goSignUpPage() {
      this.$router.push({ path: 'signUp' }).catch(err => {});
    },
    goLoginPage() {
      this.$router.push({ path: 'login' }).catch(err => {});
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './Main.scss';
</style>
