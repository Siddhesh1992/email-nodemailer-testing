const express = require("express");
const nodemailer = require("nodemailer");
const fs = require("fs");
const app = express();
require("./db");
const EmailTemplate = require("./emailSchema");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "brandt.leannon@ethereal.email",
    pass: "AsqJ3qRbVCUmddYgG4",
  },
});

app.get("/update", async (req, res) => {
  const templates = await EmailTemplate.find({
    notificationName: "COMPANY_OFFBOARDING_UAM_NOTIFICATION",
  });

  res.send(
    templates[0].email_Message.replace(
      '<img alt="[Insert alt text for header image here]" class="header-img" height="100%" src="{{HEADER_IMAGE}}" style="width:100%;height:100%" width="100%">',
      "<div>Testing</div>"
    )
  );
});

app.get("/", async (req, res) => {
  try {
    const templates = await EmailTemplate.find({
      notificationName: "COMPANY_OFFBOARDING_UAM_NOTIFICATION",
    });

    const img = fs.readFileSync("./emailBanner.png");

    const banner =
      "data:image/png;base64," + Buffer.from(img).toString("base64");
    for (let temps of templates) {
      const info = await transporter.sendMail({
        from: "meredith24@ethereal.email",
        to: "frostburn619@gmail.com",
        subject: temps?.email_Subject,
        html: temps?.email_Message.replace("{{HEADER_IMAGE}}", banner),
      });
    }
    res.send(templates[0]?.email_Message.replace("{{HEADER_IMAGE}}", banner));
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000, () => {
  console.log("server connected");
});
