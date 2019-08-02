import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        minWidth: "100%",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "50%",
    },
    dense: {
        marginTop: 19,
    },
    margin: {
        margin: theme.spacing(1),
    }
});


class AddUserContainer extends React.Component {
    state = {
        username: '',
        usernameError: false

    };

    handleChange = name => event => {
        this.setState({username: event.target.value});

    };
    handleSave = () => {
        if (this.state.username === "" || this.state.username === " ") {
            this.setState({
                usernameError: true
            })
        } else {
            this.props.addUser(this.state.username)
        }
    }

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <br/>
                <Card className={classes.card}>
                    <CardContent>

                        <TextField
                            required
                            error={this.state.usernameError}
                            id="username"
                            label="Username"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        {this.state.usernameError && <FormHelperText>This is required!</FormHelperText>}


                    </CardContent>
                    <CardActions>
                        <Button onClick={this.handleSave} variant="contained" size="large" color="primary"
                                className={classes.margin}>
                            Save
                        </Button>
                    </CardActions>
                </Card>
            </form>

        );
    }
}

AddUserContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddUserContainer);
