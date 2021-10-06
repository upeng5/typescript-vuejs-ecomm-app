<template>
    <v-container>
        <v-alert dense dismissible @click="error = !error" type="error" :value="error" dark border="left" transition="scale-transition">{{ errorMessage }}</v-alert>
        <v-row class="text-center mt-5" justify="center">
            <v-col cols="8">
                <v-form ref="form" class="deep-purple darken-1 my-form" lazy-validation>
                    <v-text-field type="email" dark v-model="email" label="Email" required color="white"></v-text-field>
                    <v-text-field type="password" dark v-model="password" label="Password" required color="white" ></v-text-field>
                    <v-btn block large color="my-secondary-button mr-3 mb-3" :loading="loading" @click="login">Login</v-btn>
                </v-form>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import store from "../store/index";

export default {
    name: "Login",
    store: store,
    data() {
        return {
            email: "",
            password: "",
            loading: false,
            error: false,
            errorMessage: ""
        }
    },
    methods: {
        login() {
            this.loading = true
            const url = "http://localhost:3000/api/v1/users/signin";
            const body = {
                email: this.email,
                password: this.password
            };
            
            axios.post(url, body).then(response => {
                if(response.data.status === "fail") {
                    this.error = true;
                    this.errorMessage = response.data.message;
                    return;
                }

                const user = response.data;
                const username = user.username;
                const email = user.email;
                const isAdmin = user.isAdmin;
                const payload = {
                    username,
                    email,
                    isAdmin
                };
                this.$store.commit("login", payload);
                this.loading = false;
                this.$router.push("/");
            }).catch(err => {
                console.log(err);
                this.loading = false;
                this.error = true;
                this.errorMessage = "Server error occurred!";
            });
        },
    },
}
</script>

<style>

</style>