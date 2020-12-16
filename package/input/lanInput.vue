<template>
    <div
        class="lan-input"
        :class="[
            {
                'is-disabled' : disabled,
            }
        ]"
        :style="getStyle"
    >
        <span class="lan-input__prefix">
            <i
              class="lan-input-icon iconfont"
              v-if="prefixIcon"
              :class="prefixIcon"
            ></i>
        </span>
        <input
            :type="type"
            ref="input"
            class="lan-input__inner"
            :value="value"
            :disabled="disabled"
            :class="[
                {
                    'active':isFocus,
                    'is-suffix-icon': suffixIcon,
                    'is-prefix-icon': prefixIcon
                }
            ]"
            :placeholder="placeholder"
            @focus="handleFocus"
            @blur="handleBlur"
            @input="handleInput"
            @change="handleChange"
        >
        <span class="lan-input__suffix">
            <i
                v-if="suffixIcon"
                class="iconfont lan-input-icon"
                @click="handClick"
                :class="[
                    suffixIcon,
                    {
                        'active': isFocus
                    }
                ]"
            ></i>
        </span>
    </div>
</template>

<script>
  export default {
    name: "lanInput",
    props : {
      maxWidth : {
        type : [String,Number],
        default : 180
      },
      type : {
        type : String,
        default: 'text'
      },
      placeholder : {
        type : String,
        default : '请输入内容'
      },
      suffixIcon : {
        type : String,
        default : ''
      },
      prefixIcon : {
        type : String,
        default : ''
      },
      disabled : {
        type : Boolean,
        default : false
      },
      value : {
        type : [String,Number]
      }
    },
    data () {
      return {
        isFocus : false
      }
    },
    computed : {
      getStyle () {
        return {
          width: `${this.maxWidth}px`
        }
      }
    },
    methods : {
      handleFocus (e) {
        this.isFocus = true
        this.$emit('focus',e)
      },
      handleBlur (e) {
        this.isFocus = false
        this.$emit('blur',e)
      },
      handleInput (e) {
        this.$emit('input',e.target.value)
      },
      handleChange (e) {
        this.$emit('change',e.target.value)
      },
      handClick () {
        if (this.suffixIcon === 'icon-search') {
          this.$emit('search')
        }
      }
    }
  }
</script>

<style scoped lang="scss">
.lan-input.is-disabled {
    input {
        background-color: #f5f7fa;
        border-color: #e4e7ed;
        color: #c0c4cc;
        cursor: not-allowed;
    }
}
.lan-input {
    position: relative;
    display: inline-block;
    input.active {
        border: 1px solid $f-c007;
    }
    input.is-suffix-icon {
        padding: 8px 22px 8px 15px;
    }
    input.is-prefix-icon {
        padding: 8px 15px 8px 22px;
    }
    input {
        background-color: transparent;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        outline: none;
        padding: 8px 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
    }
    .lan-input-icon {
        width: 25px;
        line-height: 35px;
        font-size: 16px;
        color: #71777c;
    }
    .lan-input__prefix {
        position: absolute;
        left: 5px;
        top: 0;
        height: 100%;
        text-align: center;
        transition: all .3s;
        color: #c0c4cc;
        margin-top: -2px;
    }
    .lan-input__suffix {
        position: absolute;
        right: 5px;
        height: 100%;
        top: 0;
        text-align: center;
        transition: all .3s;
        .active.lan-input-icon {
            color: $f-c007;
        }
    }
}
</style>
