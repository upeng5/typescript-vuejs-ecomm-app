<template>
    <v-container>
        <v-row class="text-center mt-5" justify="center">
            <v-col cols="8">
                <v-form ref="form" class="deep-purple darken-1 my-form" lazy-validation>
                    <v-text-field dark v-model="username" label="Username" required color="white"></v-text-field>
                    <v-text-field type="email" dark v-model="email" label="Email" required color="white"></v-text-field>
                    <v-text-field type="password" dark v-model="password" label="Password" required color="white" ></v-text-field>
                    <v-btn block large color="my-secondary-button mr-3 mb-3" :loading="loading" @click="register">Register</v-btn>
                </v-form>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import store from "../store/index";

export default {
    name: "Register",
    store: store,
    data() {
        return {
            username: "",
            email: "",
            password: "",
            loading: false
        }
    },
    methods: {
        register() {
            this.loading = true;
            const url = "http://localhost:3000/api/v1/users";
            const body = {
                username: this.username,
                email: this.email,
                password: this.password,
            };

            axios
                .post(url, body)
                .then((response) => {
                if (response.data.status === "fail") {
                    // alert("An error occurred!");
                    return;
                }
                const user = response.data;
                const username = user.username;
                const email = user.email;
                const payload = {
                    username,
                    email,
                };
                this.$store.commit("register", payload);
                this.loading = false;
                this.$router.push("/");
                })
                .catch((err) => {
                console.log(err);
                this.loading = false;
                });
        }
    },
}
</script>

<style>

</style>