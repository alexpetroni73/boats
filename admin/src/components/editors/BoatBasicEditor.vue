<template>
   <v-form
     ref="form"
     v-model="valid"
     :lazy-validation="lazy"
   >
   <v-container fluid>
     <v-row>
       <v-col
       sm="12"
       md="3"
       >
         <v-text-field
           v-model="editedItem.name"
           :rules__="nameRules"
           label="Name"
           required
         ></v-text-field>
       </v-col>

       <v-col
       sm="12"
       >
         <v-textarea
           v-model="editedItem.excerpt"
           label="Excerpt"
           hint="The short description visible on boat list page"
         ></v-textarea>
      </v-col>

      <v-col
      sm="12"
      >
        <v-textarea
          v-model="editedItem.description"
          label="Description"
          hint="The description that will appear on boat presentation page"
        ></v-textarea>
     </v-col>
   </v-row>

   <v-row>
     <v-col
     sm="12"
     class="title"
     >
     Boat Specifications
   </v-col>

   <v-col
   sm="12"
   md="3"
   >
   <v-text-field
     v-model.number="editedItem.boatSpecifications.length"
     label="Length"
     required
   ></v-text-field>
  </v-col>

  <v-col
  sm="12"
  md="3"
  >
  <v-text-field
    v-model.number="editedItem.boatSpecifications.beam"
    label="Beam"
    required
  ></v-text-field>
 </v-col>

 <v-col
 sm="12"
 md="3"
 >
 <v-text-field
   v-model.number="editedItem.boatSpecifications.topSpeed"
   label="Top Speed"
   required
 ></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-text-field
  v-model.number="editedItem.boatSpecifications.cruisingSpeed"
  label="Cruising Speed"
  required
></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-text-field
  v-model="editedItem.boatSpecifications.engines"
  label="Engines"
  required
></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-text-field
  v-model.number="editedItem.boatSpecifications.maxGuests"
  label="Max Guests"
  required
></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-text-field
  v-model.number="editedItem.boatSpecifications.cabins"
  label="Cabins"
  required
></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-text-field
  v-model.number="editedItem.boatSpecifications.bathrooms"
  label="Bathrooms"
  required
></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-text-field
  v-model="editedItem.boatSpecifications.tenders"
  label="Tenders"
  required
></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-text-field
  v-model.number="editedItem.boatSpecifications.waterCapacity"
  label="Water Capacity"
  required
></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-text-field
  v-model.number="editedItem.boatSpecifications.fuelCapacity"
  label="Fuel Capacity"
  required
></v-text-field>
</v-col>

<v-col
sm="12"
md="3"
>
<v-checkbox
  v-model="editedItem.boatSpecifications.freshwaterMaker"
  label="Freshwater Maker"
  required
></v-checkbox>
</v-col>


   <!-- <v-col
   sm="12"
   md="3"
   >
     <v-text-field
       v-model="email"
       :rules__="emailRules"
       label="E-mail"
       required
     ></v-text-field>
    </v-col>

     <v-col
     sm="12"
     md="3"
     >
     <v-select
       v-model="select"
       :items="items"
       :rules__="[v => !!v || 'Item is required']"
       label="Item"
       required
     ></v-select>
    </v-col>

     <v-col
     sm="12"
     >
     <v-checkbox
       v-model="checkbox"
       :rules__="[v => !!v || 'You must agree to continue!']"
       label="Do you agree?"
       required
     ></v-checkbox>
   </v-col>
     <v-btn
       :disabled="!valid"
       color="success"
       class="mr-4"
       @click="validate"
     >
       Validate
     </v-btn>

     <v-btn
       color="error"
       class="mr-4"
       @click="reset"
     >
       Reset Form
     </v-btn>

     <v-btn
       color="warning"
       @click="resetValidation"
     >
       Reset Validation
     </v-btn> -->

     <v-col
     sm="12"
     class="text-center"
     >
     <v-btn
       v-if="isAddNewState"
       color="primary"
       @click="addItem()"
     >
       Add
     </v-btn>

     <v-btn
       v-else
        color="primary"
       @click="updateItem()"
     >
       Update
     </v-btn>
    </v-col>
   </v-row>
  </v-container>
   </v-form>

</template>

<script>
import CreateBoat from '@/graphql/boat/CreateBoat.gql'
import UpdateBoat from '@/graphql/boat/UpdateBoat.gql'
import utils from '@/utils'

export default {
  name: 'BoatBasicEditor',

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

  props: ['boat', 'editState'],

  data: () => ({
        editedItem: {},
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4',
        ],
        checkbox: false,
        lazy: false,
      }),

  computed: {
    isAddNewState () {
      return utils.isAddNewState(this.editState)
    }
  },

  watch: {
    boat: {
      handler: function (val) {
        this.editedItem = this.prepareEditedItem(val)
        console.log('watcher this.editedItem %o', this.editedItem)
      },

      immediate: true
    }
  },

  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },

    reset () {
      this.$refs.form.reset()
    },

    resetValidation () {
      this.$refs.form.resetValidation()
    },

    async addItem () {
    console.log('addItem this.editedItem %o', this.editedItem)
    let result = await this.$apollo.mutate({
        mutation: CreateBoat,
        variables: { input: this.editedItem }
      })

      console.log('addItem result %o', result)
      const boat = result.data.createBoat
      this.$emit('itemAdded', boat)
      this.$router.push({name: 'boat-editor', params: {id: boat.id}}).catch(err => {
        console.log('err %o', err)
      })
    },

    async updateItem () {
      console.log('updateItem this.editedItem %o', this.editedItem)
      let result = await this.$apollo.mutate({
          mutation: UpdateBoat,
          variables: { id: this.boat.id, input: this.editedItem }
        })

        const boat = result.data.updateBoat
        this.$emit('itemUpdated', boat)
    },

    prepareEditedItem (val) {
      let boat = utils.filterObject(val, this.boatBasicFilter)
      boat.boatSpecifications = utils.filterObject(val.boatSpecifications, this.boatSpecificationsFilter)
      return boat
    },

    boatBasicFilter (value, key) {
      return ['name', 'excerpt', 'description', 'slug'].indexOf(key) != -1
    },

    boatSpecificationsFilter (value, key) {
      return key !== '__typename'
    },
  },


}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
