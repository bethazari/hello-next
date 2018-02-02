import { ApolloProvider, graphql } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from 'graphql-tag';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui';

import Layout from '../components/layout';

const apolloClient = new ApolloClient({
  link: new HttpLink(),
  cache: new InMemoryCache(),
});
const query = gql`{ allChannels { id } }`;

const Mydiv = graphql(query)(({data: { channels }}) => <div><ul>{channels.map(channel => <li></li>)}</ul></div>);

const Index = (props) => {
  return <ApolloProvider client={apolloClient}><Layout>
    <h1>My Blog123</h1>
    <Mydiv/>
    <ul>
      {props.shows.map((show) => (
        <li key={show.id}>
          <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
            <Button raised color="primary">{show.name}</Button>
          </Link>
        </li>
      ))}        
    </ul>
  </Layout></ApolloProvider>
};

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Shows data fetched! Count: ${data.length}`);

  return { shows: data.map(show => show.show) };
};

export default Index;