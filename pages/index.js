import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

import Layout from '../components/layout';

const PostLink = (props) => (
  <li key={props.id}>
    <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
      <a>{props.title}</a>
    </Link>
  </li>
);

const Index = (props) => (
  <div>
    <Layout>
      <h1>My Blog</h1>
      <ul>
        {props.shows.map((show) => (
          <PostLink key={show.id} id={show.id} title={show.name}/>
        ))}        
      </ul>
    </Layout>
  </div>
);

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Shows data fetched! Count: ${data.length}`);

  return { shows: data };
};

export default Index;