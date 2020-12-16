<template>
    <div class="all">
        <div class="lan-skeleton-content" v-if="isRequest">
            <lan-skeleton></lan-skeleton>
            <lan-skeleton></lan-skeleton>
            <lan-skeleton></lan-skeleton>
            <lan-skeleton></lan-skeleton>
        </div>
        <template v-else>
            <div class="article-list" v-if="articleList.length">
                <article-item
                        v-for="(item,index) in articleList"
                        :key="item.articleId"
                        :item="item"
                ></article-item>
            </div>
            <div v-else class="empty-box">暂无数据</div>
        </template>
    </div>
</template>

<script>
  import  articleItem from '@/components/ArticleItem/ArticleItem'
  import { getArticleRequest } from "@/common/apiRequest";
  import { mapGetters } from 'vuex'
  import eventBus from '../common/eventBus'
  export default {
    name: "all",
    data () {
      return {
        articleList : [],
        isRequest : true
      }
    },
    computed : {
      ...mapGetters(['getNav'])
    },
    components : {
      articleItem
    },
    mounted () {
      this.getArticle()
      eventBus.$on('searchArticle',data => {
        this.articleList = data
      })
    },
    methods : {
      getArticle () {
        let nav = this.getNav.filter(item => item.path === this.$route.path)
        getArticleRequest({page : 1,type : nav[0].type}).then(res => {
            if (res.code === 0) {
              this.articleList = res.data
            }
            setTimeout(() => {
              this.isRequest = false
            },300)
        }).catch(() => {
          setTimeout(() => {
            this.isRequest = false
          },300)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.empty-box {
    background-color: transparent;
    text-align: center;
    padding: 20px 0;
    color: #71777c;
    font-size: 14px;
}
.lan-skeleton-content {
    padding: 20px;
    .lan-skeleton:first-child {
        width: 40%;
        margin-top: 8px;
    }
    .lan-skeleton:nth-child(3) {
        width: 80%;
    }
    .lan-skeleton:last-child {
        width: 60%;
        margin-bottom: 0;
    }
}
</style>
