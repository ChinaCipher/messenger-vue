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

    <v-list>
      <v-list-tile>
        <v-switch
          label="深色主題"
          v-model="darkTheme"
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
  }
}
</script>
