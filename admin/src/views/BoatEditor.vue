<template>
  <v-container fluid>
     <v-row>
       <v-col cols="12" sm="12">
         <div v-if="isLoadingState">
           Loading ....
        </div>
        <div v-if="isErrorState">
          {{ this.editStateError }}
       </div>
         <v-card v-if="isEditReadyState">
           <v-toolbar>
             <v-app-bar-nav-icon></v-app-bar-nav-icon>
             <v-toolbar-title>{{ editorTitle }}</v-toolbar-title>
            <v-spacer></v-spacer>

             <!-- <v-btn
             @click="addBoat()"
             class="mx-2"
             small
             fab
             dark
             color="primary"
             >
              <v-icon dark>mdi-plus</v-icon>
            </v-btn> -->
           </v-toolbar>


           <v-card-text>
             <v-tabs
              v-model="tab"
              class="elevation-2"

              >
               <v-tab
                 v-for="t in tabs"
                 :key="t.slug"
                 :href="`#tab-${t.slug}`"
               >
                 {{ t.title }}
               </v-tab>

               <v-tab-item
                 v-for="t in tabs"
                 :key="t.slug"
                 :value="'tab-' + t.slug"
               >
               <v-card>
               <component
               :is="t.component"
               :boat="editedItem"
               :editState="editState"
               >
              </component>
              </v-card>
               </v-tab-item>
           </v-tabs>
         </v-card-text>
         </v-card>
       </v-col>
     </v-row>
   </v-container>
</template>

<script>
import Boat from '@/graphql/boat/Boat.gql'
import EditStateMixin from '@/mixins/EditStateMixin'
import BoatBasicEditor from '@/components/editors/BoatBasicEditor.vue'
import BoatFeaturesEditor from '@/components/editors/BoatFeaturesEditor.vue'


export default {
  name: '',

  components: {
    BoatBasicEditor,
    BoatFeaturesEditor,
  },

  directives: {

  },

  filters: {

  },

  extends: {

  },

  mixins: [ EditStateMixin ],

  model: {

  },

  props: {
  },

  data () {
    return {
      id: '',
      editedItem: this.getDefaultItem(),

      tab: 'tab-basic',

      tabs: [
        {title: "Basic data", slug: 'basic', component: BoatBasicEditor},
        {title: "Features", slug: 'features', component: BoatFeaturesEditor},

      ]
    }
  },

  computed: {
    editorTitle () {
      return this.isEditState ? `Edit ${this.editedItem.name}` : (this.isLoadingState ? 'Loading..' : 'Add New')
    }
  },

  watch: {
    '$route.params.id': {
      handler: function (val) {
        val ? this.setLoadingState() : this.setAddNewState()
        this.id = this.$route.params.id
      },
      immediate: true
    }
  },

  methods: {
    getDefaultItem () {
      return {
        name: '',
        slug: '',
        excerpt: '',
        description: '',
        image: '',
        boatFeatures: [],
        boatFeaturesText: '',
        foodAndDrinksFeatures: [],
        foodAndDrinksFeaturesText: '',
        divingFeatures: [],
        divingFeaturesText: '',
        gearRental: '',
        gearRentalText: '',
        boatLayout: '',
        boatLayoutText: '',
        boatSpecifications: {
          length: null,
          beam: null,
          topSpeed: null,
          cruisingSpeed: null,
          engines: '',
          maxGuests: null,
          cabins: null,
          bathrooms: null,
          tenders: '',
          waterCapacity: null,
          fuelCapacity: null,
          freshwaterMaker: false
        },
        boatSpecificationsText: '',
        navSafteyFeatures: [],
        navSafteyFeaturesText: '',
        cabins: [],
        cabinsText: '',
      }
    }
  },

  apollo: {
    editedItem: {
      query: Boat,
      variables () {
        return {id: this.id}
      },
      update (data) {
        data.boat ? this.setEditState() : this.setErrorState('No boat found with specified id')
        return data.boat
      },
      skip () {
        return !this.id
      },

    },

  }


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
