'use client'

import { Context } from "@/context/context";
import { MouseEvent, useContext, useEffect, useState } from "react";

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

interface Props {
  product: Product;
}

export function Quantity({product}: Props) {
  const {selectsProducts, setSelectsProducts} = useContext(Context)

  const decreaseQuantity = (event: MouseEvent<HTMLButtonElement>) => {
    
    if (product.quantity && product.quantity > 1) {
      const productsMaps = selectsProducts.map(item => {
        if (item.id === product.id) {
          const quantity = (item.quantity) && item?.quantity - 1;
          const price = Number(item.price) * (quantity || 1);
          return { ...item, quantity, price: String(price)  };
        }
        return item;
      })
      setSelectsProducts(productsMaps);
  
      localStorage.setItem('listCar', JSON.stringify(productsMaps))
    }
    
  };

  const increaseQuantity = () => {
    if (product.quantity == 0) return
    const productsMaps = selectsProducts.map(item => {
      if (item.id === product.id) {
        const quantity = (item.quantity) && item?.quantity + 1;
        const price = Number(item.price) * (quantity || 1);
        return { ...item, quantity, price: String(price)  };
      }
      return item;
    })
    setSelectsProducts(productsMaps);

    localStorage.setItem('listCar', JSON.stringify(productsMaps))
  };

  return (
    <>
      <button onClick={decreaseQuantity}>-</button>
      <span>{product.quantity}</span>
      <button onClick={() => increaseQuantity()}>+</button>
      
    </>
  );
}