<template>
  <div>
    <div v-show="!allCompleted">
      <top-bar
        class="p-fixed top"
        rightText="다음"
        :canNext="canNext"
        @goNext="goNextStep"
        :backRoute="step === 1"
        @backStep="backStep"
      ></top-bar>
      <b-progress
        id="signUp-progress"
        type="is-primary"
        :value="step * 25"
        class="p-absolute has-top"
      ></b-progress>
    </div>
    <!-- 가입절차 -->
    <div class="container pt-5 has-top" v-if="!allCompleted">
      <div id="step-1" v-show="step === 1">
        <h2 class="font-weight-bold text-left mb-5">회원가입</h2>
        <line-input
          title="이메일"
          placeholder="이메일을 입력해주세요"
          @setValue="setEmail"
          :isDanger="alreadyId || (!noEmail && invalidEmail)"
          :isSuccess="!alreadyId && !noEmail && !invalidEmail"
          :dangerText="emailSubText"
        ></line-input>
        <line-input
          title="패스워드"
          placeholder="패스워드를 입력해주세요"
          @setValue="setPassword"
          :isDanger="!noPassword && invalidPassword"
          :isSuccess="!noPassword && !invalidPassword"
          type="password"
          dangerText="6자 이상으로 입력해주세요."
        ></line-input>
      </div>
      <div id="step-2" v-show="step === 2">
        <h2 class="font-weight-bold text-left mb-5">회원가입</h2>
        <line-input
          title="닉네임"
          placeholder="닉네임을 입력해주세요"
          @setValue="setuserName"
          :isSuccess="!noUserName"
        ></line-input>
      </div>
      <div id="step-3" v-show="step === 3">
        <h4 class="text-left mb-5"><b>직군</b>을 선택해주세요</h4>
        <ul class="mt-n3">
          <li
            v-for="(value, index) in jobList"
            v-bind:key="index"
            class="py-4"
            @click="selectJob(value)"
            :class="{ 'font-weight-bold': signUpFormData.job === value }"
          >
            {{ value }}
          </li>
        </ul>
        <img :src="jobImg" alt="character" id="job-img" />
      </div>
      <div id="step-4" v-show="step === 4">
        <h2 class="text-left mb-5"><b>세부 직군</b>을 선택해주세요</h2>
        <ul class="mt-n3">
          <li
            v-for="(value, index) in jobDetailList[signUpFormData.job]"
            v-bind:key="index"
            class="py-4 font-20"
            @click="selectJobDetail(value)"
            :class="{
              'font-weight-bold': signUpFormData.jobDetail === value,
            }"
          >
            {{ value }}
          </li>
        </ul>
      </div>
    </div>

    <!-- 완료 -->
    <div v-if="allCompleted" class="d-flex flex-center p-3 flex-column">
      <div class="d-flex flex-column align-items-center mt-large">
        <img
          src="../../assets/signUp/startChar.png"
          class="px-4 fade"
          id="start-char"
          alt="startChar"
        />
        <p class="mt-4 font-20">
          {{ signUpFormData.userName }}님의 가입이 완료되었습니다!
        </p>
      </div>
      <img
        src="../../assets/signUp/startBtn.png"
        class="px-4 mt-5 fade"
        id="start-btn"
        alt="startBtn"
        @click="goStart"
      />
    </div>
  </div>
</template>

<script>
import resMsg from '../../api/responseMessage';
import TopBar from '../../components/TopBar';
import LineInput from '../../components/LineInput';
import { signUpApi } from '../../api/userApi';
import { jobInfo } from '../../common/C';
export default {
  name: 'SignUp',
  props: {},
  components: { TopBar, LineInput },
  data() {
    return {
      step: 1,
      allCompleted: false,
      signUpFormData: {
        email: '',
        password: '',
        userName: '',
        job: '스타트업 창업',
        jobDetail: '',
      },
      jobList: jobInfo.jobList,
      jobDetailList: jobInfo.jobDetailList,
      emailSubText: '잘못된 형식의 이메일 입니다.',
      alreadyId: false,
    };
  },
  methods: {
    async onSignUp() {
      const response = await signUpApi(this.signUpFormData);
      // 성공
      if (response?.success) {
        this.allCompleted = true;
        return;
      }
      //실패
      else if (response === resMsg.ALREADY_ID) {
        this.alreadyId = true;
        this.emailSubText = resMsg.ALREADY_ID;
        this.step = 1;
      }
    },
    setEmail(value) {
      this.alreadyId = false;
      this.emailSubText = '잘못된 형식의 이메일 입니다.';
      this.signUpFormData.email = value;
    },
    setPassword(value) {
      this.signUpFormData.password = value;
    },
    setuserName(value) {
      this.signUpFormData.userName = value;
    },
    goNextStep() {
      this.step < 4 ? this.step++ : this.onSignUp();
    },
    backStep() {
      this.step--;
    },
    selectJob(job) {
      this.signUpFormData.job = job;
    },
    selectJobDetail(jobDetail) {
      this.signUpFormData.jobDetail = jobDetail;
    },
    goStart() {
      this.$router.push({ path: '/' });
    },
  },
  computed: {
    noEmail() {
      return this.signUpFormData.email === '';
    },
    invalidEmail() {
      const re = /\S+@\S+\.\S+/;
      return !re.test(this.signUpFormData.email);
    },
    noPassword() {
      return this.signUpFormData.password === '';
    },
    invalidPassword() {
      return this.signUpFormData.password.length < 6;
    },
    noUserName() {
      return this.signUpFormData.userName === '';
    },
    canGoStep2() {
      return (
        this.step === 1 &&
        !this.noEmail &&
        !this.noPassword &&
        !this.invalidEmail &&
        !this.invalidPassword
      );
    },
    canGoStep3() {
      return this.step === 2 && !this.noUserName;
    },
    canGoStep4() {
      return this.step === 3;
    },
    canGoComplete() {
      return this.step === 4 && this.signUpFormData.jobDetail !== '';
    },
    canNext() {
      return (
        this.canGoStep2 ||
        this.canGoStep3 ||
        this.canGoStep4 ||
        this.canGoComplete
      );
    },
    jobImg() {
      return require(`../../assets/signUp/char${this.jobList.indexOf(
        this.signUpFormData.job,
      )}.png`);
    },
  },
  watch: {
    signUpFormData: {
      handler: function(val, oldVal) {
        console.log(val, oldVal);
      },
      deep: true, // '객체 주소값'이 아닌 '값'까지 비교할 때
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './SignUp.scss';
</style>
