// server/routes/dataRoutes.js
const express = require("express");
const router = express.Router();
const DataModel = require("../models/dataModel");

// GET all data
router.get("/", async (req, res) => {
  try {
    const data = await DataModel.find({}).sort({ timestamp: 1 });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// POST new data
router.post("/", async (req, res) => {
  const { timestamp, value } = req.body;
  if (!timestamp || !value) {
    return res.status(400).json({ error: "Invalid data" });
  }

  try {
    const newData = await DataModel.create({ timestamp, value });
    res.status(201).json(newData);
  } catch (err) {
    res.status(500).json({ error: "Error saving data" });
  }
});

module.exports = router;
