<template>
  <div>
    <top-bar :title="article.articleTitle"></top-bar>

    <iframe ref="frame" id="article-view" :src="article.linkUrl"> </iframe>

    <article-bar :isToast="isToast" :article="article"></article-bar>
  </div>
</template>

<script>
import ArticleBar from '../../components/ArticleBar';
import TopBar from '../../components/TopBar';
export default {
  name: 'ArticleView',
  components: { ArticleBar, TopBar },
  data() {
    return {
      article: this.$route.query.article,
      isToast: this.$route.query.isToast === 'true',
    };
  },
  created() {
    this.article.article_id || this.$router.go(-1);
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import './ArticleView.scss';
</style>
