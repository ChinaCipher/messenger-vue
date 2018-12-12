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
    <chat-list-item
      :avatarUrl="selfData.avatarUrl"
      :username="selfData.username"
      :nickname="selfData.nickname"
      :lastMessage="selfData.lastMessage"
    ></chat-list-item>
    <template v-for="(data, index) in chatDatas">
      <v-divider
        :key="'divider' + index"
        inset
      ></v-divider>
      <chat-list-item
        :key="'chat-list-item' + index"
        :avatarUrl="data.avatarUrl"
        :username="data.username"
        :nickname="data.nickname"
        :lastMessage="data.lastMessage"
        @click="clickChatListItem(index)"
      ></chat-list-item>
    </template>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex'
import ChatListItem from '@/components/chat/chat-list-item'

export default {
  components: {
    ChatListItem
  },
  computed: {
    ...mapGetters(['selfData'])
  },
  data () {
    return {
      isLoading: true,
      chatDatas: []
    }
  },
  methods: {
    loadTestData () {
      const vm = this
      setTimeout(() => {
        vm.$store.dispatch('updateSelfData', {
          avatarUrl: '',
          username: 'wecp0826',
          nickname: 'DevilTea',
          lastMessage: '你上次說了什麼？'
        })
        vm.chatDatas = [
          {
            avatarUrl: '',
            username: 'weqrqrqwe',
            nickname: 'qwerqwerr',
            lastMessage: '你上次說了什麼？'
          },
          {
            avatarUrl: '',
            username: 'asdfasdf',
            nickname: 'asdfasdf',
            lastMessage: '你上次說了什麼？'
          },
          {
            avatarUrl: '',
            username: 'qwerqwer',
            nickname: 'qwerqwer',
            lastMessage: '你上次說了什麼？'
          },
          {
            avatarUrl: '',
            username: 'dfghdfgh',
            nickname: 'dfghdfgh',
            lastMessage: '你上次說了什麼？'
          },
          {
            avatarUrl: '',
            username: 'cvbncvbn',
            nickname: 'cvbncvbn',
            lastMessage: '你上次說了什麼？'
          },
          {
            avatarUrl: '',
            username: 'hjklhjkl',
            nickname: 'hjklhjkl',
            lastMessage: '你上次說了什麼？'
          }
        ]
        vm.isLoading = false
      }, 1000)
    },
    loadData () {},
    clickChatListItem (index) {
      this.$store.dispatch('updateChattingData', this.chatDatas[index])
    }
  },
  mounted () {
    this.loadTestData()
  }
}
</script>
