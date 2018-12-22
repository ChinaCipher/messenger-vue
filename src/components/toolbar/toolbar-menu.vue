<template>
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

    <modify-info-dialog v-model="showModifyInfoDialog"></modify-info-dialog>

    <v-list avatar>
      <v-list-tile @click="darkTheme = !darkTheme">
        <v-list-tile-avatar>
          <v-switch
            v-model="darkTheme"
          ></v-switch>
        </v-list-tile-avatar>
        <v-list-tile-title>深色主題</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="showModifyInfoDialog = !showModifyInfoDialog">
        <v-list-tile-avatar>
          <v-icon>edit</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>修改用戶資訊</v-list-tile-title>
      </v-list-tile>
      <v-list-tile @click="logout">
        <v-list-tile-avatar>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-title>登出</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import ModifyInfoDialog from './modify-info-dialog'

export default {
  data () {
    return {
      showModifyInfoDialog: false
    }
  },
  components: {
    ModifyInfoDialog
  },
  computed: {
    darkTheme: {
      set (value) {
        this.$store.dispatch('switchDarkTheme', value)
        localStorage.setItem('darkTheme', JSON.stringify(value))
      },
      get () {
        return this.$store.state.darkTheme
      }
    }
  },
  methods: {
    async logout () {
      let { error } = await this.$api.logout()
      if (error) {
        console.log(error)
      } else {
        this.$store.dispatch('logout')
        await this.sayHelloToServer()
      }
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
