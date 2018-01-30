import Link from 'next/link';
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';

const linkStyle = { marginRight: 25 };
const styles = {};

const Header = () => (
  <div className="root">
    <AppBar position="static">
      <Toolbar>
        <Link href="/">
          <a style={linkStyle}>Home</a>
        </Link>
        <Link href="/about">
          <a style={linkStyle}>About</a>
        </Link>
      </Toolbar>
    </AppBar>
  </div>
)

const x = withStyles(styles)(Header)

x.componentDidMount = () => {
  // Remove the server-side injected CSS.
  const jssStyles = document.querySelector('#jss-server-side');
  if (jssStyles && jssStyles.parentNode) {
    jssStyles.parentNode.removeChild(jssStyles);
  }
}

export default x;