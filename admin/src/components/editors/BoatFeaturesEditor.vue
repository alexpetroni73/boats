<template>
  <v-container>
     <v-row>
    <template v-for="item in items">
      <v-col
      :key="item.slug"
      sm="12"
      md="4"
      class="text-center"
      >
      <v-checkbox
        v-model="editedItems"
        :label="item.name"
        :value="item.slug"
        required
      ></v-checkbox>
    </v-col>
    </template>
  </v-row>

  <v-row>
    <v-col
    sm="12"
    >
    <v-textarea
      v-model="editedText"
      label="Text"
    ></v-textarea>
   </v-col>
 </v-row>

  <v-row>
    <v-col
    sm="12"
    class="text-center"
    >
    <v-btn
       color="primary"
      @click="update()"
    >
      Update
    </v-btn>
   </v-col>
 </v-row>
 </v-container>
</template>

<script>

export default {
  name: 'BoatFeaturesEditor',

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
    'items': {
      type: Array,
      default: () => []
    },

    'selectedItems': {
      type: Array,
      default: () => []
    },

    'text': {
      type: String
    }
  },

  data () {
    return {
      editedItems: [],
      editedText: '',
    }
  },

  computed: {

  },

  watch: {
    selectedItems: {
      handler (val) {
        this.editedItems = [...val]
      },
      immediate: true
    },

    text: {
      handler (val) {
        this.editedText = val
      },
      immediate: true
    },

    items: {
      handler (val) {
      console.log('items %o', val)
      },
      immediate: true
    },
  },

  methods: {
    update () {
      this.$emit('update', {items: this.editedItems, text: this.editedText})
    }
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
