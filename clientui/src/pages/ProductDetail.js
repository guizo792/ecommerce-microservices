import React, { useEffect, useState } from "react";
import { productsData } from "../data/data";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Product() {
  const { id } = useParams();
  const [Product, setProduct] = useState();
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString();
  const navigate = useNavigate();
  const sendCommand = async () => {
    try {
      const response = await axios.post("http://localhost:8081/commands", {
        productId: id,
        dateCommande: formattedDate,
        quantite: 1,
        commandePayee: false,
      });

      console.log("Response from server:", response.data);
      navigate(`/products/${response.data._id}/commander`);
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle errors here
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8080/Products/" + id)
      .then((data) => {
        console.log(data.data);
        setProduct(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // const product = productsData.find((product) => product.id == id);
  // console.log(product);

  return (
    <div className="flex flex-col justify-center items-start w-full">
      <div className="flex justify-center items-center w-full my-12">
        <h1 className="text-3xl font-bold">Application Mcommerce</h1>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        <img
          className="w-[250px] h-[250px]"
          src={Product?.image}
          alt={Product?.title}
        />
        <div className="flex flex-col justify-center items-center gap-6 w-full my-2">
          <h3 className="text-xl font-bold text-black text-center max-w-[350px]">
            {Product?.title}
          </h3>
          <p className="text-base font-normal text-black text-center max-w-[350px]">
            {Product?.description}
          </p>

          <button
            className="text-xl font-medium text-center p-4 rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
            onClick={sendCommand}
          >
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
