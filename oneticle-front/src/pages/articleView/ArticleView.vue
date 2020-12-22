<template>
  <div>
    <top-bar v-show="!showNote" :title="article.articleTitle"></top-bar>
    <iframe ref="frame" id="article-view" :src="article.linkUrl"> </iframe>
    <article-bar
      :isToast="isToast"
      :article="article"
      @createNote="createNote"
      :noteCreated="noteCreated"
    ></article-bar>
    <div id="note-container" v-show="showNote">
      <note-modal
        @closeNote="closeNote"
        @setNoteCreated="setNoteCreated"
        :articleId="article.article_id"
        :initialContent="article.noteContent"
        :isNote="article.note_id"
      ></note-modal>
    </div>
  </div>
</template>

<script>
import ArticleBar from '../../components/ArticleBar';
import TopBar from '../../components/TopBar';
import NoteModal from '../../components/NoteModal';

export default {
  name: 'ArticleView',
  components: { ArticleBar, TopBar, NoteModal },
  data() {
    return {
      article: this.$route.query.article,
      isToast: this.$route.query.isToast === 'true',
      showNote: false,
      noteCreated: false,
    };
  },
  created() {
    this.article.article_id || this.$router.go(-1);
  },
  methods: {
    createNote() {
      this.showNote = true;
    },
    closeNote() {
      this.showNote = false;
    },
    setNoteCreated() {
      this.noteCreated = true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './ArticleView.scss';
</style>
