import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
});

const classes = useStyles();


//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [selectedIndex, setSelectedIndex] = React.useState(0);
class MenuList extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        menus:this.props.menus,
        selectedIndex:0,
        anchorEl:null
    }

  }

   handleClickListItem = (event) => {
    this.setState({
        anchorEl:event.currentTarget
    })
    // setAnchorEl(event.currentTarget);
  }

   handleMenuItemClick = (event, index) => {
     this.props.selectMenu(index)
    this.setState({
      selectedIndex:index,
        anchorEl:null
    })
  }

  handleClose = () => {
    this.setState({
        anchorEl:null
    })
  }


  render() {
      const {selectedIndex,anchorEl,menus} = this.state
     
      return (
    <div className={classes.root}>
      <List component="nav" aria-label={menus[selectedIndex]}>
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label={menus[selectedIndex]}
          onClick={this.handleClickListItem}
        >
          <ListItemText primary={menus[selectedIndex]}/>
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={this.handleClose}
      >
        {menus.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === this.state.selectedIndex}
            onClick={event => this.handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
      )
  }
}

MenuList.propTypes = {
    classes: PropTypes.object.isRequired,
    // theme: PropTypes.object.isRequired,
  };
  
  export default withStyles(useStyles)(MenuList);