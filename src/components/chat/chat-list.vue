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
    two-line
  >
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
      >
        <v-list-tile-avatar
          color="primary"
          size="48"
        >
          <img :src="chatRoom.avatarUrl ? chatRoom.avatarUrl : '/img/default_avatar.png'">
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ chatRoom.nickname }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ chatRoom.lastMessage }}</v-list-tile-sub-title>
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
      chatRooms: [
        {
          avatarUrl: '',
          username: '',
          nickname: ''
        }
      ]
    }
  },
  methods: {
    loadData () {},
    clickChatListItem (index) {}
  },
  mounted () {
    this.loadData()
  }
}
</script>
