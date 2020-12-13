<template>
  <div id="login-page">
    <top-bar class="p-fixed top"></top-bar>
    <div class="container pt-5 has-top">
      <h2 class="font-weight-bold text-left mb-5 mt-2">이메일로 로그인</h2>
      <div class="input-container p-relative mt-4">
        <label class="text-left d-flex flex-column">이메일</label>
        <input
          v-model="loginFormData.email"
          placeholder="이메일을 입력해주세요"
          class="w-100 input"
          :class="{ 'is-danger': invalidEmail }"
        />
        <i
          :class="{ invisible: !invalidEmail }"
          class="fas fa-exclamation-circle text-danger p-absolute"
        ></i>
        <p
          class="help text-left text-danger ml-1"
          :class="{ invisible: !invalidEmail }"
        >
          존재하지 않는 유저이거나 이메일 형식이 아닙니다.
        </p>
      </div>

      <div class="input-container p-relative mt-3">
        <label class="text-left d-flex flex-column">패스워드</label>
        <input
          type="password"
          v-model="loginFormData.password"
          placeholder="패스워드를 입력해주세요"
          class="w-100 input"
          :class="{ 'is-danger': invalidPassword }"
        />
        <i
          :class="{ invisible: !invalidPassword }"
          class="fas fa-exclamation-circle text-danger p-absolute"
        ></i>
        <p
          class="help text-left text-danger ml-1"
          :class="{ invisible: !invalidPassword }"
        >
          비밀번호가 일치하지 않습니다
        </p>
      </div>

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
