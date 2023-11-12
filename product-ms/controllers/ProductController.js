const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");

// Add a new product to the database
router.post("/Products", async (req, res) => {
  console.log(req.body);
  try {
    const { id, title, description, image, price } = req.body;
    const newProduct = new Product({ id, title, description, image, price });

    await newProduct.save();
    res.json(newProduct);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Une erreur s'est produite lors de l'ajout du produit" });
  }
});

// Get a list of all products
router.get("/Products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération des produits",
    });
  }
});

router.get("/Products/:id", async (req, res) => {
  const productId = parseInt(req.params.id, 10);

  if (isNaN(productId)) {
    return res.status(400).json({ error: "Produit ID invalide" });
  }

  try {
    const product = await Product.find({ id: productId });

    if (!product) {
      return res
        .status(404)
        .json({ error: `Produit avec ID=${productId} non trouvé` });
    }

    res.json(
      product.length > 0
        ? product[0]
        : `Produit avec ID=${productId} non trouvé`
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Une erreur s'est produite lors de la récupération du produit",
    });
  }
});

module.exports = router;
