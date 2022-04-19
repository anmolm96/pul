const qrcode = require("qrcode-terminal");
const express = require("express");
const cors = require("cors");

const { Client, LocalAuth } = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth({ clientId: "client" }),
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: ["Content-Type"],
    origin: "*",
    preflightContinue: true,
  })
);

let ready = false;

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  console.log("Client is auth'd!");
  ready = true;
});

client.on("ready", () => {
  console.log("Client is ready!");
  ready = true;
});

client.initialize();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.post("/create-group", async (req, res) => {
  if (ready) {
    const people = req.body.people;
    const subject = `Connecting ${people[0].name} <> ${people[1].name}`;
    const contacts = people.map((p) => {
      return `${p.number.replace(/\+/g, "")}@c.us`;
    });
    const groupRes = await client.createGroup(subject, contacts);

    const group = await client.getChatById(groupRes.gid._serialized);

    const resp = await group.sendMessage(
      "Hey! Just wanted to connect you all. The both of you should have enough context so feel free to take it from here."
    );

    const shrug = await sleep(10000);

    await group.leave();
    res.send("Created Group");
  } else {
    res.status(400).json({ message: "Not Ready" });
  }
});

app.listen(3001, () => console.log("Example app is listening on port 3001."));
