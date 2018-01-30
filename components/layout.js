
import { withStyles } from 'material-ui/styles';

import withRoot from '../src/withRoot';
import Header from './header';

const styles = theme => ({
  root: {
  },
});

const Layout = (props) => {
  const { classes } = props;

  return <div className={classes.root}>
    <Header/>
    {props.children}
  </div>
};

export default withRoot(withStyles(styles)(Layout));