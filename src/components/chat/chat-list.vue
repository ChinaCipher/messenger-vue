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
        @click="$emit('click-chat-room', chatRoom)"
      >
        <v-list-tile-avatar
          color="primary"
          size="48"
        >
          <img :src="chatRoom.avatar">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title class="headline">{{ chatRoom.nickname }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ chatRoom.username }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  computed: {},
  data () {
    return {
      isLoading: true,
      chatRooms: []
    }
  },
  methods: {
    async loadData () {
      let { error, rooms } = await this.$api.getChatRooms()
      this.isLoading = false
      if (error) {
        console.log(error)
      } else {
        this.chatRooms = rooms
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
