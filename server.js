const express = require("express");
const nodemailer = require("nodemailer");
const path = require("path");

var server = express();

server.use(express.static(path.join(__dirname, "public")));
server.use(express.json());

server.get("/", function (req, res) {
  res.sendFile("public/index.html", { root: __dirname });
});

server.post("/api/feedback", async (req, res) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true,
      auth: {
        user: "test_test_1976@internet.ru",
        pass: "sHPgUMSuVfPvMN34aAKV",
      },
    });

    const { email, message, name, phone } = req.body;
    console.log(email, message, name, phone);

    // verify connection configuration
    transporter.verify(function (error, success) {
        console.log('ok')
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

  } catch (e) {
    return res.status(500).send({
      status: 500,
      message: "error",
    });
  }
});

server.listen(3000, () => {
  console.log("listening on port 3000");
});
