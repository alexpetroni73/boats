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
        {title: "Food & Drinks", slug: 'food-and-drinks', features: this.boat.foodAndDrinksFeatures, featuresText: this.boat.foodAndDrinksFeaturesText},
        {title: "Diving", slug: 'diving', features: this.boat.divingFeatures, featuresText: this.boat.divingFeaturesText},
        {title: "Navigation & Safety", slug: 'navigation-safety', features: this.boat.navSafteyFeatures, featuresText: this.boat.navSafteyFeaturesText},
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

      if(slug == 'food-and-drinks') {
        return parseFeaturesToObj(drinksArr)
      }

      if(slug == 'diving') {
        return parseFeaturesToObj(divingArr)
      }

      if(slug == 'navigation-safety') {
        return parseFeaturesToObj(navSafteyArr)
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

  if(slug == 'food-and-drinks'){
    return {foodAndDrinksFeatures: e.items, foodAndDrinksFeaturesText: e.text}
  }

  if(slug == 'diving'){
    return {divingFeatures: e.items, divingFeaturesText: e.text}
  }

  if(slug == 'navigation-safety'){
    return {navSafteyFeatures: e.items, navSafteyFeaturesText: e.text}
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

  const drinksArr = [
    "Western Food",
    "Local Food",
    "Vegetarian Options",
    "Buffet style",
    "Beer available",
    "Snacks All Day",
    "Vegan Options",
    "Fine Wines Selection",
    "Free Soft Drinks",
    "Wine Available",
    "Al Fresco Dining",
  ]

  const divingArr = [
    "DIN Adaptors",
    "Nitrox available",
    "Rinse Hoses",
    "Dive deck",
    "Tenders for diving",
    "Shaded Diving Area",
  ]

  const navSafteyArr = [
    "Radar",
    "GPS",
    "Radio VHF/DSC/SSB",
    "Life Vests",
    "Fire Alarm & Fire Extinguishers",
  ]
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
