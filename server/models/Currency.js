const mongoose = require("mongoose");
const axios = require("axios");
const Schema = mongoose.Schema;

/* Uses CurrencyAPI
 * Documentation: https://currencyapi.com/docs/
 */

const currencySchema = new Schema(
  {
    iso: { type: String, required: true, index: { unique: true } },
    rate: { type: Number, required: true },
  },
  { timestamps: true }
);

const Model = mongoose.model("Currency", currencySchema);

getNewestRates = async (req) => {
  try {
    const response = await axios.get(
      "https://api.currencyapi.com/v3/latest?apikey=2ee230e0-9803-11ec-bd2a-db779118af45"
    );
    req = response.data;
    return req.data;
  } catch (error) {
    console.log(error);
  }
};

updateCurrencies = () => {
  let currencies;
  let currArray = [];

  getNewestRates(currencies).then((currencies) => {
    for (const [key, data] of Object.entries(currencies)) {
      let newCurrency = new Model({
        iso: key,
        rate: data.value,
      });
      currArray.push(newCurrency);
    }

    // save or update changes to currency rates
    currArray.forEach(async (element) => {
      let query = { iso: element.iso },
        update = { rate: element.rate },
        options = { upsert: true, new: true, setDefaultsOnInsert: true };

      try {
        await Model.updateOne(query, update, options, function (err, docs) {
          if (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  });
};

findByCode = async (code) => {
  let currency;

  try {
    await Model.findOne({ iso: code }, function (err, docs) {
      if (err) {
        console.log(err);
        currency = err;
      } else currency = docs;
    });
  } catch (err) {
    console.log(err);
  }
  return currency;
};

// returns converted rate (based in USD) of x amount represented in another currency rate
convertExchangeRates = async (baseCurrency, desiredCurrency, amount) => {
  try {
    const base = await findByCode(baseCurrency);
    const objective = await findByCode(desiredCurrency);

    return (objective.rate / base.rate) * amount;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { Model, updateCurrencies, findByCode, convertExchangeRates };
