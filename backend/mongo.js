const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);

mongoose.connect(url)
  .then(() => {
    console.log("✅ Database connected");
  })
  .catch((error) => {
    console.error("❌ Error connecting to MongoDB:", error.message);
  });