'use client'

import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

// type ProductsProps = {
//   product: object;
// }
type ProductsProps = {
  quantity?: number | undefined;
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  total: number | 0;
}

// type QuantityProps = {
//   valueQuantity: number;
// }

type ProductContextData = {
  setSelectsProducts: Dispatch<SetStateAction<ProductsProps[]>>;
  selectsProducts: ProductsProps[];
  quantityContext: number[];
  setQuantityContext: Dispatch<SetStateAction<number[]>>
};

type PropsChildren = {
  children: ReactNode;
};

export const Context = createContext({} as ProductContextData);

export function ProductContext({ children }: PropsChildren) {
 const [selectsProducts, setSelectsProducts] = useState<ProductsProps[]>([]);
 const [quantityContext, setQuantityContext] = useState<number[]>([]);

 console.log('----> quantityContext', quantityContext)

 useEffect(() => {
  const productInfoJSON = localStorage.getItem('listCar');
  if (productInfoJSON) {
    setSelectsProducts(JSON.parse(productInfoJSON))
  }
 },[])

  return (
    <Context.Provider value={
        { 
        selectsProducts,
        setSelectsProducts,
        quantityContext,
        setQuantityContext 
        }
      }>
      {children}
    </Context.Provider>
  );
}