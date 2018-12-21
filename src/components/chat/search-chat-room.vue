<template>
  <!-- <v-layout
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
  </v-layout> -->
  <v-layout
    row
    wrap
  >
    <create-chat-room-dialog
      v-if="resultUserInfo"
      v-model="showCreateChatRoomDialog"
      :userInfo="resultUserInfo"
    ></create-chat-room-dialog>
    <v-flex xs12>
      <v-card flat>
        <v-card-actions>
          <v-text-field
            v-model="searchUsername"
            prepend-inner-icon="search"
            label="搜索用戶"
            single-line
            hide-details
            :solo="!$store.state.darkTheme"
            :solo-inverted="$store.state.darkTheme"
            @input="search"
          >
            <v-fade-transition slot="append">
              <v-progress-circular
                v-if="isSearching"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-fade-transition>
          </v-text-field>
        </v-card-actions>
      </v-card>
      <template v-if="!!searchUsername">
        <v-divider></v-divider>
        <v-subheader>搜尋用戶</v-subheader>
        <v-list
          class="pa-0"
          two-line
        >
          <v-list-tile
            v-if="$store.state.userInfo.username !== searchUsername && !!resultUserInfo"
            avatar
            @click="clickSearchResult"
          >
            <v-list-tile-avatar>
              <img :src="resultUserInfo.avatar">
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title>{{ resultUserInfo.nickname }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-card v-else>
            <v-card-text class="text-xs-center">
              找不到此用戶
            </v-card-text>
          </v-card>
        </v-list>
      </template>
    </v-flex>
  </v-layout>
</template>

<script>
import CreateChatRoomDialog from './create-chat-room-dialog'

export default {
  components: {
    CreateChatRoomDialog
  },
  data () {
    return {
      isSearching: false,
      searchUsername: '',
      resultUserInfo: undefined,
      resultUserPublicKey: undefined,
      showCreateChatRoomDialog: false
    }
  },
  methods: {
    async search () {
      if (this.searchUsername) {
        this.isSearching = true
        let { error, user, publicKey } = await this.$api.getUserInfo(
          this.searchUsername
        )
        this.isSearching = false
        if (error) {
          // console.log(error)
          this.resultUserInfo = undefined
          this.resultUserPublicKey = undefined
        } else {
          this.resultUserInfo = user
          this.resultUserPublicKey = publicKey
        }
      }
    },
    async clickSearchResult () {
      let { error, messageKey } = await this.$api.getChatRoomMessageKey(
        this.resultUserInfo.username,
        this.$store.state.privateKey
      )
      // if (error) {
      //   if (error === 401) {
      //     console.log(error)
      //   } else if (error === 404) {
      //     console.log('尚未建立聊天室')
      //     this.showCreateChatRoomDialog = true
      //   }
      // } else {
      //   console.log('已建立過聊天室')
      // }
    }
  }
}
</script>
