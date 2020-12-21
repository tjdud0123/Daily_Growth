<template>
  <div class="container mt-5 py-2">
    <h1 class="font-weight-bold text-left my-3">
      {{ todayDate }}<br />오늘의 글
    </h1>

    <div
      id="content-container"
      v-if="
        !isLoading &&
          !isRestToday &&
          isArriveTime &&
          (savedArticle || !noArticles)
      "
      class="mt-5"
    >
      <!-- 스와이프 -->
      <div id="swipe-container" v-if="!savedArticle">
        <swiper ref="swiper" class="swiper" :options="swiperOption">
          <swiper-slide
            class="d-flex justify-content-center"
            v-for="(value, index) in todayArticles"
            v-bind:key="index"
            ><card
              @click.native="saveArticle(value.article_id)"
              :article="value"
            ></card
          ></swiper-slide>
          <swiper-slide class="d-flex justify-content-center">
            <div
              id="blankCard"
              class="flex-center flex-column text-dark"
              @click="setRest"
            >
              마음에 드는 글이 없나요?
              <span class="text-primary font-weight-bold mt-2"
                >오늘은 넘어가기</span
              >
            </div>
          </swiper-slide>
        </swiper>
        <small class="mt-n2"><b>스와이프</b>해서 다른 글 보기</small>
      </div>
      <!-- 저장된 글 -->
      <div
        id="saved-container"
        class="d-flex justify-content-center"
        v-if="savedArticle"
      >
        <card
          @click.native="goArticleView(savedArticle, false)"
          :article="savedArticle"
        ></card>
      </div>
    </div>

    <div
      id="noArticle"
      class="d-flex flex-column align-items-center"
      v-else-if="!isLoading"
    >
      <balloon :text="balloonMsg"></balloon>
      <img id="no-article-img" src="../../assets/home/notyet.png" alt="" />
    </div>
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
  </div>
</template>

<script>
import {
  getTodayArticlesApi,
  saveArticleApi,
  getTodaySavedApi,
  getArticleByIdApi,
} from '../../api/articleApi';
import moment from 'moment';
import 'moment/locale/ko';
import Balloon from '../../components/Balloon.vue';
import Card from '../../components/Card';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/swiper-bundle.css';

export default {
  name: 'Home',
  data() {
    return {
      isLoading: false,
      todayArticles: [],
      savedArticle: null,
      today: moment().format('L'),
      isRestToday: false,
      swiperOption: {
        speed: 400,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      },
    };
  },
  components: { Balloon, Card, Swiper, SwiperSlide },
  directives: {
    swiper: directive,
  },
  created() {
    //localStorage.removeItem('isRestToday');
    this.setIsRestToday();
  },
  async mounted() {
    if (!this.isRestToday) {
      await this.getTodaySaved();
      this.savedArticle || (await this.getTodayArticles());
    }
  },
  methods: {
    async getTodaySaved() {
      this.isLoading = true;
      const response = await getTodaySavedApi();
      // 토큰 만료
      if (response.status === 401) {
        localStorage.setItem('token', null);
        this.$router.push({ path: '/' });
        return;
      }
      if (response.length !== 0) {
        this.savedArticle = response[0];
        this.isLoading = false;
      }
    },
    async getTodayArticles() {
      this.isLoading = true;
      const response = await getTodayArticlesApi();
      // 토큰 만료
      if (response.status === 401) {
        localStorage.setItem('token', null);
        this.$router.push({ path: '/' });
        return;
      }
      this.todayArticles = response.data;
      this.isLoading = false;
    },

    async saveArticle(aid) {
      this.isLoading = true;
      const response = await saveArticleApi(aid);
      // 토큰 만료
      if (response.status === 401) {
        localStorage.setItem('token', null);
        this.$router.push({ path: '/' });
        return;
      }
      const article = await getArticleByIdApi(aid);
      this.isLoading = false;
      this.goArticleView(article, true);
    },
    goArticleView(article, isToast) {
      console.log(article, isToast);
      this.$router.push({ path: '/articleView', query: { article, isToast } });
    },
    setRest() {
      localStorage.setItem('isRestToday', this.today);
      this.isRestToday = true;
    },
    setIsRestToday() {
      this.isRestToday = localStorage.getItem('isRestToday') === this.today;
    },
  },
  computed: {
    noArticles() {
      return this.todayArticles.length === 0;
    },
    todayDate() {
      const dateArray = moment()
        .format('LLLL')
        .split(' ');
      return `${dateArray[1]} ${dateArray[2]}`;
    },
    isArriveTime() {
      const time = moment()
        .format('LT')
        .split(' ');
      return time[0] === '오후' || time[1].split(':')[0] >= 7;
    },
    balloonMsg() {
      return this.isRestToday
        ? '오늘은 쉴래요!'
        : '아직 글이 도착하지 않았어요!';
    },
  },
};
</script>

<style lang="scss" scoped>
@import './Home.scss';
</style>
