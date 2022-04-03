const Card = require("../models/Card");
const { Router } = require("express");
const router = Router();

router.get("/card/find", (req, res) => {
  const { cardNumber } = req.body;

  try {
    const card = await Card.findByCardNumber(cardNumber);

    if (card) {
      res.status(200).json(card);
    } else {
      res.status(404).json({ msg: "not_found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
