import React, { useEffect, useState } from "react";
import { productsData } from "../data/data";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function Product() {
  const [paid, setPaid] = useState(false);
  const [Product, setProduct] = useState();
  const { id } = useParams();
  const PayCommand = async () => {
    try {
      const response = await axios.post("http://localhost:8082/payments", {
        idCommand: id,
        montant: 50.99,
        numeroCarte: 1234567890123456,
      });

      console.log("Response from server:", response.data);
      setPaid(true);
    } catch (error) {
      console.error("Error sending data:", error);
      // Handle errors here
    }
  };

  // const product = productsData.find((product) => product.id == id);

  // if (!product) {
  //   // Handle case where the product with the given ID is not found
  //   return <div>Product not found</div>;
  // }

  return (
    <div className="flex flex-col justify-center items-start w-full">
      <div className="flex justify-center items-center w-full my-12">
        <h1 className="text-3xl font-bold">Application Mcommerce</h1>
      </div>

      <div className="flex flex-col justify-center items-center w-full">
        {/* <img
          className="w-[300px]"
          width={500}
          height={500}
          src={product.image}
          alt={product.name}
        /> */}
        <div className="flex flex-col justify-center items-center gap-6 w-full my-2">
          {/* <h3 className="text-xl font-bold text-black text-center max-w-[350px]">
            {product.name}
          </h3>
          <p className="text-base font-normal text-black text-center max-w-[350px]">
            {product.description}
          </p> */}
          {!paid ? (
            <>
              <p className="border border-black rounded-md p-2 text-base font-normal text-black text-center max-w-[350px]">
                Ici l'utilisateur sélectionne en temps normal un moyen de
                paiement et entre les informations de sa carte bancaire. Nous
                allons éviter d'ajouter les formulaires nécessaires afin de
                garder l'application la plus basique et simple possible pour la
                suite. Si vous vous sentez à l'aise, vous pouvez créer un
                formulaire pour accepter le numéro de la CB, que vous traiterez
                dans le contrôleur grâce à un PostMapping.
              </p>
              <button
                className="text-xl font-medium text-center p-4 rounded-xl text-blue-500 hover:bg-blue-500 hover:text-white transition duration-300"
                onClick={PayCommand}
              >
                Payer Ma Commande
              </button>
            </>
          ) : (
            <p className="text-2xl font-black text-green-600 text-center max-w-[350px]">
              Paiement Accepté
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
