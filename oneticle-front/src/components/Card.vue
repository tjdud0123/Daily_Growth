<template>
  <div id="card" class="w-100" v-if="article">
    <div
      id="thumbNail"
      :style="{
        backgroundImage: `url(${thumbNailSrc})`,
      }"
    ></div>
    <div id="info-box" class="container text-left p-4">
      <h1 class="text-dark font-weight-bold">
        {{ article.title || article.articleTitle }}
      </h1>
      <small class="gray">{{ createdDate }}</small>
      <p class="gray my-4">{{ article.previewText }}</p>
      <div class="gradient-box"></div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: {
    article: {
      type: Object,
      default: () => {},
    },
  },
  method: {},
  computed: {
    thumbNailSrc() {
      return (
        this.article?.thumbNailUrl ||
        'https://media.vlpt.us/images/moseok/post/8f8cf8f4-66e0-436a-9e03-abf0befc8cc8/%EA%B7%B8%EB%A3%B9%2090@2x.png'
      );
    },
    createdDate() {
      return this.article?.ArticleCreatedAt
        ? moment(this.article?.ArticleCreatedAt).format('L')
        : moment(this.article?.createdAt).format('L');
    },
  },
};
</script>

<style lang="scss" scoped>
#card {
  box-shadow: 0 20px 20px rgba(0, 0, 0, 0.16);
  max-width: 270px;
  background: white;
}
h1 {
  font-size: 20px;
}
p {
  font-size: 14px;
}
.gray {
  color: #868686;
}
#thumbNail {
  width: 100%;
  height: 160px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

#info-box {
  height: 280px;
  overflow: hidden;
  position: relative;
}
.gradient-box {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 104px;
  width: 100%;
  background: linear-gradient(
    181.05deg,
    rgba(255, 255, 255, 0) 0.9%,
    #ffffff 65.11%
  );
}
</style>
