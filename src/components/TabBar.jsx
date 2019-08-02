import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// function TabContainer(props) {
//   return (
//     <Typography component="div" style={{ padding: 8 * 3 }}>
//       {props.children}
//     </Typography>
//   );
// }

// TabContainer.propTypes = {
//   children: PropTypes.node.isRequired,
// };

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  tabsIndicator: {
   // backgroundColor: "#1890ff",
    height: 5,
  },
});

class TabBar extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          value: 0,
        };
    }
  

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.changeTab(value)
  };

  render() {
    const { classes,items } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={this.handleChange} classes={{indicator:classes.tabsIndicator}}>
            <Tab label={items[0]} />
            <Tab label={items[1]} />
            <Tab label={items[2]} />
          </Tabs>
        </AppBar>

      </div>
    );
  }
}

// TabBar.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(TabBar);
