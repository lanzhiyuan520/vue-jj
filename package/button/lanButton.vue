<template>
    <div class="lan-button">
        <button
            class="lan-button__"
            :class="[
                `lan-btn-${type}`,
                simple?'simple':''
            ]"
            @click="handClick"
        >{{getButtonText}}</button>
    </div>
</template>

<script>
  export default {
    name: "lanButton",
    props : {
      type : {
        type : String,
        default : 'default'
      },
      simple : {
        type : Boolean,
        default: false
      }
    },
    computed : {
      getButtonText () {
        return this.$slots.default.length && this.$slots.default[0].text
      }
    },
    methods : {
      handClick (e) {
        this.$emit('click',e)
      }
    }
  }
</script>

<style scoped lang="scss">
    .lan-button {
        display: inline-flex;
    }
    .lan-button__ {
        width: 100%;
        padding: 8px 15px;
        border-radius: 3px;
    }
    .lan-btn-primary {
        color: #fff;
        background-color: $f-c007;
        font-size: 14px;
        transition: all .3s linear;
    }
    .lan-btn-primary:hover {
        background-color: #0876e4;
    }
    .lan-btn-primary.simple {
        padding: 7px 15px;
        background-color: #fff;
        color: $f-c007;
        border: 1px solid $f-c007;
    }
</style>