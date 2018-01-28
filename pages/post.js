import Layout from '../components/layout';

const Content = (props) => (
  <div>
    <h1>{props.url.query.title}</h1>
    <p>This is content</p>
  </div>
);

const Post = (props) => (
  <Layout>
    <Content url={props.url}/>
  </Layout>
);

export default Post;
