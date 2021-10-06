<template>
  <v-container>
        <v-row class="text-center mt-5" justify="center">
            <v-col cols="8">
                <v-form ref="form" class="deep-purple darken-1 my-form">
                    <v-text-field dark v-model="title" label="Title" required color="white"></v-text-field>
                    <v-text-field dark v-model="brand" label="Brand" required color="white"></v-text-field>
                    <v-text-field dark v-model="description" label="Description" required color="white" ></v-text-field>
                    <v-text-field type="number" dark v-model="price" label="Price" required color="white" ></v-text-field>
                    <v-rating v-model="rating" background-color="white" color="white" medium></v-rating>
                    <v-file-input dark v-model="image" accept="image/*" label="Image" color="white"></v-file-input>
                    <v-btn block large color="my-secondary-button mr-3 mb-3" :loading="loading" @click="createProduct">Add Product</v-btn>
                </v-form>
            </v-col>
        </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
    name: "AddProduct",
    data() {
        return {
            loading: false,
            title: "",
            brand: "",
            description: "",
            price: 0,
            rating: 1,
            image: null
        }
    },
    methods: {
        createProduct() {
            this.loading = true;
            const url = "http://localhost:3000/api/v1/products";
            const image = this.image;
            const formData = new FormData();

            formData.append('title', this.title);
            formData.append('brand', this.brand);
            formData.append('description', this.description);
            formData.append('price', this.price);
            formData.append('rating', this.rating);
            formData.append('image', image);

            axios.post(url, formData).then(response => {
                console.log(response.status);
                this.$router.push("/");
                this.loading = false;
            }).catch(err => {
                console.log(err);
                this.loading = false;
            });
        }
    }
}
</script>

<style>

</style>