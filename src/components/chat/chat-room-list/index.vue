<template>
  <v-layout
    row
    wrap
    fill-height
  >
    <v-flex xs12>
      <search-chat-room @chat-created="refresh"></search-chat-room>
      <v-divider></v-divider>
      <v-layout
        v-if="isLoading && isFirstRefresh"
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
        <v-subheader>聊天室</v-subheader>
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
              color="grey darken-4"
              size="48"
            >
              <img :src="chatRoom.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ chatRoom.nickname }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ chatRoom.subTitle }}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
import SearchChatRoom from './search-chat-room'
export default {
  components: {
    SearchChatRoom
  },
  data () {
    return {
      isFirstRefresh: true,
      isLoading: false,
      chatRooms: []
    }
  },
  methods: {
    async refresh () {
      this.isFirstRefresh = false
      this.isLoading = true
      let { error, rooms } = await this.$api.getChatRooms()
      if (error) {
        console.log(error)
      } else {
        await rooms.forEach(async room => {
          let { error, messageKey } = await this.$api.getChatRoomMessageKey(
            room.username,
            this.$store.state.privateKey
          )
          if (error) {
            console.log(error)
          } else {
            let { error, message } = await this.$api.getChatRoomLastMessage(
              room.username,
              messageKey
            )
            if (error) {
              console.log(error)
            } else {
              await this.$set(
                room,
                'subTitle',
                message ? this.getRoomSubTitle(room, message) : ''
              )
            }
          }
        })
        this.chatRooms = rooms
      }
      this.isLoading = false
      console.log('refreshed')
    },
    getRoomSubTitle (room, lastMessage) {
      let sender = lastMessage.sender === room.username ? room.nickname : '我'
      let content = ''
      if (lastMessage.type === 'text') {
        content = lastMessage.content
      } else {
        console.log('soooooo weird')
      }
      return `${sender}: ${content}`
    }
  },
  mounted () {
    this.$ccm.socket.on('message', this.refresh)
    this.refresh()
  }
}
</script>
