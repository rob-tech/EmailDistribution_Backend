const express = require("express");
const shortid = require("shortid");
// const { parse } = require("url")
// const path = require("path");
const utils = require("./utils");
const fs = require("fs-extra");

getParticipants = async () => {
  return await getItems("participants.json");
};

saveParticipants = async participants => {
  await saveItems("participants.json", participants);
};

const router = express.Router();

router.get("/", async (req, res) => {
  var participants = await getParticipants();
  res.send(participants);
});

router.post("/", async (req, res) => {
  var participants = await getParticipants();
  if (!req.body.id) req.body.id = shortid.generate();
  participants.push(req.body);
  await saveParticipants(participants);
  res.send(req.body);
});

module.exports = router;
