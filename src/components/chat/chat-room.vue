<template>
  <v-layout
    v-if="isLoading"
    row
    wrap
    fill-height
    justify-center
    align-center
  >
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-layout>
  <div
    v-else
    class="chat-block"
  >
    <div class="chat-block__container">
      <div class="chat-block__title">
        <v-layout
          class="chat-title px-3"
          row
          wrap
        >
          <v-avatar
            color="grey darken-4"
            size="48"
          >
            <img :src="usersInfo[username].avatar">
          </v-avatar>
          <span class="headline align-self-start">{{ usersInfo[username].nickname }}</span>
        </v-layout>
        <v-divider></v-divider>
      </div>
      <div class="chat-block__message pa-3">
        <v-layout
          row
          wrap
          fill-height
        >
          <v-flex xs12>
            <div
              v-for="(message, index) in messages"
              :key="index"
            >
              <p class="subheading primary--text">
                <v-avatar
                  color="grey darken-4"
                  size="36"
                >
                  <img :src="usersInfo[message.sender].avatar">
                </v-avatar>
                <span>{{ usersInfo[message.sender].nickname }}</span>
              </p>
              <pre class="ml-5">{{ `${message.content}` }}</pre>
            </div>
          </v-flex>
        </v-layout>
      </div>
      <div class="chat-block__input">
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
      </div>
    </div>
  </div>
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
      isLoading: true,
      usersInfo: undefined,
      messages: [],
      messageKey: undefined,
      inputText: ''
    }
  },
  methods: {
    async load () {
      this.isLoading = true
      let { error, avatar, username, nickname } = await this.$api.getUserInfo(
        this.username
      )
      if (error) {
        console.log(error)
      } else {
        let usersInfo = {}
        usersInfo[this.username] = { avatar, username, nickname }
        usersInfo[this.$store.state.userInfo.username] = { ...this.$store.state.userInfo }
        this.usersInfo = usersInfo
        let { error, messageKey } = await this.$api.getChatRoomMessageKey(
          this.username,
          this.$store.state.privateKey
        )
        if (error) {
          console.log(error)
        } else {
          this.messageKey = messageKey
          let { error, messages } = await this.$api.getChatRoomMessages(
            this.username,
            undefined,
            20,
            messageKey
          )
          if (error) {
            console.log(error)
          } else {
            this.messages = messages
            console.log(this.messages)
          }
        }
      }
      this.isLoading = false
    },
    async sendTextMessage () {
      let text = this.inputText.trim()
      if (text) {
        let message = {}
        message.type = 'text'
        message.content = text
        let { error, sendedMessage } = await this.$api.sendChatRoomMessage(
          this.$store.state.userInfo.username,
          this.username,
          message,
          this.messageKey
        )
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
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-block__container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chat-block__title {
  width: 100%;
}

.chat-title {
  width: 100%;
  height: 64px;
}

.chat-block__message {
  flex-grow: 1;
  overflow: auto;
  min-height: 0;
}

.chat-block__input {
  width: 100%;
  white-space: nowrap;
}

.chat-block__input >>> textarea {
  max-height: 200px;
  line-height: 1.2em;
  overflow-y: auto;
}
</style>
