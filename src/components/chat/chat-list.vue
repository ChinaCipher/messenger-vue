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
    <template v-for="(contact, index) in contacts">
      <v-divider
        v-if="index != 0"
        :key="'divider' + index"
        inset
      ></v-divider>
      <v-list-tile
        :key="'item' + index"
        avatar
        :to="'/chatroom/' + contact.username"
      >
        <v-list-tile-avatar
          color="primary"
          size="48"
        >
          <v-img
            :src="contact.avatarUrl ? contact.avatarUrl : '/img/default_avatar.png'"
          ></v-img>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ contact.nickname }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ contact.lastMessage }}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['selfInfo', 'contacts'])
  },
  data () {
    return {
      isLoading: true,
      chatDatas: []
    }
  },
  methods: {
    loadData () {},
    clickChatListItem (index) {
      this.$store.dispatch('updateChatRoomInfo', this.contacts[index])
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>
