const apollo = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require("express");
const next = require("next");
const rp = require('request-promise-native');

const schema = require("./data/schema");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const j = rp.jar();

const getUserData = async () => {  
  const loginData = await rp({
    method: "POST",
    uri: "http://default.coin32-cab.demo.al.re/api/2/common/login", 
    body: {
      email: "althazari@gmail.com", 
      password: "restPasS",
    },
    json: true,
    jar: j,
  });
  console.log(loginData);
  const authData = await rp({
    method: "GET",
    uri: "http://default.coin32-cab.demo.al.re/api/2/common/auth/",
    jar: j,
  });
  console.log(authData);
  const userData = await rp({
    method: "GET",
    uri: "http://default.coin32-cab.demo.al.re/api/2/common/account/",
    jar: j,
  });
  console.log(userData);
  return userData;
}

getUserData().then((userData) => {

  app.prepare()
    .then(() => {
      const server = express();   
      
      server.use(
        '/graphql', 
        bodyParser.json(), 
        apollo.graphqlExpress(req => ({schema, context: { j }})),
      );
      server.use(
        '/graphiql', 
        apollo.graphiqlExpress({ endpointURL: '/graphql' }),
      );

      server.get("/p/:id", (req, res) => {
        const actualPage = "/post";
        const queryParams = { id: req.params.id };
        app.render(req, res, actualPage, queryParams);
      });

      server.get("*", (req, res) => handle(req, res));

      server.listen(80, (err) => {
        if (err) throw err;
        console.log(" > ready on http://localhost:80");
      });
    })
    .catch((ex) => {
      console.error(ex.stack);
      process.exit(1);
    });
});