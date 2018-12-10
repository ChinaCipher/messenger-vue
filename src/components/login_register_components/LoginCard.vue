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
            v-model="username"
            label="用戶名稱"
            prepend-inner-icon="person"
            :disabled="isLoading"
            :rules="[rules.required, rules.min, rules.max, rules.ascii]"
            counter="25"
          ></v-text-field>
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="password"
            label="用戶密碼"
            prepend-inner-icon="lock"
            :disabled="isLoading"
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            :type="showPassword ? 'text' : 'password'"
            @mousedown="showPassword = true"
            @mouseup="showPassword = false"
            :rules="[rules.required, rules.min, rules.max, rules.ascii]"
            counter="25"
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
        :disabled="isLoading"
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
      password: '',
      showPassword: false,
      isLoading: false,
      rules: {
        required: value => !!value || '* 必填',
        min: value => value.length >= 8 || '* 長度至少為 8 個字元',
        max: value => value.length <= 25 || '* 長度最多為 25 個字元',
        ascii: value =>
          new RegExp('^[\\\x00-\x7F]*$').test(value) || '* 僅允許 ascii 字元'
      }
    }
  },
  methods: {
    login () {
      const vm = this
      if (!vm.isLoading) {
        vm.isLoading = true
        setTimeout(() => {
          vm.isLoading = false
          vm.$emit('logged-in')
          vm.resetLoginData()
        }, 3000)
      }
    },
    resetLoginData () {
      const vm = this
      vm.username = ''
      vm.password = ''
      vm.showPassword = false
      vm.isLoading = false
    }
  }
}
</script>
