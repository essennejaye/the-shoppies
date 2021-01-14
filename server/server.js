const express = require("express");
// import Apollo server
const { ApolloServer } = require("apollo-server-express");

// import typeDefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// create new Apollo server and pass in schemas
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// integrate Apollo with express
server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log graphql playground
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});
