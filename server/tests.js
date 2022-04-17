const User = require("./models/User");
const Account = require("./models/Account");
const Currency = require("./models/Currency");
const Transaction = require("./models/Transaction");

executeTests = async () => {
  let account1 = await Account.findByCci("0883339876110009001110");

  console.log(account1);

  /*
  Account.Model.findOne(
    { cciCode: "0001117773217580000654" },
    function (err, account) {
      if (err) throw err;

      // test a matching password
      account.comparePassword("tipitoEnojadito123", function (err, isMatch) {
        if (err) throw err;
        console.log("match:", isMatch); // -> Password123: true
      });
    }
  );*/
  /*
  try {
    let testConvert = await Currency.convertExchangeRates("RUB", "ARS", 12);

    console.log(testConvert);
  } catch (error) {
    console.log(error);
  }*/
  /*
  try {
    // find last inserted (!!!!!RETURNS AN ARRAY)
    let testLast = await Transaction.Model.find({}).sort({ _id: -1 }).limit(1);

    console.log(testLast);
  } catch (error) {
    console.log(error);
  }*/
};

module.exports = { executeTests };
