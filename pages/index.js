import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

import Layout from '../components/layout';

const Index = (props) => (
  <div>
    <Layout>
      <h1>My Blog</h1>
      <ul>
        {props.shows.map((show) => (
          <li key={show.id}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}        
      </ul>
    </Layout>
  </div>
);

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Shows data fetched! Count: ${data.length}`);

  return { shows: data.map(show => show.show) };
};

export default Index;