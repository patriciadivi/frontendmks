 interface Product {
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  quantity?: number | undefined;
  total: number | 0;
}

export interface Props {
  product: Product;
}
