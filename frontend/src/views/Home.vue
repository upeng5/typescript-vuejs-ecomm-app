<template>
  <v-container>
    <v-row v-if="!isFetching" class="text-center">
      <!-- <v-img height="250" src="https://ts-ecom-app-bucket.s3.us-west-2.amazonaws.com/1633200204360navy_shirt.jpg"></v-img> -->
      <v-col v-for="(product, i) in products" :key="i" cols="12" sm="6" md="4" lg="3">
          <Product 
          :id="product.id" 
          :title="product.title" 
          :brand="product.brand" 
          :description="product.description"
          :price="product.price"
          :rating="product.rating"
          :image="product.image" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import productService from '../api/productService';
import Product from "../components/Product.vue";

export default {
  name: 'Home',
  components: {
    Product
  },
  data() {
    return {
      products: [
        // {
        //   id: "1",
        //   title: "Dummy One",
        //   brand: "Dummy Inc 1",
        //   description: "A dummy placeholder card",
        //   price: 17,
        //   rating: 4,
        //   image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.r-Yl2jTkGGDWnZxxqdNFRQHaLH%26pid%3DApi&f=1"
        // },
        // {
        //   id: "2",
        //   title: "Dummy Two",
        //   brand: "Dummy Inc 2",
        //   description: "A dummy placeholder card",
        //   price: 14,
        //   rating: 5,
        //   image: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.r-Yl2jTkGGDWnZxxqdNFRQHaLH%26pid%3DApi&f=1"
        // }
      ],
      search: "",
      isFetching: true
    }
  },
  created() {
    this.getProducts().then(results => {
      this.products = results;
      this.isFetching = false;
    });
  },
  methods: {
    getProducts() {
      return productService.getAllProducts();
    },
  },
}
</script>
