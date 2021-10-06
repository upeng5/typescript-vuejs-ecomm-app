import axios from "axios";

const LOGIN_URL = "http://localhost:3000/api/v1/users/signin";
const REGISTER_URL = "http://localhost:3000/api/v1/users";
const PRODUCTS_URL = "http://localhost:3000/api/v1/products";
const CART_URL = "";


const api = {
    getProducts: async () => {
        try {
        const url = "http://localhost:3000/api/v1/products";
        const response = await axios.get(url);
        console.log(response.data.products);
        return response.data.products;
      } catch (err) {
        console.log(err);
      }
    },
    addP
};

export default api;