<template>
  <v-app :dark="$store.getters.darkTheme">
    <login-register-dialog v-model="showLoginRegisterDialog"></login-register-dialog>

    <v-navigation-drawer
      app
      v-if="$store.getters.loggedIn"
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
            :solo="!$store.getters.darkTheme"
            :solo-inverted="$store.getters.darkTheme"
          ></v-text-field>
        </v-card-actions>
      </v-card>
      <v-divider></v-divider>
      <chat-list></chat-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      absolute
      clipped-left
      height="90"
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
          <v-img
            src="/img/icons/logo.png"
            height="72"
            width="72"
          ></v-img>
          <span class="display-1">瓷器信使</span>
        </v-layout>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-menu></toolbar-menu>
    </v-toolbar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>

    <v-footer app>
      <v-layout
        row
        wrap
        align-center
      >
        <v-spacer></v-spacer>
        <v-icon
          color="primary"
          size="14"
        >lock</v-icon>
        <pre> China Cipher Messenger</pre>
        <v-spacer></v-spacer>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import ToolbarMenu from '@/components/toolbar-menu'
import LoginRegisterDialog from '@/components/login-register/login-register-dialog'
import ChatList from '@/components/chat/chat-list'

export default {
  mounted () {
    if (localStorage.getItem('darkTheme')) {
      try {
        this.darkTheme = JSON.parse(localStorage.getItem('darkTheme'))
      } catch (e) {
        localStorage.removeItem('darkTheme')
      }
    }
  },
  data () {
    return {
      showDrawer: null,
      showLoginRegisterDialog: true
    }
  },
  components: {
    ToolbarMenu,
    LoginRegisterDialog,
    ChatList
  }
}
</script>
