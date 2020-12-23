<template>
  <div
    id="articleBar"
    class="d-flex justify-content-end p-fixed bottom w-100 pb-3 pt-1 px-1"
  >
    <img :src="noteSrc" alt="icon" id="note-icon" @click="createNote" />
    <img
      :src="likeSrc"
      alt="icon"
      id="like-icon"
      :class="{ disabled: isLoading }"
      @click="toggleLike"
    />
    <div
      id="toast"
      class="bg-success text-white font-weight-bold py-2"
      :class="{ 'd-none': !isToast }"
    >
      오늘의 글이 선택됐어요<br />
      글을 읽고 내 노트를 남겨보세요
    </div>
  </div>
</template>

<script>
import { likeArticleApi, dislikeArticleApi } from '../api/articleApi';
export default {
  props: {
    isToast: {
      Type: Boolean,
      default: true,
    },
    article: {
      Type: Object,
      default: () => {},
    },
    noteCreated: {
      Type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log(this.article);
  },
  data() {
    return {
      isLike: this.article?.isLike,
      isLoading: false,
    };
  },
  methods: {
    createNote() {
      this.$emit('createNote');
    },
    toggleLike() {
      console.log('like');
      this.isLike ? this.dislikeArticle() : this.likeArticle();
      this.isLike = !this.isLike;
    },
    async dislikeArticle() {
      this.isLoading = true;
      const response = await dislikeArticleApi(this.article.article_id);
      // 토큰 만료
      if (response.status === 401) {
        localStorage.setItem('token', null);
        this.$router.push({ path: '/' });
        return;
      }
      this.isLoading = false;
    },
    async likeArticle() {
      this.isLoading = true;
      const response = await likeArticleApi(this.article.article_id);
      // 토큰 만료
      if (response.status === 401) {
        localStorage.setItem('token', null);
        this.$router.push({ path: '/' });
        return;
      }
      this.isLoading = false;
    },
  },
  computed: {
    isNoteCreated() {
      return this.noteCreated || this.article?.note_id ? '_active' : '';
    },
    isArticleLike() {
      return this.isLike ? '_active' : '';
    },
    noteSrc() {
      return require(`../assets/icon/write_note${this.isNoteCreated}.png`);
    },
    likeSrc() {
      return require(`../assets/icon/like${this.isArticleLike}.png`);
    },
  },
};
</script>

<style lang="scss" scoped>
#articleBar {
  max-width: 400px;
  height: 83px;
  box-shadow: 0px -1px 10px rgba(0, 0, 0, 0.16);
}
#note-icon {
  width: 95px;
  height: 49px;
}
#like-icon {
  width: 95px;
  height: 49px;
}
#toast {
  font-size: 12px;
  border-radius: 10px;
  width: 50%;
  max-width: 300;
  position: absolute;
  top: -60px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transform-origin: center bottom;
  animation-delay: 1s;
  animation: popUp 5s;
  -webkit-animation: popUp 5s; /* Safari 4+ */
  -moz-animation: popUp 5s;
}

@keyframes popUp {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
    width: 80%;
  }
  90% {
    opacity: 1;
    width: 80%;
  }

  100% {
    opacity: 0;
  }
}
.disabled {
  opacity: 0.3;
}
</style>
