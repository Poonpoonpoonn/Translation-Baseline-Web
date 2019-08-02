import React from 'react';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import pink from 'material-ui/colors/pink';
import {EDIT_TABLE_API, EDIT_TABLE_INDEX, SNACK_BAR_ERROR, SNACK_BAR_SUCCESS} from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import CustomizedSnackbars from '../components/CustomizedSnackbars.jsx'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';

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

class AddTableContainer extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            title: "Manage Admin",
            data: [],
            column: [],
            loading: false,
            showSnack: false,
            snackStatus: SNACK_BAR_SUCCESS,
            snackMessage: "",
            files: null
        }


    }

    onChange = (e) => {
        if (this.hasExtension(e.target.files[0].name, ['.xlsx', '.csv'])) {
            console.log("has required extension")
            let files = e.target.files
            this.setState({
                files: files
            })
        } else {
            this.setState({
                showSnack: true,
                snackStatus: SNACK_BAR_ERROR,
                snackMessage: "Wrong file format, Please upload only .xlsx or .csv file."
            })
        }


    }
    handleSave = () => {
        var data = new FormData()
        data.append('file', this.state.files[0])
        data.append('env', this.props.env)
        this.uploadFile(data)
    }
    uploadFile = (data) => {
        this.setState({
            loading: true
        })
        fetch(EDIT_TABLE_API, {
            method: "POST",
            body: data
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot get data")
                    throw new Error(response.status);
                }
            }).then(data => {
            console.log("add user json ", data)
            if (this.isMount) {
                this.setState({
                    loading: false,
                    showSnack: true,
                    snackStatus: SNACK_BAR_SUCCESS,
                    snackMessage: "Successfully Add New User."
                })
            }
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false,
                showSnack: true,
                snackStatus: SNACK_BAR_ERROR,
                snackMessage: "Cannot Add User, Please try again."
            })
        });
    }

    componentDidMount() {
        this.isMount = true
        this.props.highlightTabMenu(EDIT_TABLE_INDEX)

    }

    componentWillUnmount() {
        this.isMount = false
    }

    hasExtension = (fileName, extension) => {
        return (new RegExp('(' + extension.join('|').replace(/\./g, '\\.') + ')$', "i")).test(fileName);
    }


    getMuiTheme = () => createMuiTheme({
        palette: {
            //type: "dark",
            primary: pink
        },

        typography: {
            useNextVariants: true
        },
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    // backgroundColor: "#FF0000"
                }
            },
            MUIDataTableSelectCell: {
                checked: {color: "#FF0266 !important"}
            }
            // ,
            // MUIDataTableBodyRow: {
            //   root: {
            //     '&:nth-child(odd)': {
            //       backgroundColor: '#FF0000'
            //     }
            //   }
            // }
        }
    })

    render() {
        const {classes} = this.props;

        return (
            <div>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                >

                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <div>
                            <CustomizedSnackbars open={this.state.showSnack} status={this.state.snackStatus}
                                                 message={this.state.snackMessage}/>
                            <Card className={classes.card}>
                                <div onSubmit={this.onFormSubmit}>
                                    <h1 className={classes.margin}>Upload Table Structure File Here</h1>
                                    <input type="file" name="file" onChange={(e) => this.onChange(e)}
                                           className={classes.margin}></input>
                                </div>
                                <br/>
                                <Button onClick={this.handleSave} variant="contained" size="large" color="primary"
                                        className={classes.margin}>
                                    Save
                                </Button>
                            </Card>
                        </div>


                    </MuiThemeProvider>
                </LoadingOverlay>
            </div>

        )
    }
}

export default withStyles(styles)(AddTableContainer)