"use client";

import React, { MouseEvent, useContext, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Context } from "@/context/context";
import Image from "next/image";
import { Quantity } from "./Quantity";
import { ProductsProps } from "@/interface/productsProps";


export function NavBar() {
  const { selectsProducts, setSelectsProducts } = useContext(Context);
  const [isNavOpen, setIsNavOpen] = useState(false);

  const total = selectsProducts.reduce((acc, item) => {
    return acc + Number(item.price) * (item.quantity || 1);
  }, 0);

  const handleNavToggle = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsNavOpen(!isNavOpen);
  };

  const handleClosed = (item: ProductsProps) => {
    const removerItemFromList = selectsProducts.filter((list) => {
      return list.id !== item.id;
    })
    setSelectsProducts(removerItemFromList)
    localStorage.setItem('listCar', JSON.stringify(removerItemFromList))
  }

  return (
    <section className="w-screen h-28 bg-[#0F52BA] flex items-center">
      <div className="flex items-center justify-between mx-8 w-screen">
        <div className="flex items-center text-white">
          <p className="mx-1 text-2xl font-semibold">MKS</p>
          <span className="font-extralight mt-2 ">sistemas</span>
        </div>

            <button
              className="bg-white pr-5 pl-3 py-2 mx-2 rounded-md flex items-center"
              onClick={handleNavToggle}
            >
              <span>
                <ShoppingCart className="text-black mr-2 h-2/4 w-2/4" />
              </span>
              {selectsProducts.length}
            </button>

        {isNavOpen && (
          <div className="fixed inset-0 z-50 flex items-stretch justify-end overflow-hidden">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-200 opacity-75"></div>
            </div>
            <div className="flex transform flex-col items-center justify-center gap-5 overflow-hidden rounded-lg bg-[#0F52BA] text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
              <div className="w-full">
                <div className=" bg-[#0F52BA] px-4 py-3 sm:flex sm:flex-row-reverse sm:justify-between sm:px-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-full border border-transparent bg-black text-base font-medium leading-[1.6rem] text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:mt-3 sm:h-7 sm:w-7"
                    onClick={handleNavToggle}
                  >
                    X
                  </button>
                  <span>
                    <h2 className="h-22 w-44 py-2 text-lg font-semibold text-white">
                      Carrinho de Compras
                    </h2>
                  </span>
                </div>
              </div>
              <div className="h-5/6 w-full sm:overflow-auto flex flex-col  items-center gap-5 pt-8 pb-4">
                {selectsProducts.length === 0 ? (
                  <>
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 rounded-md drop-shadow-xl">
                      <h3 className="text-base leading-6 font-medium text-gray-900">
                        Nenhum produto adicionado!
                      </h3>
                    </div>
                  </>
                ) : (
                  selectsProducts.map((item) => (
                    <div key={item.id} className="relative ">
                      <div className=" sm:overflow-auto -py-5 ">
                       
                        <button 
                          className="absolute bottom-[82%] -right-1 bg-black pb-1 text-white rounded-full ont-medium leading-[1.25rem] shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-2 sm:mt-2 sm:h-6 sm:w-6"
                          onClick={() => handleClosed(item)}
                        >
                          x
                        </button>
                     
                      
                        <div className=" h-28 w-96 rounded-lg bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-5">

                          

                          <div className="flex gap-3 w-full items-center justify-between rounded-full">
                            <Image
                              src={item.photo}
                              alt={item.name}
                              width={46}
                              height={57}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              className="m-2 rounded-full"
                            />

                            <h3 className="w-28 font-normal">{item.name}</h3>

                            <Quantity product={item} />

                            <span className="rounded-md text-center font-bold text-black">
                              {" "}
                              R${item.price.split(".")[0]}{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="h- w-full flex items-end justify-between pb-4 px-20  text-white">
                <p className="font-bold text-2xl">Total:</p>
                <p className="font-bold text-2xl">
                  R${String(total).split(".")[0]}
                </p>
              </div>

              <div className="h-24 w-full flex items-end justify-center px-6 py-6 bg-black text-white">
                <button className="font-bold text-2xl">Finalizar Compra</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
