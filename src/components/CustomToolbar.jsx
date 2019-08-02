import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import EditIcon from "@material-ui/icons/Edit";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {}
};

class CustomToolbar extends React.Component {

  handleClick = () => {
    this.props.handleEdit()
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Tooltip title= "Edit Table">
          <IconButton className={classes.iconButton} onClick={this.handleClick}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(
  CustomToolbar
);
