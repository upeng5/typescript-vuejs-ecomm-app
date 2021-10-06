<template>
  <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 deep-purple darken-1 white--text">
          Unauthenticated
        </v-card-title>

        <v-card-text class="mt-3">
          You have to login or register to use this feature.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="deep-purple darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {
    name: "Dialog",
    props: {
        dialog: Boolean
    },
}
</script>

<style>

</style>