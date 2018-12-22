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
  <v-list
    v-else
    class="pa-0"
    two-line
  >
    <v-subheader>聊天紀錄</v-subheader>
    <template v-for="(chatRoom, index) in chatRooms">
      <v-divider
        v-if="index != 0"
        :key="'divider' + index"
        inset
      ></v-divider>
      <v-list-tile
        :key="'item' + index"
        avatar
        :to="'/chatroom/' + chatRoom.username"
        replace
      >
        <v-list-tile-avatar
          color="primary"
          size="48"
        >
          <img :src="chatRoom.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="headline">{{ chatRoom.nickname }}</v-list-tile-title>
          <v-list-tile-sub-title v-if="chatRoom.subTitle">{{ chatRoom.subTitle.sender }}: {{ chatRoom.subTitle.content }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
      isLoading: true,
      chatRooms: []
    }
  },
  methods: {
    async load () {
      let { error, rooms } = await this.$api.getChatRooms()
      if (error) {
        console.log(error)
      } else {
        this.chatRooms = rooms
        this.chatRooms.forEach(async (room) => {
          let { error, messageKey } = await this.$api.getChatRoomMessageKey(room.username, this.$store.state.privateKey)
          if (error) {
            console.log(error)
          } else {
            let { error, message } = await this.$api.getChatRoomLastMessage(room.username, messageKey)
            if (error) {
              console.log(error)
            } else if (message) {
              room.subTitle = this.getRoomSubTitle(room, message)
            }
          }
        })
      }
      this.isLoading = false
    },
    getRoomSubTitle (room, lastMessage) {
      console.log(lastMessage)
      let sender = lastMessage.sender === room.username ? room.nickname : '我'
      let content = ''
      if (lastMessage.type === 'text') {
        content = lastMessage.content
      } else {
        console.log('soooooo weird')
      }
      return { sender, content }
    }
  },
  mounted () {
    this.load()
  }
}
</script>
