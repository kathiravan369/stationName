const express = require("express");
const router = express.Router();
const Data = require("../models/DataModel");


router.post("/", async (req, res) => {
  try {
    // Check if email already exists


    const newData = new Data(req.body);
    await newData.save();

    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      if (!id || id === "undefined") {
        return res.status(400).json({ error: "Invalid ID" });
      }
  
      const deletedData = await Data.findByIdAndDelete(id);
      if (!deletedData) {
        return res.status(404).json({ error: "Data not found" });
      }
  
      res.json({ message: "Deleted data successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

module.exports = router;
