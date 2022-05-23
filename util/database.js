const mongoose = require("mongoose");

const uri =
  "mongodb+srv://fbg_soi:RoaPGsAoMIgdiK7n@cluster0.dvz83.mongodb.net/?retryWrites=true&w=majority";

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
