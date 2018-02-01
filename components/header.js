import Link from 'next/link';
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

const linkStyle = { marginRight: 25 };
const styles = {
  appbar: {
    position: 'absolute',
    width: `calc(100% - 240px)`,
    marginLeft: 240,
  }
};

const Header = (props) => {
  const { classes } = props;
  return <div>
    <AppBar position="static" className={classes.appbar}>
      <Toolbar>
        <Link href="/">
          <a style={linkStyle}>Home222</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
      </Toolbar>
    </AppBar>
  </div>
}

export default withStyles(styles)(Header);