'use client'
import React, { useState, useContext } from 'react';
import { ShoppingBag } from "lucide-react";
import { Context } from '@/context/context';
import { Props } from '@/interface/product';
import { ProductsProps } from '@/interface/productsProps';

export function Button({ product }: Props) {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const { setSelectsProducts } = useContext(Context);

  const saveProductsToLocalStorage = (productList: ProductsProps[]) => {
    setSelectsProducts(productList);
    localStorage.setItem('listCar', JSON.stringify(productList));
  };

  const handleClick = () => {
    const productInfoJSON = localStorage.getItem('listCar');

    if (productInfoJSON) {
      const productInfo: ProductsProps[] = JSON.parse(productInfoJSON);

      const productExists = productInfo.some(item => item.id === product.id);

      if (productExists) {
        setShowAlert(true);
        handleAlert();
      } else {
        const mergedItems = [...productInfo, { ...product, quantity: 1, total: 0 }];
        saveProductsToLocalStorage(mergedItems);
      }
    } else {
      saveProductsToLocalStorage([{ ...product, quantity: 1, total: 0 }]);
    }
  };

  const handleAlert = () => {
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  return (
    <>
      <button
        className="w-full h-8 flex items-center justify-center gap-3 bg-[#0F52BA] text-white text-sm leading-4 rounded-b-lg"
        onClick={handleClick}
      >
        <span>
          <ShoppingBag className="h-4 w-4" />
        </span>
        COMPRA
      </button>

      <div>
        {showAlert && (
          <div className="fixed z-50 inset-0 flex items-center justify-center overflow-hidden">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-base leading-6 font-medium text-gray-900">
                  Produto já existe no carrinho!
                </h3>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleAlert}
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
