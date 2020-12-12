<template>
  <div id="login-page">
    <top-bar class="p-fixed top"></top-bar>
    <div class="container pt-5 has-top">
      <h2 class="font-weight-bold text-left mb-5 mt-2">이메일로 로그인</h2>
      <b-field
        :type="{ 'is-danger': invalidEmail }"
        label="이메일"
        class="mb-3"
        :message="{
          '존재하지 않는 유저이거나 이메일 형식이 아닙니다.': invalidEmail,
        }"
      >
        <b-input
          v-model="loginFormData.email"
          placeholder="이메일을 입력해주세요"
        ></b-input>
      </b-field>
      <b-field
        label="비밀번호"
        :type="{ 'is-danger': invalidPassword }"
        :message="{ '비밀번호가 일치하지 않습니다': invalidPassword }"
      >
        <b-input
          @change="clearState"
          v-model="loginFormData.password"
          placeholder="비밀번호를 입력해주세요"
        ></b-input>
      </b-field>
      <b-button
        @click.prevent="onLogin"
        class="mt-4 font-weight-bold w-75 bg-gray-dark p-4 text-white"
        :class="{ active: loginFormData.email && loginFormData.password }"
        >로그인하기</b-button
      >
    </div>
  </div>
</template>

<script>
import resMsg from '../../api/responseMessage';
import TopBar from '../../components/TopBar';
import { signInApi } from '../../api/userApi';
export default {
  name: 'Login',
  props: {},
  data() {
    return {
      loginFormData: {
        email: '',
        password: '',
      },
      notEmail: false,
      invalidEmail: false,
      invalidPassword: false,
    };
  },
  components: { TopBar },

  methods: {
    async onLogin() {
      const response = await signInApi(this.loginFormData);
      console.log(response);
      // 성공
      if (response.accessToken) {
        localStorage.setItem('token', response.accessToken);
        //localStorage.clear();
        this.$router.push({ path: 'home' });
        return;
      }
      //실패
      if (response === resMsg.NO_USER) {
        this.invalidEmail = true;
      } else if (response === resMsg.MISS_MATCH_PW) {
        this.invalidPassword = true;
      }
    },
    clearState() {
      console.log(this.invalidEmail);
      this.invalidEmail = false;
      this.invalidPassword = false;
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
