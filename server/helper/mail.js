require("dotenv").config();

const api_key = process.env.MAILGUN;
const domain = 'sandbox9edb2bbb952449c4a00e861cd24282f9.mailgun.org';
const mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function doMail (todo) {
  let data = {
    from: 'me@samples.mailgun.org',
    to: 'bimanathanael95@gmail.com',
    subject: todo.title,
    text: todo.description
  };
   
  return mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
}

module.exports = doMail
