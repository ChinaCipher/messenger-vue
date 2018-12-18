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

    <v-list avatar>
      <v-list-tile>
        <v-switch
          label="深色主題"
          v-model="darkTheme"
        ></v-switch>
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
export default {
  data () {
    return {

    }
  },
  computed: {
    darkTheme: {
      set (value) {
        this.$store.dispatch('switchDarkTheme', value)
        localStorage.setItem('darkTheme', JSON.stringify(value))
      },
      get () {
        return this.$store.getters.darkTheme
      }
    }
  },
  methods: {
    logout () {
      this.$api.logout()
        .then(successful => {
          this.$store.dispatch('logout')
        })
    }
  }
}
</script>
