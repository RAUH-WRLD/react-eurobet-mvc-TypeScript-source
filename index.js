const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {sendEmail} = require("./mailer");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(express.static("out"));
app.post("/api/sendMail", (req, res) => {
    sendEmail(req.body.email, req.body.text, req.body.subject, res);
});
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "out", "index.html"));
});
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running");
});
