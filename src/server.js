const apollo = require('apollo-server-express');
const bodyParser = require('body-parser');
const express = require("express");
const next = require("next");

const schema = require("./data/schema");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();   
    
    server.use(
      '/graphql', 
      bodyParser.json(), 
      apollo.graphqlExpress(req => ({schema})),
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