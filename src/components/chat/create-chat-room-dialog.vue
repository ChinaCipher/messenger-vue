<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    max-width="300"
  >
    <v-card>
      <v-card-text class="text-xs-center display-1">
        用戶資訊
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text class="px-5">
        <v-layout
          row
          wrap
          justify-center
          align-center
          class="text-xs-center"
        >
          <v-flex
            xs12
            class="mb-3"
          >
            <v-avatar
              size="200"
              class="elevation-12"
            >
              <v-img :src="userInfo.avatar">
              </v-img>
            </v-avatar>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-text class="text-xs-center headline pt-0">
        {{ userInfo.nickname }}
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="px-5 pb-5 pt-4">
        <v-btn
          color="primary"
          block
          @click="create"
          :loading="isLoading"
          :disabled="isLoading"
        >
          建立聊天室
          <span slot="loader">建立中</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
    userInfo: Object
  },
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    async create () {
      this.isLoading = true
      let { error } = await this.$api.createChatRoom(this.userInfo.username)
      if (error) {
        console.log(error)
      } else {
        console.log('created chat room')
      }
      this.isLoading = false
      this.$emit('input', false)
    }
  }
}
</script>
