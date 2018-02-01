import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui';

import Layout from '../components/layout';

const styles = theme => ({
  container: {
  },
  textField: {
  },
});

const Index = (props) => {
  const { classes } = props;
  return <Layout>
    <h1>Login Form</h1>
    <form noValidate autoComplete="off">      
      <div><TextField
        className={classes.textField}
        label="Введите email..."
        autoFocus={true}
        margin="normal"
      /></div>
      <div><TextField
        className={classes.textField}
        label="Введите пароль..."
        type="password"
        margin="normal"
      /></div>
    </form>
    <Button
      raised            
    >LogIn</Button>
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
};

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Shows data fetched! Count: ${data.length}`);

  return { shows: data.map(show => show.show) };
};

export default withStyles(styles)(Index);