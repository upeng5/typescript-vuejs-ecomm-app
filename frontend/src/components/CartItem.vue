<template>
  <v-card color="deep-purple darken-1 ma-5 my-cart-item" dark>
    <div class="d-flex flex-no-wrap justify-space-between">
        <v-col cols="8">
            <v-card-title class="text-h5 ml-1" v-text="title"></v-card-title>
            <v-card-subtitle class="ml-1" v-text="brand"></v-card-subtitle>
            <p class="ml-5 text-wrap">{{ description }}</p>
            <h4 class="ml-4 display-1">{{ price }}$</h4>
        </v-col>
        <v-col class="text-center" cols="4">
            <v-img height="200" :src="image"></v-img>
            <v-btn block class="mt-3 red darken-1" :loading="loading" @click="removeFromCart"><v-icon>mdi-trash-can-outline</v-icon> Remove</v-btn>
        </v-col>
    </div>
    </v-card>
</template>

<script>
import axios from "axios";
import store from "../store/index";
import cartService from '../api/cartService';

export default {
    name: "CartItem",
    store: store,
    props: {
        id: String,
        title: String,
        brand: String,
        description: String,
        price: Number,
        rating: Number,
        numRatings: Number,
        image: String
    },
    data() {
        return {
            loading: false
        }
    },
    methods: {
        removeFromCart() {
            this.loading = true;
            const email = store.state.user.email;
            if(!store.state.user.isAuth) {
                this.loading = false;
                return;
            }
            cartService.removeFromCart(email, this.id);
            this.loading = false;
        }
    }
}
</script>

<style scoped>
.my-cart-item {
    transition: 300ms all;
}

.my-cart-item:hover {
    color: #5E35B1 !important;
    background: #fff !important;
}
</style>