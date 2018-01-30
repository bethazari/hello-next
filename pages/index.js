import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Button from 'material-ui/Button';

import Layout from '../components/layout';

const Index = (props) => ( 
  <Layout>
    <h1>My Blog</h1>
    <ul>
      {props.shows.map((show) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <Button raised color="primary">{show.name}</Button>
          </Link>
        </li>
      ))}        
    </ul>
  </Layout>
);

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Shows data fetched! Count: ${data.length}`);

  return { shows: data.map(show => show.show) };
};

export default Index;