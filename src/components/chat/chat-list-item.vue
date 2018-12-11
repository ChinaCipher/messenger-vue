<template>
  <v-list-tile avatar>
    <v-list-tile-avatar color="primary">
      <v-img
        v-if="hasAvatar"
        :src="avatarUrl"
      ></v-img>
      <span v-else>{{ defaultAvatar }}</span>
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title>{{ nickname }}</v-list-tile-title>
      <v-list-tile-sub-title>{{ lastMessage }}</v-list-tile-sub-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  computed: {
    hasAvatar () {
      return !!this.avatarUrl
    },
    defaultAvatar () {
      return this.nickname[0]
    }
  },
  data () {
    return {
    }
  },
  props: {
    avatarUrl: String,
    username: String,
    nickname: String,
    lastMessage: String
  }
}
</script>
