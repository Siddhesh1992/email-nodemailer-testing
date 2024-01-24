const { default: mongoose } = require("mongoose");

const emailSchema = new mongoose.Schema({
  requestId: String,
  email_CC: String,
  email_From: String,
  email_To: String,
  email_Subject: String,
  email_Message: String,
  notificationName: String,
  notificationType: String,
  description: String,
  creationDate: Date,
  lastUpdatedDate: Date,
  _class: String,
});

module.exports = mongoose.model("EmailTemplate", emailSchema);
