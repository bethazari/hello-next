const Dataloader = require("dataloader");
const rp = require('request-promise-native');

const posts = [
  { id: 1, title: 'A post', text: 'Some text', views: 2, author_id: 1 },
  { id: 2, title: 'B post', text: 'Some other text', views: 5, author_id: 1 },
  { id: 3, title: 'C post', text: 'Some other text 2', views: 5, author_id: 2 },
];

const getPostsByAuthorBatch = (keys) => {
  return Promise.resolve(keys.map(key => posts.filter(post => post.author_id === key)));
};

module.exports = {
  Query: {
    author(root, args) {
      return {id: 1, fristName: 'Hello', lastName: 'World!' };
    },
    allAuthors() {
      return [
        { id: 1, firstName: 'Hello', lastName: 'World!' },
        { id: 2, firstName: 'Hello2', lastName: 'World2!' },
      ];
    },
    async allChannels(root, args, context) {
      const channels = await rp({
        method: "GET",
        uri: "http://default.coin32-cab.demo.al.re/api/2/cabinet/channels/?limit=10&offset=0&archive=False",
        jar: context.j,
        json: true,
      });
      return channels.results;
    },
  },
  Author: {
    posts(author, root) {
      const postsLoader = new Dataloader(keys => getPostsByAuthorBatch(keys));
      return postsLoader.load(author.id);
    },
  },
};