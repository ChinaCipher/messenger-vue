<template>
  <v-list-tile
    avatar
    @click="$emit('click')"
  >
    <v-list-tile-avatar
      color="primary"
      size="48"
    >
      <v-img
        :src="avatar"
      ></v-img>
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
    avatar () {
      return this.avatarUrl ? this.avatarUrl : '/img/default_avatar.png'
    }
  },
  data () {
    return {}
  },
  props: {
    avatarUrl: String,
    username: String,
    nickname: String,
    lastMessage: String
  }
}
</script>
