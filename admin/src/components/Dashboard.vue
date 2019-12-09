<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
     Dashboard
    </v-layout>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'Dashboard',

  data: () => ({
    test: '',

  }),

  apollo: {
    test: {
      query: gql`query vessel($id: ID!){ vessel(id: $id){
        id
        name
        slug
      }}`,

      variables: {
        id: "5debc1e5940191425878a49a"
      },

      update (data) {
        console.log('data %o', data)
        return data.vessel.name
      },

    },

  },


};
</script>
