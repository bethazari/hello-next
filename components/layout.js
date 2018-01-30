
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import InboxIcon from 'material-ui-icons/Inbox';
import DraftsIcon from 'material-ui-icons/Drafts';

import { withStyles } from 'material-ui/styles';

import withRoot from '../src/withRoot';
import Header from './header';

const styles = theme => ({
  root: {
  },
  content: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  drawer: {
    position: 'relative',
    height: '100%',
    width: 240,
  },
});

const Layout = (props) => {
  const { classes } = props;

  return <div className={classes.root}>
    <div className={classes.content}>
      <Header/>
      <Drawer
        type="permanent"
        classes={{paper: classes.drawer}}
        anchor="left"
      >
        <div/>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </Drawer>
      <div>
        {props.children}
      </div>
    </div>
  </div>
};

export default withRoot(withStyles(styles)(Layout));