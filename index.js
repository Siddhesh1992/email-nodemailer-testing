const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const app = express();
require("./db");
const EmailTemplate = require("./emailSchema");

// const transporter = nodemailer.createTransport({
//   host: "smtp.ethereal.email",
//   port: 587,
//   auth: {
//     user: "brandt.leannon@ethereal.email",
//     pass: "AsqJ3qRbVCUmddYgG4",
//   },
// });
const from = "nya.schmitt84@ethereal.email";
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "nya.schmitt84@ethereal.email",
    pass: "V1AeK61rfMU77ptPz8",
  },
});

app.get("/test", async (req, res) => {
  const templates = await EmailTemplate.find({
    email_Message: /<img alt="[Insert alt text for header image here]" class="header-img" height="120" src="{{HEADER_IMAGE}}" style="width:100%;height:120px;" width="100%" \/>/,
  });

  res.send(templates);
});

app.get("/update", async (req, res) => {
  const templates = await EmailTemplate.find({});

  const arr = [];
  for (let temp of templates) {
    if (
      temp.email_Message.indexOf(
        '<img alt="[Insert alt text for header image here]" class="header-img" height="100%" src="{{HEADER_IMAGE}}" style="width:100%;height:100%" width="100%">'
      ) != -1
    ) {
      temp.email_Message = temp.email_Message.replace(
        '<img alt="[Insert alt text for header image here]" class="header-img" height="100%" src="{{HEADER_IMAGE}}" style="width:100%;height:100%" width="100%">',
        '<img alt="[Insert alt text for header image here]" class="header-img" height="120" src="{{HEADER_IMAGE}}" style="width:100%;height:120px;" width="100%" />'
      );

      arr.push(temp);
      const t = await temp.save();
    }
  }

  res.send("test" + arr.length);
});

app.get("/", async (req, res) => {
  try {
    const templates = await EmailTemplate.find({
      notificationName: "COMPANY_REACTIVATION_NOTIFICATION",
    });

    const img = fs.readFileSync("./emailBanner.png");

    const banner =
      "data:image/png;base64," + Buffer.from(img).toString("base64");
    for (let temps of templates) {
      const info = await transporter.sendMail({
        from,
        to: "frostburn619@gmail.com",
        subject: temps?.email_Subject,
        html: temps?.email_Message.replace("{{HEADER_IMAGE}}", banner),
      });

      console.log(info);
    }
    res.send(templates[0]?.email_Message.replace("{{HEADER_IMAGE}}", banner));
  } catch (e) {
    console.log(e);
  }
});

app.listen(3001, () => {
  console.log("server connected");
});
