<template>
  <div class="container mt-5 py-2">
    <h1 class="font-weight-bold text-left my-3">
      {{ todayDate }}<br />오늘의 글
    </h1>
    <div class="d-flex justify-content-center w-100 mt-5"></div>
    <div id="swipe-container">
      <swiper ref="swiper" class="swiper" :options="swiperOption">
        <swiper-slide
          class="d-flex justify-content-center"
          v-for="(value, index) in todayArticles"
          v-bind:key="index"
          ><card :article="value"></card
        ></swiper-slide>
      </swiper>
      <small class="mt-n2"><b>스와이프</b>해서 다른 글 보기</small>
    </div>

    <div
      id="noArticle"
      class="d-flex flex-column align-items-center"
      v-if="!isLoading && (!isArriveTime || noArticles)"
    >
      <balloon text="아직 글이 도착하지 않았어요!"></balloon>
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
import { getTodayArticlesApi } from '../../api/articleApi';
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
  mounted() {
    this.getTodayArticles();
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
@import './Home.scss';
</style>
