<template>
  <v-container fluid>
      <v-row class="my-3 my-row">
        <!-- Image column -->
        <v-col cols="7" class="deep-purple darken-1">
            <v-img class="ml-5" :src="image" max-width="815" max-height="800">
                <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center" >
                        <v-progress-circular indeterminate color="white"></v-progress-circular>
                    </v-row>
                </template>
            </v-img>
        </v-col>
          <!-- Information column -->
          <v-col cols="5" class="text-center info-col pa-5">
              <h4 class="display-1">{{ title }}</h4>
                    <p class="">{{ brand }}</p>
                    <p class="text-wrap">{{ description }}</p>
                    <h4 class="display-1">{{ price }}$</h4>
                    <v-rating x-large readonly :value="rating" background-color="deep-purple darken-1" color="deep-purple darken-1"></v-rating>
              <v-btn block class="mt-2 mr-3 mb-3 white--text" color="deep-purple darken-1" :loading="loading" @click="addToCart"><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn>
          </v-col>
      </v-row>
      <Dialog :dialog="error" />
  </v-container>
</template>

<script>
import Dialog from "../components/Dialog.vue";
import store from "../store/index";
import cartService from "../api/cartService";

export default {
    name: "ProductView",
    store: store,
    components: {
        Dialog
    },
    props: {
        id: String,
        title: String,
        brand: String,
        description: String,
        price: Number,
        rating: Number,
        image: String
    },
    data() {
        return {
            loading: false,
            error: false
        }
    },
    methods: {
        addToCart() {
            this.loading = true;
            const email = store.state.user.email;
            if(!store.state.user.isAuth) {
                this.error = true;
                this.loading = false;
                return;
            }
            cartService.addToCart(email, this.id);
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.info-col {
    color: #5E35B1;
}
</style>