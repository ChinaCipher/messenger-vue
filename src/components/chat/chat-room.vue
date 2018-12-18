<template>
  <v-layout
    v-if="$store.getters.isChatting"
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
        class="chat-title mx-3"
        row
        wrap
      >
        <v-avatar class="align-self-center" color="red">
          <v-img :src="avatar"></v-img>
        </v-avatar>
        <span class="headline align-self-start">{{ chatRoomInfo.nickname }}</span>
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
          v-model="inputMessage"
          class="headline align-self-center mt-0 pt-0"
          style="break-after: none;"
          hide-details
          :rows="rows"
          no-resize
          @keydown.enter.exact.prevent="sendMessage"
        ></v-textarea>
        <v-btn
          class="mr-0 align-self-end"
          icon
          @click="sendMessage"
        >
          <v-icon color="primary">send</v-icon>
        </v-btn>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['chatRoomInfo']),
    avatar () {
      return this.chatRoomInfo.avatarUrl
        ? this.chatRoomInfo.avatarUrl
        : '/img/default_avatar.png'
    },
    rows () {
      return this.inputMessage.split('\n').length
    }
  },
  data () {
    return {
      inputMessage: ''
    }
  },
  methods: {
    sendMessage () {
      let message = this.inputMessage.trim()
      if (message) {
        this.inputMessage = ''
      }
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
