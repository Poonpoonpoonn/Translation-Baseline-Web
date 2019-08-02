import React from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {ADD_VERSION_CONTROL_API, ADD_VERSION_CONTROL_INDEX} from '../Constants.js'
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';

import LoadingOverlay from 'react-loading-overlay';
import pink from 'material-ui/colors/pink';
import blue from 'material-ui/colors/blue';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';

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
        width: "100%",
    },
    dense: {
        marginTop: 19,
    },
    margin: {
        margin: theme.spacing(1),
    }
    ,
    palette: {
        //type: "dark",
        primary: blue,
        secondary: pink
    },
});
const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
    palette: {
        //type: "dark",
        primary: blue,
        secondary: pink
    },


});


class AddVersionControlContainer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            version: "",
            description: "",
            remark: "",
            loading: false,
            versionError: false,
            descriptionError: false,
            showAlert: false,
            alertType: "",
            alertTitle: "",
            alertMessage: "",
            author: this.props.username
        }
    }

    componentDidMount() {
        this.props.highlightTabMenu(ADD_VERSION_CONTROL_INDEX)
    }

    handleChange = name => event => {
        console.log("event target ", event.target)
        this.setState({[event.target.name]: event.target.value});

    };
    addVersionControl = () => {
        const {version, description, remark, author} = this.state
        this.setState({
            loading: true
        })
        fetch(ADD_VERSION_CONTROL_API + "?env=" + this.props.env, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "version": version,
                "description": description,
                "remark": remark,
                "author": author
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot save version control data")
                    throw new Error(response.statusText);
                }
            }).then(data => {
            console.log("add user json ", data)
            this.setState({
                loading: false,
            })
            this.showAlert("success", "Successfully Add Version Control")
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false,
            })
            this.showAlert("failed", "Cannot Add Version Control, Please try again. " + error.message)
        });
    }
    showAlert = (type, message) => {

        if (type === "success") {
            Alert.success(message, {
                position: 'top-right',
                effect: 'flip',
                onShow: function () {
                    console.log('aye!')
                },
                beep: false,
                timeout: 3000,
                offset: 100
            });
        } else if (type === "failed") {
            Alert.error(message, {
                position: 'top-right',
                effect: 'flip',
                onShow: function () {
                    console.log('aye!')
                },
                beep: false,
                timeout: 3000,
                offset: 100
            });
        }
    }
    handleSave = () => {
        var versionError = false
        var descriptionError = false
        if (this.state.version === "" || this.state.version === " ") {
            versionError = true
        }
        if (this.state.description === "" || this.state.description === " ") {
            descriptionError = true
        }
        if (versionError === true || descriptionError === true) {
            this.setState({
                versionError: versionError,
                descriptionError: descriptionError
            })
        } else {
            this.addVersionControl()
        }
        // this.props.addUser(this.state.username)
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Alert stack={false} timeout={3000}/>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                >
                    <MuiThemeProvider theme={theme}>
                        {/* <SweetAlert
        show={this.state.showAlert}
        title={this.state.alertTitle}
        text={this.state.alertMessage}
        type={this.state.alertType}
        onOutsideClick={() => this.setState({ showAlert: false })}
        onConfirm={() => this.setState({ showAlert: false })}
      /> */}
                        <form className={classes.container} noValidate autoComplete="off">
                            <br/>

                            <Card className={classes.card}>

                                <CardContent>
                                    <h2>Add Version Control</h2>
                                    <TextField
                                        required
                                        error={this.state.versionError}
                                        id="version"
                                        name="version"
                                        label="Version"
                                        className={classes.textField}
                                        value={this.state.version}
                                        onChange={this.handleChange('version')}
                                        margin="normal"
                                        variant="filled"
                                    />
                                    {this.state.versionError && <FormHelperText>This is required!</FormHelperText>}
                                    <br/>
                                    <TextField
                                        required
                                        error={this.state.descriptionError}
                                        id="description"
                                        label="Description"
                                        name="description"
                                        multiline
                                        rowsMax="10"
                                        value={this.state.description}
                                        onChange={this.handleChange('description')}
                                        className={classes.textField}
                                        margin="normal"
                                        // helperText="hello"
                                        variant="filled"
                                    />
                                    {this.state.descriptionError && <FormHelperText>This is required!</FormHelperText>}
                                    <br/>
                                    <TextField
                                        id="remark"
                                        label="Remark"
                                        name="remark"
                                        multiline
                                        rowsMax="10"
                                        value={this.state.remark}
                                        onChange={this.handleChange('remark')}
                                        className={classes.textField}
                                        margin="normal"
                                        // helperText="hello"
                                        variant="filled"
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button onClick={this.handleSave} variant="contained" size="large" color="secondary"
                                            className={classes.margin}>
                                        Save
                                    </Button>
                                </CardActions>
                            </Card>

                        </form>
                    </MuiThemeProvider>
                </LoadingOverlay>
            </div>

        );
    }
}

AddVersionControlContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddVersionControlContainer);
