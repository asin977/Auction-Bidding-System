export type ProductList = {
  id: string;
  name: string;
  imageUrl: string;
  imageDetails: string;
  price: number;
  startingPrice: number;
  time: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
  balance: number;
}
