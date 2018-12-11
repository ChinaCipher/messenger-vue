<template>
  <v-card
    class="pa-5"
    @keydown.enter="login"
  >
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
            @mousedown="showPassword = true"
            @mouseup="showPassword = false"
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
        :disabled="usernameHasError || passwordHasError || isLoading"
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
      password: '',
      passwordHasError: false,
      showPassword: false,
      isLoading: false,
      rules: {
        required: value => !!value,
        min: value => value.length >= 8,
        max: value => value.length <= 30,
        ascii: value => (new RegExp('^[\\\x00-\x7F]*$')).test(value)
      }
    }
  },
  methods: {
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
    login () {
      if (!this.isLoading) {
        this.isLoading = true
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })

        promise.then(() => {
          this.isLoading = false
          this.$store.dispatch('login')
          this.$emit('logged-in')
          this.resetLoginData()
        })
      }
    },
    resetLoginData () {
      this.$refs.username.reset()
      this.$refs.password.reset()
      this.showPassword = false
      this.isLoading = false
    }
  }
}
</script>
