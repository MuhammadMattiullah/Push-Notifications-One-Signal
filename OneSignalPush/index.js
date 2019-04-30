const express = require('express');
const bodyparser = require('body-parser');
const path = require('path');
const oneSignal = require('onesignal-node');

const app = express();
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "client")));


var sendNotification = function (data) {
  var headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": "Basic YTVmZDI0MWYtM2NiYy00NTI2LWEwMDUtN2EzNDAzMWQ0ZGI2"
  };

  var options = {
    host: "onesignal.com",
    port: 443,
    path: "/api/v1/notifications",
    method: "POST",
    headers: headers
  };

  var https = require('https');
  var req = https.request(options, function (res) {
    res.on('data', function (data) {
      console.log("Response:");
      console.log(JSON.parse(data));
    });
  });

  req.on('error', function (e) {
    console.log("ERROR:");
    console.log(e);
  });
  req.write(JSON.stringify(data));
  req.end();

};

var message = {
  app_id: "031bf3b8-e97b-40b0-a397-8f99827efa5e",
  contents: {
    en: "HASHIM THE GREAT DEVELOPER",
    tr: "Test mesajı"
  },
  include_player_ids: ["cb2d2224-96ff-461f-8bcd-c98ef2b58298"],
};

sendNotification(message);

app.listen(8000, (err) => {
  if (err) {
    console.log("Error listening to port 3000 ....");
  } else {
    console.log("listening to port 8000 ....");
  }
})