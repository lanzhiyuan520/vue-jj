<template>
    <div class="pub-content">
        <div class="title-content">
            <div class="title-input">
                <input v-model.trim="title" placeholder="请输入标题"/>
            </div>
            <div class="pub-button">
                <div class="pub-btn" @click="showPubModel">发布</div>
                <i class="iconfont icon-sanjiaoxia"
                   :class="[
                      {
                         'show':visibility
                      }
                   ]"
                ></i>
                <div class="model" v-if="visibility">
                    <div class="category">
                        <p>分类</p>
                        <ul class="nav-list">
                            <li class="nav-item"
                                :class="[
                                    {
                                     'active' : currentIndex === index
                                    }
                                ]"
                                v-for="(item,index) in getNav"
                                :key="item.type"
                                @click="selectTag(index)"
                            >{{item.title}}</li>
                        </ul>
                    </div>
                    <div class="pub__">
                        <lan-button type="primary" simple @click="pub">发布</lan-button>
                    </div>
                </div>
            </div>
        </div>
        <mavonEditor v-model="markHtml" ref="md" @change="change" @imgAdd="addImg"></mavonEditor>
    </div>
</template>

<script>
  import { mavonEditor } from 'mavon-editor'
  import { mapGetters } from 'vuex'
  import { pubArticleRequest,uploadImgRequest } from "@/common/apiRequest";
  import 'mavon-editor/dist/css/index.css'
  export default {
    name: "writeArticle",
    data () {
      return {
        currentIndex : null,
        visibility : false,
        markHtml : '',
        title : ''
      }
    },
    components : {
      mavonEditor
    },
    computed : {
      ...mapGetters(['getNav'])
    },
    methods : {
      selectTag (i) {
        this.currentIndex = i
      },
      pub () {
        if (!this.title) {
          this.$message({
            title : '请输入标题',
            type : 'error'
          })
          return
        }
        if (!this.markHtml) {
          this.$message({
            title : '请编写内容',
            type : 'error'
          })
          return
        }
        if (this.currentIndex === null) {
          this.$message({
            title : '请选择标签',
            type : 'error'
          })
          return
        }
        let newStr = this.markHtml.replace(/\'/g,'"')
        let params = {
          title : this.title,
          content : newStr,
          type : this.getNav[this.currentIndex]['type']
        }
        pubArticleRequest(params).then(res => {
          if (res.code === 0) {
            this.$message({
              title : '发布成功',
              type : 'success'
            })
            setTimeout(() => {
              this.$router.replace({
                path : '/'
              })
            },1000)
          }
          if (res.code === 2) {
              this.$showLoginModel()
            }
        })
      },
      change (e) {

      },
      addImg (pos,file) {
        var formdata = new FormData();
        formdata.append("file", file);
        uploadImgRequest(formdata).then(res => {
          if (res.code === 0) {
            this.$refs.md.$img2Url(pos, `${this.$imgBaseUrl}${res.data.path}`)
          }
        })
      },
      showPubModel () {
        this.visibility = !this.visibility
      }
    }
  }
</script>

<style scoped lang="scss">
.icon-sanjiaoxia.show {
    transform: rotate(180deg);
}
.icon-sanjiaoxia {
    transition: all .2s linear;
}
.pub-content {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 100000;
    .title-content {
        position: relative;
        z-index: 10000;
        background: #fff;
        height: 45px;
        display: flex;
        .title-input {
            height: 100%;
            width: 90%;
            input {
                width: 100%;
                padding-left: 20px;
                height: 100%;
                font-size: 24px;
            }
        }
    }
    .v-note-wrapper {
        height: calc(100% - 45px);
        overflow-y: scroll;
    }
}
.pub-button {
    position: relative;
    display: flex;
    align-items: center;
    color: $f-c007;
    .model {
        padding: 20px;
        position: absolute;
        width: 300px;
        /*height: 300px;*/
        background: #fff;
        top: 45px;
        right: 0;
        border: 1px solid #ddd;
        .pub__ {
            margin-top: 20px;
            display: flex;
            justify-content: center;
        }
        .category {
            p {
                color: #909090;
            }
            .nav-list {
                display: flex;
                margin-top: 10px;
                .nav-item {
                    padding: 4px 7px;
                    border: 1px solid #f1f1f1;
                    cursor: pointer;
                    border-radius: 2px;
                    font-size: 13px;
                    color: #909090;
                    margin-right: 8px;
                    margin-bottom: 8px;
                }
                .nav-item.active {
                    border: 1px solid $f-c007;
                    color: $f-c007;
                }
            }
        }
    }
}
.pub-btn {
    height: 100%;
    display: flex;
    flex: 1;
    align-items: center;
    cursor: pointer;
    color: $f-c007;
}
</style>
