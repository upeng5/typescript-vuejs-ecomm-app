import axios from "axios";

const PRODUCTS_URL = "http://localhost:3000/api/v1/products";

const productService = {
    getAllProducts: async () => {
        try {
            const response = await axios.get(PRODUCTS_URL);
            return response.data.products;
        } catch (err) {
            console.log(err);
        }
    },
    addProduct: (title, brand, description, price, rating, image) => {
        {
            const formData = new FormData();

            formData.append('title', title);
            formData.append('brand', brand);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('rating', rating);
            formData.append('image', image);

            axios.post(PRODUCTS_URL, formData).then(response => {
                console.log(response.status);
            }).catch(err => {
                console.log(err);
            });
        }
    },
};

export default productService;