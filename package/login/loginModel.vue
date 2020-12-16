<template>
    <div v-if="visibility" class="mask">
        <div class="model-container">
            <div class="panda-img">
                <img v-if="state === 1" src="../../public/img/normal.png" alt="">
                <img v-if="state === 2" src="../../public/img/greeting.png" alt="">
                <img v-if="state === 3" src="../../public/img/blindfold.png" alt="">
            </div>
            <div class="title">
                <span class="title-text">{{isRegisteredFlag?'注册':'登录'}}</span>
                <span @click="visibility = false">
                    <i class="iconfont icon-close"></i>
                </span>
            </div>
            <div class="username">
                <lan-input v-model.trim="loginForm.username" prefix-icon="icon-yonghuming" placeholder="用户名" @focus="state = 2" @blur="state = 1"></lan-input>
            </div>
            <div class="pass">
                <lan-input v-model.trim="loginForm.pass" prefix-icon="icon-mima" type="password" @focus="state = 3" @blur="state = 1" placeholder="密码"></lan-input>
            </div>
            <div class="confirm-pass" v-if="isRegisteredFlag">
                <lan-input v-model.trim="loginForm.confirmPass" prefix-icon="icon-mima" type="password" @focus="state = 3" @blur="state = 1" placeholder="确认密码"></lan-input>
            </div>
            <div class="buttons">
                <div v-if="!isRegisteredFlag">
                    <lan-button :key="1" type="primary" @click="login">登录</lan-button>
                </div>
                <div v-else>
                    <lan-button :key="2" type="primary" @click="registered" >注册</lan-button>
                </div>
            </div>
            <div v-if="!isRegisteredFlag" class="registered" @click="changeIsRegisteredFlag(true)">注册</div>
            <div v-else class="registered" @click="changeIsRegisteredFlag(false)">登录</div>
        </div>
    </div>
</template>

<script>
  import { loginRequest, registeredRequest } from "@/common/apiRequest";
  import store from '../../store'
  export default {
    name: "loginModel",
    data () {
      return {
        visibility : false,
        isRegisteredFlag : false,
        state : 1,
        loginForm : {
          username : '',
          pass : '',
          confirmPass : ''
        }
      }
    },
    methods : {
      changeIsRegisteredFlag (flag) {
        this.isRegisteredFlag = flag
        this.resetForm()
      },
      resetForm () {
        this.loginForm = {
          username : '',
          pass : '',
          confirmPass : ''
        }
      },
      focus () {
        this.state = 2
      },
      login () {
        if (!this.loginForm.username || !this.loginForm.pass) {
          this.$message({
            title : '请输入用户名或密码',
            type : 'error'
          })
          return
        }
        store.dispatch('login',this.loginForm).then(res => {
            if (res.code === 0) {
              localStorage.setItem('user',JSON.stringify(res.data))
              this.$message({
                title : res.msg,
                type : 'success'
              })
              this.$closeLoginModel()
            }
        })
      },
      registered () {
        if (!this.loginForm.username || !this.loginForm.pass || !this.loginForm.confirmPass) {
          this.$message({
            title : '请输入完整信息',
            type : 'error'
          })
          return
        }
        if (this.loginForm.pass !== this.loginForm.confirmPass) {
          this.$message({
            title : '两次密码输入不一致',
            type : 'error'
          })
          return
        }
        registeredRequest(this.loginForm).then(res => {
            if (res.code === 0) {
              this.$message({
                title : res.msg
              })
              this.isRegisteredFlag = false
            }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999999999;
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .model-container {
        padding: 15px;
        position: relative;
        width: 300px;
        background: #fff;
        border-radius: 3px;
        .panda-img {
            position: absolute;
            top: -80px;
            left: 50%;
            transform: translateX(-50%);
            img {
                width: 120px;
            }
        }
        .title {
            display: flex;
            justify-content: space-between;
            .title-text {
                font-weight: bold;
                font-size: 18px;
            }
        }
        .username,.pass {
            margin-top: 10px;
        }
        .confirm-pass {
            margin-top: 10px;
        }
        .username .lan-input {
            width: 100%!important;
        }
        .confirm-pass .lan-input{
            width: 100%!important;
        }
        .pass .lan-input {
            width: 100%!important;
        }
        .buttons {
            margin-top: 10px;
            .lan-button {
                width: 100%;
            }
        }
        .registered {
            color: $f-c007;
            text-align: center;
            margin-top: 5px;
            font-size: 14px;
            cursor: pointer;
        }
    }
}
</style>
