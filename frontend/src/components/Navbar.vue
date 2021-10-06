<template>
  <div class="my-navbar">
      <v-app-bar color="deep-purple darken-1" dark>
        <v-toolbar-title class="navbar-title">TSECOM</v-toolbar-title>

        <v-spacer></v-spacer>

        <router-link class="navbar-link" to="/">Home</router-link>
        <router-link v-if="!isAuth" class="navbar-link" to="/login">Login</router-link>
        <router-link v-if="!isAuth" class="navbar-link" to="/register">Register</router-link>
        <router-link v-if="isAuth" class="navbar-link" to="/cart">Cart</router-link>
        <router-link v-if="isAdmin" class="navbar-link" to="/add">Create Product</router-link>
        <v-btn v-if="isAuth" color="mr-3 mb-3 my-secondary-button-navbar" :loading="loading" @click="logout"><v-icon>mdi-logout</v-icon> Logout</v-btn>
      </v-app-bar>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store/index";

export default {
    name: "Navbar",
    store: store,
    data() {
        return {
            loading: false
        }
    },
    methods: {
        logout() {
            this.loading = true;
            const url = "http://localhost:3000/api/v1/users/logout";
            axios.get(url).then(response => {
            this.$store.commit("logout");
            console.log(response.data);
            this.loading = false;
            }).catch(err => console.log(err));
        }
    },
    computed: {
        isAuth: () => {
            return store.state.user.isAuth;
        },
        isAdmin: () => {
            return store.state.user.isAdmin;
        }
    }
}
</script>

<style scoped>
.navbar-title {
    background: #fff;
    color: #5E35B1;
    padding: 5px 15px;
    border-top-left-radius: 15px;
    border-bottom-right-radius: 15px;
}

.navbar-link {
    color: #fff;
    text-decoration: none;
    padding: 5px 20px;
    text-transform: uppercase;
    transition: 300ms all;
    animation-duration: 300ms;
}

.navbar-link:hover {
    background: #fff;
    color: #5E35B1;
}

</style>