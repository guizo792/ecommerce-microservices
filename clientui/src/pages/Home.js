import { useEffect, useState } from "react";
import Product from "../components/Product";
import { productsData } from "../data/data";
import axios from "axios";

export default function Home() {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/Products")
      .then((data) => {
        console.log(data.data);
        setProducts(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="flex flex-col justify-center items-start w-full">
      <div className="flex justify-center items-center w-full my-12">
        <h1 className="text-3xl font-bold text-blue-500">
          Application Mcommerce
        </h1>
      </div>

      <div className="flex justify-start items-center w-full my-6">
        <div className="grid grid-cols-3 w-full justify-items-center gap-8">
          {Products.map((product) => {
            return <Product key={product.id} product={product} />;
          })}
        </div>
      </div>
    </div>
  );
}
