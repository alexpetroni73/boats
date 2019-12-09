<template>
  <div>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="title">
          Application
        </v-list-item-title>
        <v-list-item-subtitle>
          subtext
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list
      dense
      nav
    >
      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>

</template>

<script>

export default {
  props: [],

  components: {

  },

  data: () => ({
    items: [
    { title: 'Dashboard', icon: 'mdi-view-dashboard' },
    { title: 'Boats', icon: 'mdi-ship-wheel' },
    { title: 'Cruises', icon: 'mdi-map-marker-path' },
    { title: 'Bookings', icon: 'mdi-ticket-account' },
    { title: 'Settings', icon: 'mdi-cogs' },
  ],
  right: null,
  }),

  computed: {

  },

  methods: {
    navigate (val) {
      this.$router.push({name: val}).catch(err => {
        console.log('err %o', err)
      })
    }
  },


}

</script>
