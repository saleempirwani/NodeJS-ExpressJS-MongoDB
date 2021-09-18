const mongoose = require("mongoose");

console.log(" Hello   =======> ", process.env.MONGODB_URL)
console.log(" Hello   =======> ", process.env.JWT_SECRET)
console.log(" Hello   =======> ", process.env.SENDGRID_API_KEY)
console.log(" Hello   =======> ", process.env.PORT)

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});
