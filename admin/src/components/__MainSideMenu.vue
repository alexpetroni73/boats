<template>
  <div >
    <v-list dense>
      <template v-for="item in items">
        <v-layout
          v-if="item.heading"
          :key="item.heading"
          row
          align-center
        >
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          v-model="item.model"
          :key="item.text"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            @click="navigate(child.pathname)"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.text" @click="navigate(item.pathname)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
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
      { icon: 'dashboard', text: 'Dashboard', pathname: 'home' },

      {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Catalog',
        model: false,
        children: [
          { text: 'Products', pathname:'products' },
          { text: 'Categories', pathname:'categories' },
          { text: 'Tags', pathname:'tags' },
          { text: 'Families', pathname:'families' },
          { text: 'Brands', pathname:'brands' },
          { text: 'Variable Features', pathname:'variable-features' },
        //  { text: 'Sales', pathname:'sales' },
        ]
      },

      // { icon: 'perm_media', text: 'Media', pathname: 'media' },
      { icon: 'perm_media', text: 'Media', pathname: 'media' },
      { icon: 'attach_money', text: 'Orders' , pathname: 'orders'},
      { icon: 'group', text: 'Clients' , pathname: 'clients'},
      { icon: 'import_export', text: 'Products Import' , pathname: 'products-import'},
      { icon: 'publish', text: 'Prices Update' , pathname: 'prices-update'},
    //  { icon: 'insert_drive_file', text: 'Pages' , pathname: 'pages'},
      { icon: 'settings', text: 'Settings', pathname: 'settings' },
    ]
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
