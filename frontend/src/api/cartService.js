import axios from "axios";

const CART_URL = "http://localhost:3000/api/v1/users/cart";

const cartService = {
    async getCartItems(email) {
        try {
            const response = await axios.post(CART_URL, { email: email} );
            console.log(response.data.cart);
            return response.data.cart;
        } catch (err) {
            console.log(err);
        }
    },
    addToCart(email, productId) {
        const url = CART_URL+"/"+productId;
        axios.post(url, {email: email}).then(response => {
            const data = response.data;
            if(data.status === 'fail') {
                return;
            }
            return data;
        }).catch(err => {
            console.log(err)
        });
    },
    removeFromCart(email, productId) {
            const url = `${CART_URL}/user/product/${productId}`;
            alert(url);
            console.log("URL:", url);
            axios.post(url, { email: email })
                .then(response => {
              const data = response.data;
              if(data.status === 'fail') {
                return;
              }
              console.log(data);
            }).catch(err => {
              console.log(err)
            });
    },
};

export default cartService;