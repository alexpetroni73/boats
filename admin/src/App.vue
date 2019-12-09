<template>
  <v-app>
    <v-navigation-drawer
    :clipped="$vuetify.breakpoint.lgAndUp"
    v-model="drawer"
    app
    >
      <MainSideMenu></MainSideMenu>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>

     <v-toolbar-title>Admin</v-toolbar-title>

     <v-spacer></v-spacer>

     <v-btn icon>
       <v-icon>mdi-heart</v-icon>
     </v-btn>

     <v-btn icon>
       <v-icon>mdi-magnify</v-icon>
     </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import MainSideMenu from '@/components/MainSideMenu'

export default {
  name: 'App',
  components: {
    MainSideMenu,
  },
  data () {
    return {
      drawer: true,
    }
  },

  methods: {
  }
}
</script>
