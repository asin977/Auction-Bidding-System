export interface ProductList {
  id: string;
  name: string;
  imageUrl: string;
  imageDetails: string;
  price: number;
  startingPrice: number;
  time: string;
}

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  variant : 'primary' | 'secondary';

  children: React.ReactNode;
}
