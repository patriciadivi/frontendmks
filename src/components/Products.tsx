import Image from "next/image";
// import { Card } from "./Card";
import { Suspense } from "react";
import { ShoppingBag } from "lucide-react";
import { Button } from "./Button";

type ProductsProps = {
  id: number;
  name: string;
  brand: string;
  description: string;
  photo: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  quantity?: number | undefined
  total: number | 0
};

export async function Products() {
  const response = await fetch(
    "https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1/products?page=1&rows=20&sortBy=id&orderBy=DESC"
  );
  const data = await response.json();
  const products: ProductsProps[] = data.products;

  return (
    <section className="lg:h-screen w-11/12 flex items-center justify-center sm:h-full">
      <div className="w-[58.625rem] h-[38.563rem] flex gap-7 flex-wrap items-center justify-center overflow-auto">
        
          {
            products.map((item) => (
            <Suspense key={item.id}  fallback="Carregando...">
                <div 
                id={item.id.toString()} 
                className="w-56 h-72 pt-3 rounded-md flex flex-col items-center justify-between bg-[#FFFFFF] drop-shadow-xl">
                  <Image
                    src={item.photo}
                    alt={item.name}
                    width={112}
                    height={128}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-full m-2"
                  />
                  <div className="w-full flex gap-3 justify-between items-start">
                    <p
                      className="w-32 pl-3 font-normal text-base leading-5"
                    >
                        {item.name}
                    </p>
                    <span 
                      className="p-2 mr-3 bg-[#373737] text-white font-bold rounded-md text-center">
                        R${item.price.split('.')[0]}
                    </span>
                  </div>
                  <p 
                      className="w-48 my-2 text-[#2C2C2C] text-[10px] font-light leading-3">
                      {item.description}
                  </p>
                
                <Button product={item}/>
                </div>
            </Suspense>
            ))
          }
       
      </div>
    </section>
  );
}
