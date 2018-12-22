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
          <p>
            <v-icon
              size="48"
              color="primary"
            >warning</v-icon>
          </p>
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
            :rules="[checkUsername]"
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
            :rules="[checkPassword]"
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
        :disabled="!btnLoginEnabled"
      >
        登入
        <span slot="loader">登入中</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    btnLoginEnabled () {
      return (
        !this.usernameHasError &&
        this.usernameExistedChecked &&
        this.usernameExisted &&
        !this.passwordHasError &&
        !this.isLoading &&
        !this.isReseting
      )
    }
  },
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
      isReseting: false,
      showFailedDialog: false,
      rules: {
        required: value => !!value,
        min: value => value.length >= 8,
        max: value => value.length <= 30,
        ascii: value => new RegExp('^[\\\x00-\x7F]*$').test(value)
      }
    }
  },
  methods: {
    async checkUsernameExisted () {
      this.usernameExistedChecked = false
      let { error } = await this.$api.getUserInfo(this.username)
      this.usernameExisted = !error
      this.usernameExistedChecked = true
      if (!this.usernameExisted) {
        this.errorMessage = this.usernameHasError
          ? ''
          : '* 不存在的用戶名稱'
      } else {
        this.errorMessage = ''
      }
    },
    validate (value) {
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
      return !hasError || message
    },
    checkUsername (value) {
      let result = this.validate(value)
      this.usernameHasError = typeof result === 'string'
      !this.isReseting && !this.usernameHasError && this.checkUsernameExisted()
      return result
    },
    checkPassword (value) {
      let result = this.validate(value)
      this.passwordHasError = typeof result === 'string'
      return result
    },
    async login () {
      if (this.btnLoginEnabled) {
        this.isLoading = true
        let { error, user, privateKey } = await this.$api.login(this.username, this.password, this.$store.state.code)
        this.isLoading = false
        if (error) {
          if (error === 401) {
            console.log(error)
            await this.sayHelloToServer()
            this.showFailedDialog = true
          }
        } else {
          this.$store.dispatch('setUserInfo', user)
          this.$store.dispatch('setPrivateKey', privateKey)
          this.$emit('logged-in')
        }
      }
    },
    reset () {
      this.isReseting = true
      this.username = ''
      this.usernameHasError = false
      this.usernameExisted = false
      this.usernameExistedChecked = false
      this.errorMessage = ''
      this.password = ''
      this.passwordHasError = false
      this.showPassword = false
      this.isLoading = false
      this.showFailedDialog = false
      this.$refs.username.onBlur()
      this.$refs.password.onBlur()
      this.$refs.username.reset()
      this.$refs.password.reset()
      this.isReseting = false
    },
    async sayHelloToServer () {
      let { code, profile } = await this.$api.sayHelloToServer()
      this.$store.dispatch('setCode', code)
      if (profile) {
        let { error } = await this.$api.logout()
        if (error) {
          console.log('logout failed')
        } else {
          await this.sayHelloToServer()
        }
      }
    }
  }
}
</script>
