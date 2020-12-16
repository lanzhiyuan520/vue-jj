<template>
    <div class="nav-container">
        <nav class="nav">
            <div class="nav-container">
                <ul class="nav-list">
                    <li
                      @click="changeNav(item.path)"
                      class="nav-item"
                      :class="{
                        'active': $route.path === item.path
                      }"
                      v-for="item in getNav"
                      :key="item.type"
                    >{{item.title}}</li>
                </ul>
                <div class="right">
                    <div class="search-article">
                        <div class="auto">
                            <lan-input v-model="searchVal" @search="search" placeholder="搜索" suffixIcon="icon-search"></lan-input>
                        </div>
                    </div>
                    <div class="mybutton">
                        <lan-button type="primary" @click="overwrite">写文章</lan-button>
                        <lan-button v-if="!getUserInfo.name" type="primary" simple @click="login">登录</lan-button>
                        <div v-else class="head-img">
                            <img
                               :src="getUserInfo.avatarUrl"
                               @click="changeMenu"
                               ref="menu"
                            >
                            <div
                               class="menu-list"
                               :class="[
                                  {
                                     'active':MenuFlag
                                  }
                               ]">
                                <div class="menu-item" @click="changeAvatarUrl">更换头像</div>
                                <div class="menu-item" @click="exit">退出</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <input class="upload-file" ref="filElem" type="file" @change="picUpload($event)" accept="image/*" />
    </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import store from '../../../store'
  import { signOutRequest,changeAvatarUrlRequest,searchArticleRequest } from "@/common/apiRequest";
  import eventBus from '../../common/eventBus'
  export default {
    name: "Nav",
    data () {
      return {
        currentNav : 0,
        searchVal : '',
        MenuFlag : false
      }
    },
    computed : {
      ...mapGetters(['getNav','getUserInfo'])
    },
    mounted () {
      document.addEventListener('click',(e) => {
        let menu = this.$refs.menu
        if (this.MenuFlag && !menu.contains(e.target)) {
          this.MenuFlag = false
        }
      })
      this.$once('hook:beforeDestroy',() => {
        document.removeEventListener('click')
      })
    },
    methods : {
      search () {
        searchArticleRequest({text : this.searchVal}).then(res => {
          if (res.code === 0) {
            eventBus.$emit('searchArticle',res.data)
          }
        })
      },
      changeAvatarUrl () {
        this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
      },
      picUpload (e) {
        let file = e.target.files[0]
        var formdata = new FormData();
        formdata.append("file", file);
        changeAvatarUrlRequest(formdata).then(res => {
          if (res.code === 0) {
            this.$store.commit('setUserInfo',res.data)
            localStorage.setItem('user',JSON.stringify(res.data))
          }
        })
      },
      changeNav (path) {
        this.$router.replace({
          path
        })
      },
      changeMenu () {
        this.MenuFlag = !this.MenuFlag
      },
      overwrite (e) {
        this.$router.push({
          path : '/writeArticle'
        })
      },
      login () {
        this.$showLoginModel()
      },
      exit () {
        signOutRequest().then(res => {
            store.commit('exit')
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.nav-container {
    height: 45px;
}
.upload-file {
    width: 1.46rem;
    height: 100%;
    z-index: 1;
    opacity: 0;
    position: absolute;
    cursor: pointer;
}
.nav {
    height: 45px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    position: fixed;
    width: 100%;
    z-index: 999;
    .nav-container {
        width: 960px;
        display: flex;
        justify-content: space-between;
        background: #fff;
        .right {
            display: flex;
            .search-article {
                margin-right: 10px;
                display: flex;
                align-items: center;
                .auto {
                    background: rgba(227,231,236,.2);
                }
            }
        }
        .nav-list {
            height: 100%;
            display: flex;
            .nav-item {
                line-height: 45px;
                padding: 0 10px ;
                color: $f-c717;
                font-size: 14px;
                cursor: pointer;
            }
            .nav-item.active {
                color: $f-c007;
            }
        }
    }
}
.mybutton {
    display: flex;
    align-items: center;
    .head-img {
        position: relative;
        img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
        }
        .menu-list.active{
            visibility: visible;
            max-height: 200px;
        }
        .menu-list {
            max-height: 0;
            width: 100px;
            padding: 10px;
            position: absolute;
            font-size: 14px;
            color: #71777c;
            top: 40px;
            visibility: hidden;
            background-color: #fff;
            transition: all .3s linear;
            .menu-item {
                cursor: pointer;
                margin-bottom: 10px;
            }
            .menu-item:last-child {
                margin-bottom: 0;
            }
        }
    }
}
.mybutton .lan-button:first-child {
    margin-right: 10px;
}
</style>
