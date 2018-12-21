<template>
  <v-dialog
    :value="value"
    @input="closeDialog"
    max-width="400"
  >
    <v-card>
      <v-card-text class="text-xs-center display-1">
        修改用戶資訊
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
            <v-hover>
              <v-avatar
                slot-scope="{ hover }"
                size="256"
                class="elevation-12"
              >
                <v-img :src="previewUrl || input.avatar">
                  <v-fade-transition>
                    <label
                      v-if="hover"
                      style="display: block; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3); cursor: pointer;"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        id="file"
                        @change="handleFileUpload"
                        style="display: none;"
                      >
                      <v-icon size="72">edit</v-icon>
                    </label>
                  </v-fade-transition>
                </v-img>
              </v-avatar>
            </v-hover>
          </v-flex>
          <v-flex xs12>
            <v-text-field
              v-model="input.nickname"
              name="nickname"
              label="暱稱"
              id="nickname"
              class="headline"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="px-5 pt-3 pb-5">
        <v-btn
          color="primary"
          block
          @click="submit"
          :loading="isLoading"
          :disabled="!btnSubmitEnabled"
        >
          送出
          <span slot="loader">送出中</span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean
  },
  watch: {
    userInfoLoaded () {
      if (this.userInfo) {
        this.input.avatar = this.userInfo.avatar
        this.input.nickname = this.userInfo.nickname
      }
    }
  },
  computed: {
    userInfoLoaded () {
      return !!this.userInfo
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    btnSubmitEnabled () {
      return false
    }
  },
  methods: {
    handleFileUpload (e) {
      this.file = e.target.files[0]
      this.previewUrl = URL.createObjectURL(this.file)
    },
    submit () {

    },
    closeDialog () {
      this.$emit('input', this.$event)
      this.reset()
    },
    reset () {
      this.file = ''
      this.previewUrl = ''
      this.input.avatar = this.userInfo.avatar
      this.input.nickname = this.userInfo.nickname
      this.isLoading = false
    }
  },
  data () {
    return {
      file: '',
      previewUrl: '',
      input: {
        avatar: undefined,
        nickname: ''
      },
      isLoading: false
    }
  }
}
</script>
