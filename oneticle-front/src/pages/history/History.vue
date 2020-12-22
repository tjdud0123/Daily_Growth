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
          <i
            class="fas fa-chevron-left c-pointer"
            :class="{ 'text-gray': weekIndex === 0 }"
            @click="goPrevWeek"
          ></i>
          {{ weekArray[weekIndex] }}
          <i
            class="fas fa-chevron-right c-pointer"
            :class="{ 'text-gray': weekIndex === weekLastIdx }"
            @click="goNextWeek"
          ></i>
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
            :class="{ 'bg-primary': index === dayIndex }"
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
            id="gray-balloon"
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
          <balloon text="이 날은 저장한 글이 없어요"></balloon>
          <img id="no-history-img" src="../../assets/home/notyet.png" />
        </div>
      </section>
    </div>
    <!-- 노트 모달 -->
    <div id="note-container" v-if="showNote">
      <note-modal
        @closeNote="closeNote"
        :articleId="selectedHistory && selectedHistory.article_id"
        :initialContent="selectedHistory && selectedHistory.noteContent"
        :isNote="selectedHistory && selectedHistory.note_id"
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
  props: ['initialweekIndex', 'initialdayIndex'],
  data() {
    return {
      isLoading: false,
      historise: null,
      historyDates: [],
      weekArray: [],
      weekIndex: this.initialweekIndex,
      startDayArray: [],
      totalSelected: true,
      days: ['월', '화', '수', '목', '금', '토', '일'],
      dayIndex: this.initialdayIndex,
      myProfile: null,
      noteCreated: false,
      showNote: false,
      //selectedHistory: null,
    };
  },
  async mounted() {
    await this.getHistories();
    this.initSelectedHistory();
    this.initDates();
  },
  methods: {
    getmdd(date) {
      let initialInfo = [date];
      let dateInfo = initialInfo.concat(
        moment(date)
          .format('LLLL')
          .split(' ')
          .splice(1, 3),
      );
      return dateInfo.map(str => str.replace(/월$|일$|요일/g, ''));
    },
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
        this.getmdd(history.date),
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
      if (this.weekIndex > 0) {
        this.weekIndex--;
        this.dayIndex = 0;
      }
      this.emitIndex();
    },
    goNextWeek() {
      if (this.weekIndex < this.weekLastIdx) {
        this.weekIndex++;
        this.dayIndex = 0;
      }

      this.emitIndex();
    },
    emitIndex() {
      this.$emit('emitIndex', this.weekIndex, this.dayIndex);
    },
    daySelect(idx) {
      this.dayIndex = idx;
      this.emitIndex();
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
      if (isChanged) {
        this.emitIndex();
        this.$emit('reCreate');
      }
      this.showNote = false;
    },
    initSelectedHistory() {
      this.selectedHistory = this.historise[this.historise?.length - 1];
    },
    initDates() {
      let startDaySet = new Set();
      let weekSet = new Set();
      this.historyDates.forEach(element => {
        const dateformat = element[0];
        const day = element[3];
        const dayBefore = this.days.indexOf(day);
        const startDay = moment(dateformat)
          .subtract(dayBefore, 'days')
          .format('LL');
        const endDay = moment(dateformat)
          .add(6 - dayBefore, 'days')
          .format('LL');
        const startFormat = moment(dateformat)
          .subtract(dayBefore, 'days')
          .startOf('day')
          .format();
        startDaySet.add(startFormat);
        weekSet.add(
          `${startDay.replace(/.+년 /g, '')} ~ ${endDay.replace(/.+년 /g, '')}`,
        );
      });
      this.startDayArray = [...startDaySet];
      this.weekArray = [...weekSet];
      this.weekIndex =
        this.weekIndex === -1 ? this.weekArray.length - 1 : this.weekIndex;
    },
  },
  computed: {
    selectedDate() {
      return moment(this.startDayArray[this.weekIndex])
        .add(this.dayIndex, 'days')
        .format('L');
    },
    selectedHistory: {
      get() {
        return this.historise?.filter(
          history => moment(history.date).format('L') === this.selectedDate,
        )[0];
      },
      set() {},
    },

    noHistories() {
      return this.historise?.length === 0;
    },
    charSrc() {
      return levelInfo.getCharSrc(this.myProfile?.job, this.levelTitle)[
        this.selectedHistory?.isLike ? 2 : 1
      ];
    },
    levelTitle() {
      return levelInfo.getLevelInfo(this.myProfile?.level).levelTitle;
    },
    levelNum() {
      return levelInfo.getLevelNum(this.levelLimited);
    },
    levelLimited() {
      return Math.min(this.myProfile?.level, 20850);
    },
    noteDate() {
      return moment(this.selectedHistory?.noteCreatedAt).format('l');
    },
    weekLastIdx() {
      return this.weekArray.length - 1;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './History.scss';
</style>
