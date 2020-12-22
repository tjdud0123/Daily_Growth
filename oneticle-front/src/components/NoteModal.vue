<template>
  <div>
    <div class="modal-bg">
      <div id="white-section" class="bg-white w-100 pb-5">
        <top-bar
          rightText="작성"
          :canNext="canComplete"
          @goNext="noteComplete"
          :backRoute="false"
          @backStep="closeNote"
        ></top-bar>
        <div class="container mt-5">
          <h1 class="text-left">
            내 노트 작성
            <img id="pen" src="../assets/icon/pen.png" alt="pen-icon" />
          </h1>

          <textarea
            ref="textArea"
            v-model="noteContent"
            id="content-box"
            class="bg-gray-light my-3 p-3"
            :placeholder="
              `아티클은 잘 읽으셨나요? \n아티클을 읽고 느낀점을 자유롭게 적어보세요`
            "
          ></textarea>
        </div>
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
import TopBar from './TopBar.vue';
import { createNoteApi, updateNoteApi } from '../api/noteApi';
export default {
  components: { TopBar },
  props: ['isNote', 'articleId', 'initialContent'],
  data() {
    return {
      noteContent: this.initialContent,
      isLoading: false,
      isNoteCreated: this.isNote,
    };
  },
  mounted() {
    console.log(this.articleId);
    this.$nextTick(() => {
      this.focusTextArea();
    });
  },
  methods: {
    noteComplete() {
      this.isNoteCreated ? this.updateNote() : this.createNote();
    },
    closeNote(isChanged = false) {
      this.$emit('closeNote', isChanged);
    },
    async createNote() {
      this.isLoading = true;
      const response = await createNoteApi(this.articleId, {
        content: this.noteContent,
      });
      // 토큰 만료
      if (response.status === 401) {
        localStorage.setItem('token', null);
        this.$router.push({ path: '/' });
        return;
      }
      this.isNoteCreated = true;
      this.$emit('setNoteCreated');
      this.isLoading = false;
      this.closeNote(true);
    },
    async updateNote() {
      this.isLoading = true;
      const response = await updateNoteApi(this.articleId, {
        content: this.noteContent,
      });
      // 토큰 만료
      if (response.status === 401) {
        localStorage.setItem('token', null);
        this.$router.push({ path: '/' });
        return;
      }
      this.isLoading = false;
      this.closeNote(true);
    },
    focusTextArea() {
      this.$refs.textArea.focus();
    },
  },
  computed: {
    canComplete() {
      return this.noteContent !== '';
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-bg {
  max-width: 375px;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
h1 {
  font-size: 20px;
  font-weight: bold;
  width: 200px;
  border-bottom: 2px solid #28f92d;
  position: relative;
}
#content-box {
  border-radius: 10px;
  width: 100%;
  height: 270px;
  border: none;
  resize: none;
  outline: none;
}

#white-section {
  border-radius: 0 0 10px 10px;
}
#pen {
  position: absolute;
  top: -10px;
  width: 39px;
  left: 200px;
  transform-origin: left bottom;
  animation: rotate 1.5s;
  -webkit-animation: rotate 1.5s; /* Safari 4+ */
  -moz-animation: rotate 1.5s;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(-10deg);
  }
  80% {
    transform: rotate(10deg);
  }
  90% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
