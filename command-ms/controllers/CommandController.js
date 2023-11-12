const express = require("express");
const router = express.Router();
const Command = require("../models/CommandModel");

// Add a new Command to the database
router.post("/commands", async (req, res) => {
  const command = req.body;

  try {
    const newCommand = await Command.create(command);
    res.status(201).json(newCommand);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Impossible d'ajouter cette command" });
  }
});

// Get a Command by its ID
router.get("/commands/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const command = await Command.findById(id);

    if (!command) {
      return res.status(404).json({ error: "Cette command n'existe pas" });
    }

    res.json(command);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the command" });
  }
});

// Update an existing Command
router.put("/commands/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    const command = await Command.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!command) {
      return res.status(404).json({ error: "Cette command n'existe pas" });
    }

    res.json(command);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "An error occurred while updating the command" });
  }
});

module.exports = router;
