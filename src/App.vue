<template>
  <v-app
    style="min-width: 320px; overflow-x: auto;"
    :dark="$store.state.darkTheme"
  >
    <login-register-dialog v-if="$store.state.code" :value="!$store.getters.loggedIn"></login-register-dialog>

    <v-navigation-drawer
      app
      v-if="$store.getters.loggedIn"
      v-model="showDrawer"
      clipped
      hide-overlay
      mobile-break-point="768"
    >
      <search-chat></search-chat>
      <v-divider></v-divider>
      <chat-list></chat-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      absolute
      clipped-left
      clipped-right
      height="90"
      flat
    >
      <v-toolbar-side-icon
        v-if="$vuetify.breakpoint.width < 768"
        @click="showDrawer = !showDrawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-layout
          row
          wrap
          align-center
        >
          <span class="display-1">瓷器</span>
          <v-avatar>
            <v-img src="/img/logo.png"></v-img>
          </v-avatar>
          <span class="display-1">信使</span>
        </v-layout>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-menu></toolbar-menu>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-footer
      app
      class="pa-0"
    >
      <v-layout
        row
        wrap
        align-center
        justify-center
      >
        <v-icon
          color="primary"
          size="14"
        >lock</v-icon>
        <pre> China Cipher Messenger</pre>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import ToolbarMenu from '@/components/toolbar-menu'
import LoginRegisterDialog from '@/components/login-register/login-register-dialog'
import ChatList from '@/components/chat/chat-list'
import SearchChat from '@/components/chat/search-chat'

export default {
  computed: {
    showLoginRegisterDialog () {
      return !this.$store.getters.loggedIn
    }
  },
  mounted () {
    this.sayHelloToServer()
    window.addEventListener('keypress', e => {
      if (e.key === 'Escape' && this.$route.name === 'chatroom') {
        this.$router.replace('/')
      }
    })
    if (!localStorage.getItem('darkTheme')) {
      localStorage.setItem('darkTheme', JSON.stringify(true))
    }

    try {
      this.$store.dispatch(
        'switchDarkTheme',
        JSON.parse(localStorage.getItem('darkTheme'))
      )
    } catch (e) {
      localStorage.removeItem('darkTheme')
    }
  },
  data () {
    return {
      showDrawer: null
    }
  },
  components: {
    ToolbarMenu,
    LoginRegisterDialog,
    ChatList,
    SearchChat
  },
  methods: {
    async sayHelloToServer () {
      let { code, profile } = await this.$api.sayHelloToServer()
      this.$store.dispatch('setCode', code)
      if (profile) {
        this.$store.dispatch('setUserInfo', profile.user)
        this.$store.dispatch('setPrivateKey', profile.privateKey)
      }
    }
  }
}
</script>

<style>
* {
  font-family: Helvetica, Arial, "文泉驛正黑", "WenQuanYi Zen Hei", "儷黑 Pro",
    "LiHei Pro", "黑體-繁", "Heiti TC", "微軟正黑體", "Microsoft JhengHei",
    sans-serif;
}
</style>
