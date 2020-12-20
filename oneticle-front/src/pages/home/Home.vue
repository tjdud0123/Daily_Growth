<template>
  <div class="container mt-5 py-2">
    <h1 class="font-weight-bold text-left my-3">
      {{ todayDate }}<br />오늘의 글
    </h1>
    <div
      id="noArticle"
      class="d-flex flex-column align-items-center"
      v-show="!noArticles"
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

export default {
  name: 'Home',
  props: {},
  data() {
    return {
      isLoading: false,
      todayArticles: [],
    };
  },
  components: { Balloon },
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
      console.log(this.todayArticles);
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
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './Home.scss';
</style>
