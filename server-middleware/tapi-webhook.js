import express from "express";
import { sendEmail } from "./sendgrid";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  try {
    const SENDGRID_TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID;
    await sendEmail(SENDGRID_TEMPLATE_ID, "justin@wunderfund.co", req.body);
    return res.send("email sent!");
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
    return res.status(400).send(error);
  }
});

module.exports = {
  path: "/api/webhook",
  handler: app,
};
