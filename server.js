const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
require('dotenv').config();

const port = process.env.PORT || 8080;

const { auth, requiresAuth } = require('express-openid-connect');
const app = express();


const config = {
        authRequired: false,
        auth0Logout: true,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        issuerBaseURL: process.env.ISSUER_BASE_URL,
        secret: process.env.SECRET
      };


// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));

// req.oidc.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

// The /profile route will show the user profile as JSON
app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user, null, 2));
});


app
        .use(bodyParser.json())
        .use((req, res, next) => {
                res.setHeader('Access-Control-Allow-Origin', '*');
                next();
        })
        .use('/', require('./routes'));

mongodb.initDb((err) => {
        if (err) {
          console.log(err);
        } else {
          app.listen(port);
          console.log(`Connected to DB and listening on ${port}`);
        }
});