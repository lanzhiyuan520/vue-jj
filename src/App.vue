<template>
    <div>
        <Nav></Nav>
        <div class="main">
            <div class="left">
                <router-view :key="$route.path"></router-view>
            </div>
            <div class="right">
                <template v-if="!userInfo.name">
                    <p class="title">一个帮助开发者成长的社区</p>
                    <div class="username">
                        <lan-input v-model.trim="loginForm.username" prefix-icon="icon-yonghuming" placeholder="用户名"></lan-input>
                    </div>
                    <div class="pass">
                        <lan-input v-model.trim="loginForm.pass" type="password" prefix-icon="icon-mima" placeholder="密码"></lan-input>
                    </div>
                    <div class="login-btn">
                        <lan-button type="primary" @click="login">登录</lan-button>
                    </div>
                </template>
                <template v-else>
                    <div class="name">
                        用户名:{{userInfo.name}}
                    </div>
                </template>
                <div class="tips">
                    <p>此项目仅供学习</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import Nav from './components/Nav/Nav'
  import { mapState } from 'vuex'
  import { getLoginStatusRequest } from "@/common/apiRequest";

  export default {
    name: "App",
    data () {
      return {
        loginForm : {
          username : '',
          pass : ''
        }
      }
    },
    components : {
      Nav
    },
    computed : {
      ...mapState(['showRight','userInfo'])
    },
    mounted () {
      this.getLoginStatus()
    },
    methods : {
      resetLoginForm () {
        this.loginForm = {
          username : '',
            pass : ''
        }
      },
      login () {
        if (!this.loginForm.username || !this.loginForm.pass) {
          this.$message({
            title : '请输入用户名或密码',
            type : 'error'
          })
          return
        }
        this.$store.dispatch('login',this.loginForm)
        this.resetLoginForm()
      },
      getLoginStatus () {
        const token = JSON.parse(localStorage.getItem('user') || '{}').token
        if (token) {
          getLoginStatusRequest().then(res => {})
        }
      }
    }
  }
</script>

<style lang="scss">
    @import "css/reset.scss";
    @import "css/common.scss";
    .main {
        position: relative;
        width: 960px;
        margin: 10px auto;
        display: flex;
        justify-content: space-between;
        .left {
            width: 700px;
            background-color: #fff;
        }
        .right {
            position: absolute;
            top: 0;
            right: 0;
            background-color: #fff;
            width: 240px;
            /*height: 240px;*/
            padding: 10px;
            .title {
                color: #2e3135;
                font-size: 14px;
                text-align: center;
            }
            .pass,.username {
                margin-top: 10px;
                display: flex;
                justify-content: center;
            }
            .pass .lan-input,.username .lan-input {
                width: 100% !important;
            }
            .login-btn {
                margin-top: 10px;
                .lan-button {
                    width: 100%;
                    .lan-button__ {
                        width: 100%;
                    }
                }
            }
            .tips {
                p {
                    color: #767676;
                    font-size: 12px;
                    margin-top: 15px;
                }
            }
        }
    }
</style>
