require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.log('Error connecting to database:');
    console.log(err);
  });
  module,exports = mongoose; 