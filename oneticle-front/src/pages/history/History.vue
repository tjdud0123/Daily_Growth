<template>
  <div>
    <div
      v-show="!isLoading && !noHistories"
      id="history-container"
      class="w-100 pt-2"
    >
      <section id="top-section" class="container">
        <select-tab
          :totalSelected="totalSelected"
          @setTab="setTab"
        ></select-tab>
        <div
          id="week-picker"
          class="mt-4 d-flex justify-content-between align-items-center"
        >
          <i class="fas fa-chevron-left" @click="goPrevWeek"></i>
          10월 19일 ~ 10월 25일
          <i class="fas fa-chevron-right" @click="goNextWeek"></i>
        </div>
        <div
          id="charImg"
          class="w-100 mt-2"
          :style="{
            backgroundImage: `url(${charSrc})`,
          }"
        ></div>
        <div id="day-picker" class="p-2 w-100 d-flex justify-content-around">
          <div
            class="day-select font-weight-bold flex-center c-pointer"
            :class="{ 'bg-primary': index === selectedDay }"
            v-for="(value, index) in days"
            v-bind:key="index"
            @click="daySelect(index)"
          >
            {{ value }}
          </div>
        </div>
      </section>
      <section class="container py-3">
        <!-- 데이터 있을 때 -->
        <div v-if="selectedHistory" class="mt-4">
          <div class="d-flex pb-3 c-pointer" @click="goArticleView">
            <div
              id="thumbNail"
              :class="{ 'gray-border': !selectedHistory.thumbNailUrl }"
              :style="{
                backgroundImage: `url(${selectedHistory.thumbNailUrl ||
                  'https://media.vlpt.us/images/moseok/post/8f8cf8f4-66e0-436a-9e03-abf0befc8cc8/%EA%B7%B8%EB%A3%B9%2090@2x.png'})`,
              }"
            ></div>
            <h1 class="font-weight-bold text-left">
              {{ selectedHistory.articleTitle }}
            </h1>
          </div>
          <balloon
            @click.native="createNote"
            class="mt-4 c-pointer"
            :text="selectedHistory.noteContent || '아직 남긴 노트가 없네요!'"
          ></balloon>
          <div class="text-right">
            <small
              @click="createNote"
              class="text-primary font-weight-bold c-pointer"
              :class="{ 'd-none': selectedHistory.note_id }"
              >+ 노트 추가하기</small
            >
            <small
              class="text-sub"
              :class="{ 'd-none': !selectedHistory.note_id }"
              >{{ noteDate }}</small
            >
          </div>
        </div>
        <!-- 데이터 없을 때-->
        <div
          id="noTodayArticle"
          class="d-flex flex-column align-items-center"
          v-else
        >
          <balloon text="오늘은 저장한 글이 없어요"></balloon>
          <img id="no-history-img" src="../../assets/home/notyet.png" />
        </div>
      </section>
    </div>
    <!-- 노트 모달 -->
    <div id="note-container" v-show="showNote">
      <note-modal
        @closeNote="closeNote"
        :articleId="selectedHistory.article_id"
        :initialContent="selectedHistory.noteContent"
        :isNote="selectedHistory.note_id"
      ></note-modal>
    </div>
    <!-- 히스토리 없을 때 -->
    <div
      v-if="!isLoading && noHistories"
      id="noHistory"
      class="d-flex flex-column align-items-center"
    >
      <balloon text="저장한 글이 없어요"></balloon>
      <img id="no-history-img" src="../../assets/home/notyet.png" />
    </div>
    <!-- 로딩 -->
    <b-loading
      :is-full-page="true"
      v-model="isLoading"
      :can-cancel="false"
    ></b-loading>
  </div>
</template>

<script>
import { getHistoriesApi } from '../../api/historyApi';
import NoteModal from '../../components/NoteModal';
import Balloon from '../../components/Balloon.vue';
import moment from 'moment';
import 'moment/locale/ko';
import SelectTab from '../../components/selectTab.vue';
import { levelInfo } from '../../common/info';
import { readProfileApi } from '../../api/userApi';
export default {
  name: 'History',
  components: { Balloon, SelectTab, NoteModal },
  data() {
    return {
      isLoading: false,
      historise: null,
      historyDates: [],
      totalSelected: true,
      days: ['월', '화', '수', '목', '금', '토', '일'],
      selectedDay: 0,
      myProfile: {
        level: 0,
        job: '',
      },
      noteCreated: false,
      showNote: false,
      selectedHistory: {
        ArticleCreatedAt: '2020-11-23T13:52:03.000Z',
        articleTitle: '리액트 디바운싱 간단 구현 - react debounce',
        article_id: 1,
        date: '2020-11-23T14:22:38.000Z',
        isLike: 1,
        linkUrl:
          'https://velog.io/@tjdud0123/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%94%94%EB%B0%94%EC%9A%B4%EC%8B%B1-%EA%B0%84%EB%8B%A8-%EA%B5%AC%ED%98%84-react-debounce',
        noteContent: null,
        noteCreatedAt: '2020-11-23T14:11:28.000Z',
        note_id: null,
        previewText:
          '라이브러리를 사용할 수도 있지만 간단하니 디바운싱을 직접 구현해보자',
        thumbNailUrl: '',
      },
      //selectedHistory: null,
    };
  },
  async mounted() {
    await this.getHistories();
  },
  methods: {
    async getHistories() {
      this.isLoading = true;
      const response = await getHistoriesApi();
      // 토큰 만료
      if (response.status === 401) {
        localStorage.setItem('token', null);
        this.$router.push({ path: '/' });
        return;
      }
      this.historise = response.data;
      this.historyDates = response.data.map(history =>
        moment(history.date).format('LLLL'),
      );
      const profile = await readProfileApi();
      this.myProfile = profile.data;
      this.isLoading = false;
    },
    setTab(totalSelected) {
      this.totalSelected = totalSelected;
    },
    hasHistory(index) {
      return index === 0;
    },
    goPrevWeek() {
      console.log(this.historyDates);
    },
    goNextWeek() {
      console.log(this.historyDates);
    },
    daySelect(idx) {
      this.selectedDay = idx;
    },
    goArticleView() {
      this.$router.push({
        path: '/articleView',
        query: { article: this.selectedHistory, isToast: false },
      });
    },
    createNote() {
      this.showNote = true;
    },
    closeNote(isChanged) {
      isChanged && this.$emit('reCreate');
      this.showNote = false;
    },
  },
  computed: {
    noHistories() {
      return this.historise?.length === 0;
    },
    charSrc() {
      return levelInfo.getCharSrc(this.myProfile.job, this.levelTitle)[
        this.selectedHistory?.isLike ? 2 : 1
      ];
    },
    levelTitle() {
      return levelInfo.getLevelInfo(this.myProfile.level).levelTitle;
    },
    levelNum() {
      return levelInfo.getLevelNum(this.levelLimited);
    },
    levelLimited() {
      return Math.min(this.myProfile.level, 20850);
    },
    noteDate() {
      return moment(this.selectedHistory.noteCreatedAt).format('l');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './History.scss';
</style>
