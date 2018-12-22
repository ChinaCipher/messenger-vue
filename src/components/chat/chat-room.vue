<template>
  <v-layout
    class="chat-block"
    column
    wrap
    fill-height
  >
    <v-flex
      xs12
      class="chat-block__title"
    >
      <v-layout
        class="chat-title px-3"
        row
        wrap
      >
        <!-- <v-avatar class="align-self-center" color="red">
          <v-img :src="avatar"></v-img>
        </v-avatar> -->
        <span class="headline align-self-start">{{ username }}</span>
      </v-layout>
      <v-divider></v-divider>
    </v-flex>
    <v-flex
      xs12
      class="chat-block__message"
    >
    </v-flex>
    <v-flex
      xs12
      class="chat-block__input"
    >
      <v-divider></v-divider>
      <v-layout
        class="mx-3 mt-0 mb-3"
        row
        wrap
      >
        <v-textarea
          v-model="inputText"
          class="headline align-self-center mt-0 pt-0"
          style="break-after: none;"
          hide-details
          :rows="inputRows"
          no-resize
          @keydown.enter.exact.prevent="sendTextMessage"
        ></v-textarea>
        <v-btn
          class="mr-0 align-self-end"
          icon
          @click="sendTextMessage"
        >
          <v-icon color="primary">send</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    username: String
  },
  computed: {
    inputRows () {
      return this.inputText.split('\n').length
    }
  },
  data () {
    return {
      isLoading: false,
      userInfo: undefined,
      messages: [],
      messageKey: undefined,
      inputText: ''
    }
  },
  methods: {
    async load () {
      let { error, avatar, username, nickname } = await this.$api.getUserInfo(this.username)
      if (error) {
        console.log(error)
      } else {
        this.userInfo = { avatar, username, nickname }
        let { error, messageKey } = await this.$api.getChatRoomMessageKey(this.username, this.$store.state.privateKey)
        if (error) {
          console.log(error)
        } else {
          this.messageKey = messageKey
          let { error, messages } = await this.$api.getChatRoomMessages(this.username, undefined, 20, messageKey)
          if (error) {
            console.log(error)
          } else {
            this.messages = messages
          }
        }
      }
    },
    async sendTextMessage () {
      let text = this.inputText.trim()
      if (text) {
        let message = {}
        message.type = 'text'
        message.content = text
        let { error, sendedMessage } = await this.$api.sendChatRoomMessage(this.$store.state.userInfo.username, this.username, message, this.messageKey)
        if (error) {
          console.log(error)
        } else {
          this.messages.push(sendedMessage)
          this.inputText = ''
        }
      }
    }
  },
  watch: {
    username () {
      this.load()
    }
  },
  mounted () {
    if (this.$store.getters.loggedIn) {
      this.load()
    } else {
      this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.chat-block {
  height: 100%;
  position: relative;
}

.chat-block__title {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
}

.chat-title {
  width: 100%;
  height: 64px;
}

.chat-block__message {
  width: 100%;
  height: auto;
}

.chat-block__input {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  white-space: nowrap;
}

.chat-block__input >>> textarea {
  max-height: 200px;
  line-height: 1.2em;
  overflow-y: auto;
}
</style>
