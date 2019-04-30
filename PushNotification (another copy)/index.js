const express = require('express');
const bodyparser = require('body-parser');
const webpush = require('web-push');
const path = require('path');

const app = express();
app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, "client")));

const publicVapidKey = 'BEKtxYgmJXigjRBFGFgvqvC4KY9zDeQAWWF5uhsLNne4ybMmRRlOphZ5ODyl2bZxJQ-wKNwN5PrZ2xWpIrtupus';
const privateVapidKey = '4GN7tn5rjD0t990Z1r1SOt9PoiLju_y8BJ0iVDuCJ4U';

webpush.setVapidDetails(
    'mailto: mattiullahshahzad80@gmail.com',
    publicVapidKey,
    privateVapidKey
);

// app.post('/subscribe', (req, res) => {
//     const subscription = req.body;
//     res.status(201).json({});
//     const payload = JSON.stringify({ 'title': 'Hello From BlueEast!' });
//     webpush.sendNotification(subscription, payload).catch(err => console.error(err));
// });

app.listen(3000, (err) => {
    if (err) {
        console.log("Error listening to port 3000 ....");
    } else {
        console.log("listening to port 3000 ....");
    }
})