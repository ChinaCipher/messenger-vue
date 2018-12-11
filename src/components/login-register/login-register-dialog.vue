<template>
  <v-dialog
    :value="value"
    @input="$emit('input', $event)"
    persistent
    width="400"
  >
    <v-tabs
      v-model="currentTab"
      slider-color="primary"
      grow
    >
      <v-tab href="#tab-login">
        <span class="title">登入</span>
      </v-tab>
      <v-tab href="#tab-register">
        <span class="title">註冊</span>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="currentTab">
      <v-tab-item value="tab-login">
        <login-card @logged-in="$emit('input', false)"></login-card>
      </v-tab-item>
      <v-tab-item value="tab-register">
        <register-card @registered="currentTab = 'tab-login'"></register-card>
      </v-tab-item>
    </v-tabs-items>
  </v-dialog>
</template>

<script>
import LoginCard from '@/components/login-register/login-card'
import RegisterCard from '@/components/login-register/register-card'

export default {
  props: {
    value: Boolean
  },
  data () {
    return {
      currentTab: null
    }
  },
  components: {
    LoginCard,
    RegisterCard
  }
}
</script>
