interface IProduct {
  id: string;
  title: string;
  brand: string;
  description: string;
  price: number;
  rating: number;
  numRatings: number;
  image: string;
}

const calculateTotal = (products: IProduct[]): number => {
  let total = 0;
  products.forEach((product: IProduct) => {
    total += product.price;
  });
  return total;
};

export default calculateTotal;
