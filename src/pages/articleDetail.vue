<template>
    <div class="article-detail">
        <div class="user-info-content">
            <div class="avatar-url">
                <img v-if="articleDetail.avatarUrl" :src="articleDetail.avatarUrl" alt="">
                <lan-skeleton v-else is-round></lan-skeleton>
            </div>
            <div class="user-info">
                <template v-if="articleDetail.name">
                    <p class="user-name">{{articleDetail.name}}</p>
                    <p class="time">{{articleDetail.createTime}}</p>
                </template>
                <div v-else class="lan-skeleton-content">
                    <lan-skeleton></lan-skeleton>
                    <lan-skeleton></lan-skeleton>
                </div>
            </div>
        </div>
        <div class="content markdown-body" v-if="articleDetail.content">
            <vue-markdown v-highlight >{{articleDetail.content}}</vue-markdown>
        </div>
        <div v-else class="lan-skeleton-markdown-body-content">
            <lan-skeleton></lan-skeleton>
            <lan-skeleton></lan-skeleton>
            <lan-skeleton></lan-skeleton>
            <lan-skeleton></lan-skeleton>
        </div>
        <div class="comment-content">
            <div class="user-img">
                <img :src="userInfo.avatarUrl" />
                <lan-input v-model.trim="commentContent" placeholder="输入评论..." @focus="focus"></lan-input>
                <lan-button type="primary" @click="comment">评论</lan-button>
            </div>
            <ul class="comment-list">
               <li class="comment-item" v-for="(item) in commentList">
                   <div class="user-avatar-url">
                       <img :src="item.avatarUrl" />
                   </div>
                   <div class="comment-info">
                       <div class="user-name">{{item.name}}</div>
                       <div class="comment__">{{item.content}}</div>
                       <div class="comment-time">{{item.createTime}}</div>
                   </div>
               </li>
            </ul>
        </div>
    </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/atom-one-light.css';
  import { getArticleDetailRequest, commentArticleRequest, getArticleCommentsRequest } from "@/common/apiRequest";
  import { mapState } from 'vuex'
  export default {
    name: "articleDetail",
    data () {
      return {
        articleDetail : {},
        commentContent : '',
        commentList : []
      }
    },
    components: {
      VueMarkdown
    },
    computed : {
      ...mapState(['userInfo'])
    },
    directives : {
      highlight : {
        inserted : el => {
          let blocks = el.querySelectorAll('pre code')
          blocks.forEach((block) => {
            hljs.highlightBlock(block)
          })
        },
        componentUpdated : el => {
          let blocks = el.querySelectorAll('pre code')
          blocks.forEach((block) => {
            hljs.highlightBlock(block)
          })
        }
      }
    },
    mounted () {
      this.getArticleDetail()
      this.getComments()
    },
    methods : {
      getArticleDetail () {
        getArticleDetailRequest({ id : this.$route.query.id }).then(res => {
            if (res.code === 0) {
              setTimeout(() => {
                this.articleDetail = res.data
              },300)
            }
        })
      },
      getComments () {
        getArticleCommentsRequest({id : this.$route.query.id}).then(res => {
          if (res.code === 0) {
            setTimeout(() => {
              this.commentList = res.data
              if (this.$route.query.isComment) {
                setTimeout(() => {
                  document.querySelector(".comment-content").scrollIntoView();
                },20)
              }
            },300)
          }
        })
      },
      focus () {
        if (!this.userInfo.name) {
          this.$showLoginModel()
        }
      },
      comment () {
        if (!this.commentContent) {
          this.$message({
            title : '请输入评论内容',
            type : 'error'
          })
          return
        }
        let params = {
          articleId : this.$route.query.id,
          content : this.commentContent
        }
        commentArticleRequest(params).then(res => {
          if (res.code === 0) {
            this.commentContent = ''
            this.getComments()
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.comment-list {
    background-color: #fff;
    padding-left: 30px;
    margin-top: 10px;
}
.comment-item {
    display: flex;
    padding: 10px;
    .user-avatar-url {
        img {
            width: 32px;
            height: 32px;
            border-radius: 50%;
        }
    }
    .comment-info {
        flex: 1;
        border-bottom: 1px solid #f1f1f1;
        padding: 0 0 10px 10px;
        .user-name {
            font-size: 13px;
        }
        .comment__ {
            margin-top: 5px;
            color: #505050;
            font-size: 14px;
        }
        .comment-time {
            font-size: 13px;
            color: #8a9aa9;
            margin-top: 5px;
        }
    }
}
.comment-content {
    margin-top: 20px;
    padding: 10px 13px;
    .user-img {
        background-color: #fafbfc;
        padding: 10px 13px;
        display: flex;
        align-items: center;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        .lan-input {
            flex: 1;
            margin-left: 10px;
            margin-right: 10px;
            background-color: #fff;
            /*width: 100%;*/
        }
        /deep/.lan-button__ {
            padding: 5px 15px;
        }
    }
}
.markdown-body{word-break:break-word;line-height:1.75;font-weight:400;font-size:15px;overflow-x:hidden;color:#333}.markdown-body h1,.markdown-body h2,.markdown-body h3,.markdown-body h4,.markdown-body h5,.markdown-body h6{line-height:1.5;margin-top:35px;margin-bottom:10px;padding-bottom:5px}.markdown-body h1{font-size:30px;margin-bottom:5px}.markdown-body h2{padding-bottom:12px;font-size:24px;border-bottom:1px solid #ececec}.markdown-body h3{font-size:18px;padding-bottom:0}.markdown-body h4{font-size:16px}.markdown-body h5{font-size:15px}.markdown-body h6{margin-top:5px}.markdown-body p{line-height:inherit;margin-top:22px;margin-bottom:22px}.markdown-body img{max-width:100%}.markdown-body hr{border:none;border-top:1px solid #ddd;margin-top:32px;margin-bottom:32px}.markdown-body code{word-break:break-word;border-radius:2px;overflow-x:auto;background-color:#fff5f5;color:#ff502c;font-size:.87em;padding:.065em .4em}.markdown-body code,.markdown-body pre{font-family:Menlo,Monaco,Consolas,Courier New,monospace}.markdown-body pre{overflow:auto;position:relative;line-height:1.75}.markdown-body pre>code{font-size:12px;padding:15px 12px;margin:0;word-break:normal;display:block;overflow-x:auto;color:#333;background:#f8f8f8}.markdown-body a{text-decoration:none;color:#0269c8;border-bottom:1px solid #d1e9ff}.markdown-body a:active,.markdown-body a:hover{color:#275b8c}.markdown-body table{display:inline-block!important;font-size:12px;width:auto;max-width:100%;overflow:auto;border:1px solid #f6f6f6}.markdown-body thead{background:#f6f6f6;color:#000;text-align:left}.markdown-body tr:nth-child(2n){background-color:#fcfcfc}.markdown-body td,.markdown-body th{padding:12px 7px;line-height:24px}.markdown-body td{min-width:120px}.markdown-body blockquote{color:#666;padding:1px 23px;margin:22px 0;border-left:4px solid #cbcbcb;background-color:#f8f8f8}.markdown-body blockquote:after{display:block;content:""}.markdown-body blockquote>p{margin:10px 0}.markdown-body ol,.markdown-body ul{padding-left:28px}.markdown-body ol li,.markdown-body ul li{margin-bottom:0;list-style:inherit}.markdown-body ol li .task-list-item,.markdown-body ul li .task-list-item{list-style:none}.markdown-body ol li .task-list-item ol,.markdown-body ol li .task-list-item ul,.markdown-body ul li .task-list-item ol,.markdown-body ul li .task-list-item ul{margin-top:0}.markdown-body ol ol,.markdown-body ol ul,.markdown-body ul ol,.markdown-body ul ul{margin-top:3px}.markdown-body ol li{padding-left:6px}@media (max-width:720px){.markdown-body h1{font-size:24px}.markdown-body h2{font-size:20px}.markdown-body h3{font-size:18px}}
.content {
    margin-top: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 30px;
}
.lan-skeleton-content {
    width: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .lan-skeleton:first-child {
        width: 60%;
        margin-bottom: 5px;
    }
}
.lan-skeleton-markdown-body-content {
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
.article-detail {
    padding: 20px;
}
.user-info-content {
    display: flex;
    .avatar-url{
        margin-right: 10px;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }
    .user-info {
        .user-name {
            font-size: 16px;
            font-weight: bold;
        }
        .time {
            font-size: 13px;
            color: #909090;
        }
    }
}
</style>
