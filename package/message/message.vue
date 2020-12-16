<template>
    <div class="message-content">
        <ul class="message-list">
            <li class="message-item"
                :class="[
                    `message-type-${defaultContent.type}`
                ]"
                v-for="item in messageList"
                :key="item.name"
            >{{item.title}}</li>
        </ul>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        defaultContent: {
          title: "这是一段文字",
          duration: 2000,
          type : 'success'
        },
        messageList: [],
      };
    },
    methods: {
      showMessage(options) {
        this.options = options
        let mId = this.getMId();
        let messageItem = Object.assign({}, this.defaultContent, {
          ...options,
          mId
        });
        this.defaultContent = messageItem
        this.messageList.push(messageItem);
        this.removeMessage(mId, messageItem.duration);
      },
      getMId() {
        if (!this.mId) {
          this.mId = 0;
        }
        this.mId++;
        return `mId${this.mId}`;
      },
      removeMessage(mId, duration) {
        setTimeout(() => {
          let mIndex = this.messageList.findIndex(item => item.mId === mId);
          this.messageList.splice(mIndex, 1);
        }, duration);
      }
    }
  };
</script>

<style>
    .message-content {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 20px;
        z-index: 9999999999999;
    }
    .message-list .message-item {
        color: #67c23a;
        background-color: #f0f9eb;
        padding: 10px;
        min-width: 380px;
        text-align: center;
        margin-top: 20px;
        border-radius: 3px;
    }
    .message-list .message-item.message-type-error {
        background-color: #fde2e2;
        color: #f56c6c;
    }
</style>
