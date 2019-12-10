<template>
<v-container fluid>
   <v-row>
     <v-col sm="12">
       <v-card>
         <v-toolbar>
           <v-app-bar-nav-icon></v-app-bar-nav-icon>
           <v-toolbar-title>Boats</v-toolbar-title>
          <v-spacer></v-spacer>

           <v-btn
           @click="addBoat()"
           class="mx-2"
           small
           fab
           dark
           color="primary"
           >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>

         </v-toolbar>


         <v-card-text>
           <v-data-iterator
             :items="paginatedBoats.items"
             :server-items-length="paginatedBoats.total"
             :options.sync="options"
             :items-per-page.sync="itemsPerPage"
             :footer-props="{ itemsPerPageOptions }"
           >
             <template v-slot:default="props">
              <v-row>
                <v-col
                  v-for="item in props.items"
                  :key="item.name"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card>
                    <v-card-title><h4>{{ item.name }}</h4></v-card-title>

                    <v-btn
                    @click="editBoat(item.id)"
                    icon
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </v-card>
                </v-col>
              </v-row>
            </template>
         </v-data-iterator>
       </v-card-text>
       </v-card>
     </v-col>
   </v-row>
 </v-container>
</template>

<script>

import PaginatedBoats from '@/graphql/boat/PaginatedBoats.gql'

export default {
  name: 'Boats',

  components: {

  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: {

  },

  model: {

  },

  props: {

  },

  data () {
    return {
      paginatedBoats: {
        items: [],
        total: -1
      },

      options: {},

      itemsPerPageOptions: [1,2,4, 8, 12],
      itemsPerPage: 1,
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    addBoat () {
      this.$router.push({name: 'boat-editor'}).catch(err => {
        console.log('err %o', err)
      })
    },

    editBoat (id) {
      this.$router.push({name: 'boat-editor', params: {id: id}}).catch(err => {
        console.log('err %o', err)
      })
    }
  },

  apollo: {
    paginatedBoats: {
      query: PaginatedBoats,
      variables () {
        const { sortBy, sortDesc, page, itemsPerPage } = this.options
        // console.log('variables %o', { sortBy, sortDesc, page, itemsPerPage })
        return {
          args: {sortBy, sortDesc, page, resultsPerPage: itemsPerPage}
        }
      },
      update (data) {
        // console.log('data.paginatedBoats %o', data.paginatedBoats)
        return data.paginatedBoats
      },

      fetchPolicy: 'network-only'
    }
  }


}
</script>

<style scoped>

</style>
