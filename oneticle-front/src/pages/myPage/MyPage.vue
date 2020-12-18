<template>
  <div>
    <div class="d-flex flex-column text-dark">
      <h1 class="font-weight-bold text-left mt-5 ml-3">
        마이 페이지
      </h1>
      <div
        id="myInfo"
        class="mt-3 p-4 container d-flex flex-column align-items-center"
        :class="{ invisible: isLoading }"
      >
        <div class="d-flex align-items-center mb-3">
          <div class="d-flex flex-column align-items-center mr-2">
            <span>읽은 글</span>
            <b>{{ myProfile.savedArticles }}</b>
          </div>
          <div
            id="charCircle"
            class="mx-4"
            :style="{
              backgroundImage: `url(${charSrc})`,
            }"
          ></div>
          <div class="d-flex flex-column align-items-center ml-2">
            <span>내 노트</span>
            <b>{{ myProfile.notesNum }}</b>
          </div>
        </div>
        <p class="mb-4 mt-2">
          <b>Lv.{{ levelNum }} {{ levelTitle }} {{ myProfile.userName }}</b
          >님
        </p>
        <b-progress
          :value="progressValue"
          class="w-100 mb-2 "
          type="is-primary"
        ></b-progress>
        <small class="text-sub">
          다음 레벨까지 <b>{{ restPoint }}포인트</b>가 필요해요
        </small>
      </div>
      <div id="etcMenu" class="mt-5">
        <ul class="text-left">
          <li class="p-3">내 구독 내역</li>
          <li class="p-3">내 문의</li>
          <li class="p-3">내 정보 수정</li>
          <li class="p-3" @click.prevent="onLogout">로그아웃</li>
        </ul>
      </div>
    </div>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
  </div>
</template>

<script>
import { readProfileApi } from '../../api/userApi';
import { levelInfo } from '../../common/info';
export default {
  name: 'MyPage',
  props: {},
  components: {},
  data() {
    return {
      isLoading: false,
      myProfile: {
        userName: '',
        savedArticles: 0,
        notesNum: 0,
        level: 0,
        job: '',
        jobDetail: '',
      },
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    async getProfile() {
      this.isLoading = true;
      const response = await readProfileApi();
      // 토큰 만료
      if (response.status === 401) {
        this.$router.push({ path: '/' });
        return;
      }
      this.myProfile = response.data;
      this.isLoading = false;
    },
    onLogout() {
      localStorage.setItem('token', null);
      this.$router.push({ path: '/' });
    },
  },
  computed: {
    levelTitle() {
      return levelInfo.getLevelInfo(this.myProfile.level).levelTitle;
    },
    levelNum() {
      return levelInfo.getLevelNum(this.levelLimited);
    },
    needPoint() {
      return levelInfo.getLevelInfo(this.levelLimited).needPoint;
    },
    restPoint() {
      return levelInfo.levelTable[this.levelNum + 1] - this.levelLimited;
    },
    progressValue() {
      return (
        ((this.levelLimited - levelInfo.levelTable[this.levelNum]) * 100) /
        (levelInfo.levelTable[this.levelNum + 1] -
          levelInfo.levelTable[this.levelNum])
      );
    },
    charSrc() {
      return levelInfo.getCharSrc(this.myProfile.job, this.levelTitle);
    },
    levelLimited() {
      return Math.min(this.myProfile.level, 20850);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './MyPage.scss';
</style>
