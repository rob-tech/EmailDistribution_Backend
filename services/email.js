const express = require("express")
const router = express.Router()
const fs = require("fs-extra");
const utils = require("./utils");
const sg= require("@sendgrid/mail")
const psw = process.env.SENDGRID_API_KEY
const myEmail = process.env.EMAIL


getEmails = async () => {
  return await getItems("emails.json");
};

saveEmails = async emails => {
  await saveItems("emails.json", emails);
};

router.get("/", async (req, res) => {
  var allEmails = []
  var participants = await getItems("participants.json");
  participants.forEach(async participant => {
  var emailAddress = participant.email
  allEmails.push(emailAddress)
  })
  await saveEmails(allEmails);
  res.send(allEmails)
});

router.get("/", async (req, res) => {
var emails = await getEmails()
emails.forEach(async email => {
  const msg={
    to: email,
    from: myEmail,
    subject: "Hello",
    text: "first email"
  }
  sg.setApiKey(psw)

sg.send(msg)
  })
})

// const msg={
//   to: email,
//   from: email,
//   subject: "Hello",
//   text: "first email"
// }






// var helper = require('sendgrid').mail;
// var fromEmail = new helper.Email('test@example.com');
// var toEmail = new helper.Email('test@example.com');
// var subject = 'Sending with SendGrid is Fun';
// var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
// var mail = new helper.Mail(fromEmail, subject, toEmail, content);
 
// var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
// var request = sg.emptyRequest({
//   method: 'POST',
//   path: '/v3/mail/send',
//   body: mail.toJSON()
// });
 
// sg.API(request, function (error, response) {
//   if (error) {
//     console.log('Error response received');
//   }
//   console.log(response.statusCode);
//   console.log(response.body);
//   console.log(response.headers);
// });

module.exports = router