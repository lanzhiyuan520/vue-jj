<template>
    <div class="article-box">
        <div class="info-box">
            <div class="meta-row">
                <span>{{item.name}}</span>
                <span class="time">{{item.createTime}}</span>
                <span>{{getCategory}}</span>
            </div>
            <div class="title-row" @click="goDetail(false)">
                <span>{{item.title}}</span>
            </div>
            <div class="button-container">
                <ul class="button-list">
                    <li class="button-item">
                        <a>
                            <i class="iconfont icon-zan"></i>
                            <span>12</span>
                        </a>
                    </li>
                    <li class="button-item" @click="goDetail(true)">
                        <a>
                            <i class="iconfont icon-pinglun"></i>
                            <span>{{item.commentTotal}}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="img-box" v-if="item.banner">
            <img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a95eec20a3644292a0a852c771bc4893~tplv-k3u1fbpfcp-watermark.image" alt="">
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "ArticleItem",
    props : {
      item : {
        type : Object,
        default : {}
      }
    },
    computed : {
      ...mapState(['navList']),
      getCategory () {
        let navItem = this.navList.filter(item => item.type === this.item.type)
        return navItem.length?navItem[0].title : ''
      }
    },
    methods : {
      goDetail (flag) {
        let query = {
          id : this.item.articleId,
        }
        if (flag) {
          query.isComment = true
        }
        this.$router.push({
          path : '/articleDetail',
          query
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.button-list {
    display: flex;
    margin-top: 5px;
    .button-item:last-child {
        margin-left: -1px;
    }
    .button-item {
        border: 1px solid #edeeef;
        cursor: pointer;
        a {
            display: flex;
            padding: 3px 10px;
            align-items: center;
            i {
                font-size: 16px;
                color: #b2bac2;
            }
            i.icon-pinglun {
                font-size: 12px;
                margin-top: 2px;
                margin-right: 2px;
            }
            span {
                color: #b2bac2;
                font-size: 14px;
            }
        }
    }
}
.article-box {
    padding: 20px 30px;
    display: flex;
    border-bottom: 1px solid rgba(178,186,194,.15);
    .info-box {
        flex: 1 ;
        min-width: 0;
        .meta-row {
            .time {
                margin: 0 4px;
            }
            span {
                color: #909090;
                font-size: 13px;
            }
        }
        .title-row {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 5px;
            span {
                width: 100%;
                font-size: 20px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        }
    }
    .img-box {
        img {
            width: 60px;
            height: 60px;
        }
    }
}
</style>
