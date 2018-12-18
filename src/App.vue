<template>
  <v-app style="min-width: 320px; overflow-x: auto;" :dark="$store.state.darkTheme">
    <login-register-dialog :value="showLoginRegisterDialog"></login-register-dialog>

    <v-navigation-drawer
      app
      v-if="$store.state.loggedIn"
      v-model="showDrawer"
      clipped
      hide-overlay
      mobile-break-point="768"
    >
      <v-card flat>
        <v-card-actions>
          <v-text-field
            prepend-inner-icon="search"
            label="搜索用戶"
            single-line
            hide-details
            :solo="!$store.state.darkTheme"
            :solo-inverted="$store.state.darkTheme"
          ></v-text-field>
        </v-card-actions>
      </v-card>
      <v-divider></v-divider>
      <chat-list></chat-list>
    </v-navigation-drawer>

    <!-- <v-navigation-drawer
      app
      v-if="$store.getters.loggedIn"
      right
      clipped
      hide-overlay
      mobile-break-point="960"
    >
    </v-navigation-drawer> -->

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
      <router-view/>
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

export default {
  computed: {
    showLoginRegisterDialog () {
      return !this.$store.state.loggedIn
    }
  },
  mounted () {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
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
    ChatList
  },
  methods: {
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
