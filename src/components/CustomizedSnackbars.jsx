import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';
import {SNACK_BAR_SUCCESS,SNACK_BAR_ERROR} from '../Constants.js'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles1 = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

function MySnackbarContent(props) {
  const { classes, className, message,onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const styles2 = theme => ({
  margin: {
    margin: theme.spacing(1),
  },
});

class CustomizedSnackbars extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      open: this.props.open,
      status:this.props.status,
      message:this.props.message
    };
  }

  componentDidUpdate(prevProps) {
    const newProps = this.props
    if(prevProps !== newProps){
      this.setState({
        open: newProps.open,
        status:newProps.status,
        message:newProps.message
      })
    }
  }
  
  handleClose = (event, reason) => {
    console.log("check handle close ",reason)
    if (reason === 'clickaway') {
      console.log("check handle close reason ",reason)
      this.setState({ open: false });
      return;
    }

    this.setState({ open: false });
    // this.props.closeSnackbar()
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          open={this.state.open}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
        {
          this.state.status === SNACK_BAR_SUCCESS ? 
          <MySnackbarContentWrapper
          variant="success"
          className={classes.margin}
          message={this.props.message}
          onClose={this.handleClose}
          
        /> : this.state.status === SNACK_BAR_ERROR ? 
          <MySnackbarContentWrapper
          variant="error"
          className={classes.margin}
          message= {this.props.message}
          onClose={this.handleClose}
          /> : <div></div>
        }
          
        </Snackbar>
      </div>
    );
  }
}

CustomizedSnackbars.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles2)(CustomizedSnackbars);








