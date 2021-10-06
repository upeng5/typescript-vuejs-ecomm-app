<template>
  <v-container>
      <v-row dense class="my-3">
            <v-col cols="7" class="grey lighten-1">
                <CartItem v-for="(item, i) in items" :key="i" :id="item.id" :title="item.title" :brand="item.brand" :description="item.description" :price="item.price" :image="item.image" />
            </v-col>
            <v-col cols="5" class="deep-purple darken-1">
                <div class="pa-5">
                    <h4 class="white--text display-1">Subtotal: {{ total }}$</h4>
                    <v-btn block large color="my-secondary-button mt-3" @click="checkout">Checkout</v-btn>
                </div>
            </v-col>
      </v-row>
  </v-container>
</template>

<script>
import store from "../store/index";
import cartService from "../api/cartService";
import CartItem from "../components/CartItem.vue"

export default {
    name: "Cart",
    components: {
        CartItem,
    },
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.getAllCartItems().then(results => {
            this.items = results;
        });
    },
    computed: {
        total() {
            let total = 0;
            this.items.forEach(item => {
                total += item.price;
            });
            return total.toFixed(2);
        }
    },
    methods: {
        getAllCartItems() {
            const email = store.state.user.email;
            if(!store.state.user.isAuth || !email) {
                return;
            }
            return cartService.getCartItems(email);
        },
        checkout() {

        }
    }
}
</script>

<style scoped>
</style>