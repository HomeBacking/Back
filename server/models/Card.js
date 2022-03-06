const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema(
  {
    cardNumber: { type: String, required: true, index: { unique: true } },
    account: {
      type: String, //cciCode
      ref: "Account",
      required: true,
    },
    expireDate: { type: Date, required: true },
    state: { type: String, required: true },
    cardType: { type: String, required: true },
    pin: { type: String, required: true },
  },
  { timestamps: true }
);

const Model = mongoose.model("Card", cardSchema);

saveOrUpdate = async (card) => {
  let query = { cardNumber: card.cardNumber },
    update = {
      account: card.account,
      expireDate: card.expireDate,
      cardType: card.cardType,
      pin: card.pin,
      state: card.state,
    },
    options = { upsert: true, new: true, setDefaultsOnInsert: true };

  let result;
  try {
    await Model.updateOne(query, update, options, function (err, docs) {
      if (err) {
        console.log(err);
        result = err;
      } else result = docs;
    });
  } catch (err) {
    console.log(err);
  }

  return result;
};

findByCardNumber = async (cardNumber) => {
  let card;

  try {
    await Model.findOne({ cardNumber: cardNumber }, function (err, docs) {
      if (err) {
        console.log(err);
        card = err;
      } else card = docs;
    });
  } catch (err) {
    console.log(err);
  }
  return card;
};

removeOne = async (card) => {
  let result;
  try {
    await Model.deleteOne(
      { cardNumber: card.cardNumber },
      function (err, docs) {
        if (err) {
          console.log(err);
          result = err;
        } else result = docs;
      }
    );
  } catch (err) {
    console.log(err);
  }

  return result;
};

module.exports = { Model, saveOrUpdate, removeOne, findByCardNumber };
