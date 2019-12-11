<template>
    <v-tabs
     v-model="tab"
     class="elevation-2"
     vertical
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
        <BoatFeaturesEditor
        :items="featuresFor(t.slug)"
        :selectedItems="t.features"
        :text="t.featuresText"
        @update="updateFeatures(t.slug, $event)"
        >
        </BoatFeaturesEditor>
     </v-card>
      </v-tab-item>
  </v-tabs>
</template>

<script>
import UpdateBoat from '@/graphql/boat/UpdateBoat.gql'
import BoatFeaturesEditor from './BoatFeaturesEditor.vue'


export default {
  name: 'BoatFeaturesContainerEditor',

  components: {
    BoatFeaturesEditor
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

  props: ['boat'],

  data () {
    return {
      tab: 'tab-boat-features',

      tabs: [
        {title: "Boat Features", slug: 'boat-features', features: this.boat.boatFeatures, featuresText: this.boat.boatFeaturesText},
        {title: "Food and Drink", slug: 'food-and-drink', features: this.boat.foodAndDrinksFeatures, featuresText: this.boat.foodAndDrinksFeaturesText},

      ]
    }
  },

  computed: {

  },

  watch: {

  },

  methods: {
    featuresFor (slug) {
      if(slug == 'boat-features') {
        return parseFeaturesToObj(boatFeatArr)
      }

      if(slug == 'food-and-drink') {
        return [
          {name: 'Western Food', slug: 'WesternFood'},
          {name: 'Buffet style', slug: 'Buffetstyle'},
          {name: 'Local Food', slug: 'LocalFood'},
          {name: 'Vegetarian Options', slug: 'VegetarianOptions'},
        ]
      }
    },

    async updateFeatures (slug, e) {
      const vars = {id: this.boat.id, input: parseInputForSlug(slug, e)}
      let result = await this.$apollo.mutate({
        mutation: UpdateBoat,
        variables: vars,
      })

      console.log('result %o', result)
      // console.log('slug %s, e %o', slug, e)
    }

  },

}


// == private ==

function parseInputForSlug(slug, e) {

  if(slug == 'boat-features'){
    return {boatFeatures: e.items, boatFeaturesText: e.text}
  }

  if(slug == 'food-and-drink'){
    return {foodAndDrinksFeatures: e.items, foodAndDrinksFeaturesText: e.text}
  }
}

function parseFeaturesToObj (arr) {
  return arr.map(e => ({
    name: e, slug: e
  }))
}

const boatFeatArr = [
  "Laundry Service",
  "Camera Station",
  "Daily housekeeping",
  "Audio & video entertainment",
  "Library",
  "Air Conditioned saloon",
  "Aircon Cabins",
  "Sun Deck",
  "Indoor Saloon",
  "Non-Diver (Snorkeler) Friendly",
  "Warm Water Showers",
  "Custom built for diving",
  "Charging stations",
  "En-Suite bathrooms",
  "Free Internet",
  "Non-Smoking Rooms",
  "Outside Showers",
  "Seaview Cabins",
  "Kayaks On-Board",
  "Separate Rinse for u/w Camera",
  "Dedicated Local & International Crew",
  "Nearly 1:1 Crew-to-Guest Ratio",
  "Leisure Deck",
  "Observation Deck",
  "BBQ Area",]
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
