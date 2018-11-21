<template>
    <v-card
        class="pa-5"
        @keydown.enter="login"
    >
        <v-card-text class="pa-0">
            <v-layout row wrap>
                <v-flex xs12 class="headline text-xs-center">
                    早安，我的朋友
                </v-flex>
                <v-flex xs12 class="headline text-xs-center py-2">
                    <v-icon size="120">account_circle</v-icon>
                </v-flex>
                <v-flex>
                    <v-text-field
                        v-model="email"
                        label="信箱"
                        prepend-inner-icon="email"
                        :disabled="isLoading"
                    ></v-text-field>
                </v-flex>
                <v-flex>
                    <v-text-field
                        v-model="password"
                        label="密碼"
                        prepend-inner-icon="lock"
                        :disabled="isLoading"
                        :append-icon="showPassword ? 'visibility_off' : 'visibility'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                </v-flex>
            </v-layout>
        </v-card-text>
        <v-card-actions class="pa-0">
            <v-btn
                color="primary"
                block
                @click="login"
                :loading="isLoading"
                :disabled="isLoading"
            >
                登入
                <span slot="loader">
                    登入中
                </span>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
  data () {
    return {
      email: null,
      password: null,
      showPassword: false,
      isLoading: false
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
      vm.email = null
      vm.password = null
      vm.showPassword = false
      vm.isLoading = false
    }
  }
}
</script>
