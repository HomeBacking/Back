const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accountSchema = new Schema(
  {
    accountNumber: { type: String, required: true, index: { unique: true } },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    currency: { type: String, required: true },
    cciCode: { type: String, required: true },
    balance: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }, // temp FIXME
    state: { type: String, required: true },
  },
  { timestamps: true }
);

const Model = mongoose.model("Account", accountSchema);

findByCci = async (cci) => {
  let account = await Model.find({ cciCode: cci });
  return account;
};

module.exports = { Model, findByCci };
