const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/chattyapp-backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongodb connected"))
  .catch(console.log);
