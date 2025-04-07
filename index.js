const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");
const dotenv = require("dotenv");

const app = express();
app.use(express.json());
dotenv.config({ path: path.join(process.cwd(), ".env") });

app.post("/", async (req, res) => {
  const { to, subject, html } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // Fixed: Removed the extra dot here
    port: 587,
    secure:false, // process.env.NODE_ENV === "production"
    auth: {
      user: process.env.NODEMAILER_HOST_EMAIL,
      pass: process.env.NODEMAILER_HOST_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: "nurmdopu428@gmail.com",
      to,
      subject,
      text: "",
      html,
    });

    res
      .status(200)
      .json({ success: true, message: "Email sent successfully." });
    return;
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email.",
      error: error.message,
      stack: error.stack,
    });
    return;
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
