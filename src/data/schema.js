const graphqlTools =  require("graphql-tools");
const resolvers = require('./resolvers');

const typeDefs = `
type Query {
  testString: String
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
}

type Author {
  id: Int
  firstName: String
  lastName: String
  posts: [Post]
}

type Post {
  id: Int
  title: String
  text: String
  views: Int
  author: Author
}
`;

module.exports = graphqlTools.makeExecutableSchema({ typeDefs, resolvers });