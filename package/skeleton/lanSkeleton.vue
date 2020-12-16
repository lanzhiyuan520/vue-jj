<template>
    <div
       class="lan-skeleton"
       :class="[
          {
            'round' : isRound
          }
       ]"
    ></div>
</template>

<script>
  export default {
    name: "lanSkeleton",
    props : {
      isRound : {
        type : Boolean,
        default : false
      }
    }
  }
</script>

<style scoped lang="scss">
.lan-skeleton {
    width: 100%;
    margin-bottom: 16px;
    height: 14px;
    background: #f3f3f3;
    background: linear-gradient(90deg,#fff,#edeff1,#fff);
    background-size: 480px 480px;
    animation: lan-skeleton-animation .6s linear infinite;
}
.lan-skeleton.round {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
@keyframes lan-skeleton-animation  {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: 480px 0;
    }
}
</style>
