const mongoose = require("mongoose");

const uri =
  "mongodb+srv://fbg_soi:GxBRpnbn9CscVS5j@cluster0.m3akm.mongodb.net/FBG_Soi?retryWrites=true&w=majority";

module.exports = {
  async getConnectDB() {
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("Connect to database successfully");
      })
      .catch(console.log);
  },
};
