'use client'
import { ProductsProps } from "@/interface/productsProps";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

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