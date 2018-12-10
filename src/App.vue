<template>
  <v-app :dark="dark">
    <login-register-dialog v-model="showLoginRegisterDialog"></login-register-dialog>

    <v-navigation-drawer
      app
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
            :solo="!dark"
            :solo-inverted="dark"
          ></v-text-field>
        </v-card-actions>
      </v-card>
      <v-divider></v-divider>
      <v-list></v-list>
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
      <v-menu
        min-width="150"
        left
        offset-y
        nudge-bottom="10"
      >
        <v-btn
          slot="activator"
          icon
        >
          <v-icon>more_vert</v-icon>
        </v-btn>

        <v-list>
          <v-list-tile>
            <v-switch
              label="深色主題"
              v-model="dark"
            ></v-switch>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>
              <v-layout
                row
                wrap
                align-center
              >
                <v-icon>settings</v-icon>
                <pre>  設定</pre>
              </v-layout>
            </v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>
              <v-layout
                row
                wrap
                align-center
              >
                <v-icon>exit_to_app</v-icon>
                <pre>  登出</pre>
              </v-layout>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
import LoginRegisterDialog from '@/components/login-register/LoginRegisterDialog'

export default {
  data () {
    return {
      dark: true,
      showDrawer: null,
      showLoginRegisterDialog: true
    }
  },
  components: {
    LoginRegisterDialog
  }
}
</script>
