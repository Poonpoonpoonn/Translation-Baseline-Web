import React from 'react';
import { Dialog, DialogActions, DialogTitle, DialogContent, Input, Button, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: 600,
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
});

const DEFAULT_STATE = {
  name: '',
  project: '',
  flow: '',
  channel: '',
  task: '',
};

class TOCAddDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...DEFAULT_STATE };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSelectChange = name => selectedOption => {
    this.setState({ [name]: selectedOption });
  };

  handleDone = () => {
    const { onDone } = this.props;
    onDone({ ...this.state });
    this.setState({...DEFAULT_STATE});
  };

  render() {
    const { classes, open, onCancel } = this.props;
    const { name, project, flow, channel, task } = this.state;
    return (
      <Dialog open={open} maxWidth="md" onClose={this.handleScreenClose} aria-labelledby="alert-dialog-title">
        <DialogTitle>New Screen</DialogTitle>
        <DialogContent className={classes.root}>
          <div className={classes.textField}>
            <Typography color="textSecondary">Name</Typography>
            <Input type="text" value={name} onChange={this.handleInputChange('name')} fullWidth />
          </div>
          <div className={classes.textField}>
            <Typography color="textSecondary">Project</Typography>
            <Input type="text" value={project} onChange={this.handleInputChange('project')} fullWidth />
          </div>
          <div className={classes.textField}>
            <Typography color="textSecondary">Flow</Typography>
            <Input type="text" value={flow} onChange={this.handleInputChange('flow')} fullWidth />
          </div>
          <div className={classes.textField}>
            <Typography color="textSecondary">Channel (Epic)</Typography>
            <Input type="text" value={channel} onChange={this.handleInputChange('channel')} fullWidth />
          </div>
          <div className={classes.textField}>
            <Typography color="textSecondary">Task</Typography>
            <Input type="text" value={task} onChange={this.handleInputChange('task')} fullWidth />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleDone} color="primary">
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

TOCAddDialog.propTypes = {
  onDone: PropTypes.func,
};

TOCAddDialog.defaultProps = {
  onDone: () => {},
};

export default withStyles(styles)(TOCAddDialog);
