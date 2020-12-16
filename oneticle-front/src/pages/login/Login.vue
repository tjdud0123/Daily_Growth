<template>
  <div id="login-page">
    <top-bar class="p-fixed top"></top-bar>
    <div class="container pt-5 has-top">
      <h2 class="font-weight-bold text-left mb-5 mt-2">이메일로 로그인</h2>
      <line-input
        title="이메일"
        placeholder="이메일을 입력해주세요"
        @setValue="setEmail"
        :isDanger="invalidEmail"
        dangerText="존재하지 않는 유저이거나 이메일 형식이 아닙니다."
      ></line-input>
      <line-input
        title="패스워드"
        placeholder="패스워드를 입력해주세요"
        @setValue="setPassword"
        :isDanger="invalidPassword"
        type="password"
        dangerText="비밀번호가 일치하지 않습니다."
      ></line-input>

      <b-button
        @click.prevent="onLogin"
        class="mt-4 font-weight-bold w-75 bg-gray-dark p-4 text-white"
        :class="{ active: loginFormData.email && loginFormData.password }"
        >로그인하기</b-button
      >
    </div>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
  </div>
</template>

<script>
import resMsg from '../../api/responseMessage';
import TopBar from '../../components/TopBar';
import LineInput from '../../components/LineInput';
import { signInApi } from '../../api/userApi';
export default {
  name: 'Login',
  props: {},
  data() {
    return {
      isLoading: false,
      loginFormData: {
        email: '',
        password: '',
      },
      notEmail: false,
      invalidEmail: false,
      invalidPassword: false,
    };
  },
  components: { TopBar, LineInput },

  methods: {
    async onLogin() {
      this.isLoading = true;
      const response = await signInApi(this.loginFormData);
      console.log(response);
      // 성공
      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        this.$router.push({ path: 'home' });
        this.isLoading = false;
        return;
      }
      //실패
      if (response === resMsg.NO_USER) {
        this.invalidEmail = true;
      } else if (response === resMsg.MISS_MATCH_PW) {
        this.invalidPassword = true;
      }
      this.isLoading = false;
    },
    clearState() {
      this.invalidEmail = false;
      this.invalidPassword = false;
    },
    setEmail(value) {
      this.loginFormData.email = value;
    },
    setPassword(value) {
      this.loginFormData.password = value;
    },
  },
  watch: {
    loginFormData: {
      handler: function(val, oldVal) {
        this.clearState();
      },
      deep: true, // '객체 주소값'이 아닌 '값'까지 비교할 때
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './Login.scss';
</style>
