const User = require("../models/User");
const { Router } = require("express");
const auth = require("../middleware/auth");
const router = Router();

router.post("/api/user/find", auth, async (req, res) => {
  const { dni } = req.body;

  try {
    const user = await User.findByDni(dni);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "not_found" });
    }
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});

module.exports = router;
