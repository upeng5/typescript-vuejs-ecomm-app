<template>
  <v-card
    class="mx-auto my-7"
    max-width="374"
  >
    <v-img
      height="250"
      :src="image"
    ></v-img>

    <v-card-title>{{ title }}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="rating"
          color="deep-purple darken-1"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          ({{ rating }})
        </div>
      </v-row>

       <h4 class="my-4 display-1 price-text">{{ price }}$</h4> 

      <div>{{ description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-btn class="mt-2 mr-3 mb-3 white--text" color="deep-purple darken-1" :loading="loading" @click="addToCart"><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn>

    <router-link :to="{ name: `Product`, params: { id: id, title: title, brand: brand, description: description, price: price, rating: rating, image: image } }" exact>
      <v-btn class="mt-2 mr-3 mb-3 white--text" color="deep-purple darken-1">View</v-btn>
    </router-link>
    <Dialog :dialog="error" />
  </v-card>
</template>

<script>
import Dialog from "../components/Dialog.vue";
import store from "../store/index";
import cartService from "../api/cartService";

export default {
    name: "Product",
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
            error: false,
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
        },
        testProductService() {
        }
    },
    computed: {
      // id: () => {return product.id;},
      // title: () => {return product.title;},
      // brand: () => {return product.brand;},
      // description: () => {return product.description;},
      // price: () => {return product.price;},
      // rating: () => {return product.rating;},
      // image: () => {return product.image;}
    }
}
</script>

<style scoped>
.price-text {
  color: #5E35B1;
}
</style>