const graphqlTools =  require("graphql-tools");
const resolvers = require('./resolvers');

const typeDefs = `
type Query {
  testString: String
  author(firstName: String, lastName: String): Author
  allAuthors: [Author]
  allChannels: [Channel]
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

type Channel {
  id: Int
  name: String
}
`;

module.exports = graphqlTools.makeExecutableSchema({ typeDefs, resolvers });