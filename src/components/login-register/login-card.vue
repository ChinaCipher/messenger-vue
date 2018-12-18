<template>
  <v-card
    class="pa-5"
    @keydown.enter="login"
  >
    <v-dialog
      v-model="showFailedDialog"
      max-width="200"
    >
      <v-card>
        <v-card-text class="text-xs-center headline">
          <p><v-icon size="48" color="primary">warning</v-icon></p>
          <p>登入失敗</p>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card-text class="pa-0">
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          class="headline text-xs-center"
        >早安，我的朋友</v-flex>
        <v-flex
          xs12
          class="headline text-xs-center py-2"
        >
          <v-icon size="120">account_circle</v-icon>
        </v-flex>
        <v-flex>
          <v-text-field
            ref="username"
            v-model="username"
            label="用戶名稱"
            prepend-inner-icon="person"
            :disabled="isLoading"
            :rules="[value => validate(value, hasError => usernameHasError = hasError)]"
            :error-messages="errorMessage"
            counter="30"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            ref="password"
            v-model="password"
            label="用戶密碼"
            prepend-inner-icon="lock"
            :disabled="isLoading"
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            :rules="[value => validate(value, hasError => passwordHasError = hasError)]"
            counter="30"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="pa-0 pt-3">
      <v-btn
        color="primary"
        block
        @click="login"
        :loading="isLoading"
        :disabled="usernameHasError || !usernameExistedChecked || !usernameExisted || passwordHasError || isLoading"
      >
        登入
        <span slot="loader">登入中</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      usernameHasError: false,
      usernameExisted: false,
      usernameExistedChecked: false,
      errorMessage: '',
      password: '',
      passwordHasError: false,
      showPassword: false,
      isLoading: false,
      showFailedDialog: false,
      rules: {
        required: value => !!value,
        min: value => value.length >= 8,
        max: value => value.length <= 30,
        ascii: value => (new RegExp('^[\\\x00-\x7F]*$')).test(value)
      }
    }
  },
  watch: {
    username () {
      this.checkUsernameExisted()
    }
  },
  methods: {
    checkUsernameExisted () {
      this.usernameExistedChecked = false
      // this.$api.getUserInfo(this.username)
      const delay = (ms) => new Promise((resolve, reject) => {
        try {
          setTimeout(resolve, ms)
        } catch (e) {
          reject(e)
        }
      })
      delay(1000)
        .then(() => {
          return this.username === 'adminadmin'
        })
        .then(info => {
          this.usernameExistedChecked = true
          if (!info) {
            this.usernameExisted = false
            this.errorMessage = this.usernameHasError ? '' : '* 不存在的用戶名稱'
          } else {
            this.usernameExisted = true
            this.errorMessage = ''
          }
        })
    },
    validate (value, callback) {
      let rules = this.rules
      let message = ''
      let hasError = false
      if (!rules.required(value)) {
        message = '* 必填'
      } else if (!rules.min(value)) {
        message = '* 長度最少為 8 個字元'
      } else if (!rules.max(value)) {
        message = '* 長度最多為 30 個字元'
      } else if (!rules.ascii(value)) {
        message = '* 內容必須是 ascii 字元'
      }
      hasError = !!message
      callback(hasError)
      return !hasError || message
    },
    async login () {
      if (!this.isLoading) {
        this.isLoading = true
        let info = await this.$api.login(this.username, this.password)
        this.isLoading = false
        if (info) {
          this.$store.dispatch('setUserInfo', info)
          this.$store.dispatch('login')
          this.resetLoginData()
          this.$emit('logged-in')
        } else {
          this.showFailedDialog = true
        }
      }
    },
    resetLoginData () {
      this.$refs.username.reset()
      this.$refs.password.reset()
      this.showPassword = false
    }
  }
}
</script>
