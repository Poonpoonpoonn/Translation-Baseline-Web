import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import pink from 'material-ui/colors/pink';
import queryString from 'query-string'
import {
    DELETE_FIELD_API,
    EXPORT_DATA_API,
    FIELD_TABLE_INDEX,
    QUERY_EVENTS_IN_FIELD_RELATIONS_API
} from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import DownloadIcon from '@material-ui/icons/CloudDownloadRounded';
import CardContent from '@material-ui/core/CardContent';
import fileSaver from 'file-saver'
import axios from 'axios'
import DeleteIcon from '@material-ui/icons/Delete';
import red from '@material-ui/core/colors/red';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
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
        width: "50%",
    },
    dense: {
        marginTop: 19,
    },
    margin: {
        margin: theme.spacing(1),
    }
});

const DeleteButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(red[700]),
        backgroundColor: red[700],
        '&:hover': {
            backgroundColor: red[900],
        },
    },
}))(Button);


class FieldDetailContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Event Details",
            fieldData: [{
                field_id: "",
                field_name: "",
                type: "",
                length: "",
                decimal_point: "",
                thai_char: "",
                description: "",
                sample_data: "",
                remarks: "",
                generated_by: "",
                send_to_edw: "",
            }],
            row: 25,
            eventData: [],
            loading: true,
            openDialog: false,
            showAlert: false,
            alertType: "",
            alertTitle: "",
            alertMessage: "",
            epicName: "",
            epicNameError: false,
            devTask: "",
            devTaskError: false

        }
        this.columns = [
            {
                field: "eventCode",
                label: "Event Code",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                field: "subEventCode",
                label: "Sub Event Code",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                field: "eventNameTH",
                label: "Event Name TH",

                options: {
                    filter: true,
                    // filterType: 'textField',
                    //  sort: true,
                }
            },
            {
                field: "eventNameEN",
                label: "Event Name EN",

                options: {
                    filter: true,
                }
            },
            {
                field: "description",
                label: "Description",

                options: {
                    filter: true,
                }
            },
            {
                field: "sendToPRM",
                label: "Send To PRM",

                options: {
                    filter: true,
                }
            },
            {
                field: "sendToGL",
                label: "Send To GL",

                options: {
                    filter: true,
                }
            },
            {
                field: "sendToEDW",
                label: "Send To EDW",

                options: {
                    filter: true,
                }
            },
            {
                field: "profileFlag",
                label: "Profile Flag",

                options: {
                    filter: true,
                }
            },
            {
                field: "splunkFlag",
                label: "Splunk Flag",

                options: {
                    filter: true,
                }
            },
            {
                field: "eventBusFlag",
                label: "Event Bus Flag",

                options: {
                    filter: true,
                }
            },
            {
                field: "endpoints",
                label: "EndPoints",

                options: {
                    filter: true,
                }
            }
        ];


    }

    queryFieldRelations = () => {
        const values = queryString.parse(this.props.location.search)
        this.setState({
            loading: true
        })
        fetch(QUERY_EVENTS_IN_FIELD_RELATIONS_API + '?env=' + this.props.env + "&fieldId=" + values.fieldId, {
            method: "GET",

        })
            .then(response => {
                if (response.status === 200) {
                    console.log("status is 200 field retriev")
                    return response.json()
                } else {
                    console.log("cannot get data")
                    throw new Error(response.statusText);
                }
            }).then(data => {

            this.setState({
                eventData: data.eventData,
                fieldData: data.fieldData,
                loading: false
            })
            console.log("check event data ", data.eventData)

        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false,
                showAlert: true,
                alertType: "error",
                alertTitle: "Error!",
                alertMessage: "Cannot Load Event Detail, Please try again. " + error.message

            })
        });
    }


    componentDidMount() {
        this.isMount = true
        this.props.highlightTabMenu(FIELD_TABLE_INDEX)
        this.queryFieldRelations()
    }

    handleDelete = () => {

        if (!this.state.openDialog) {
            this.setState({openDialog: true});
            return
        }
        let epicNameErrorFlag = false
        let devTaskErrorFlag = false
        if (this.state.epicName === "" || this.state.epicName === " ") {
            epicNameErrorFlag = true

        }
        if (this.state.devTask === "" || this.state.devTask === " ") {
            devTaskErrorFlag = true
        }
        if (epicNameErrorFlag || devTaskErrorFlag) {
            this.setState({
                epicNameError: epicNameErrorFlag,
                devTaskError: devTaskErrorFlag
            })
            return
        }

        this.setState({
            loading: true,
            openDialog: false,
        })


        this.setState({
            openDialog: false,
            loading: true
        });
        const values = queryString.parse(this.props.location.search)
        const fieldObj = {
            "fieldId": values.fieldId,
            "fieldName": this.state.fieldData[0]["field_name"],
        }
        fetch(DELETE_FIELD_API + "?env=" + this.props.env, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fieldObj": fieldObj,
                "epicName": this.state.epicName,
                "devTask": this.state.devTask,
                "username": this.props.username
            })
        })
            .then(response => {
                console.log("cannot  delete field new response ", response)
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot  delete field")
                    throw new Error(response.statusText);
                }
            }).then(data => {
            if (this.isMount) {

                this.setState({
                    loading: false,
                    showAlert: true,
                    alertType: "success",
                    alertTitle: "Success!",
                    alertMessage: "Successfully Delete Field"

                })
                this.showAlert("success", "Successfully Delete Field")
                this.props.history.replace('/fielddictionary')
            }
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false,
                showAlert: true,
                alertType: "error",
                alertTitle: "Error!",
                alertMessage: "Cannot Delete Field, Please try again. " + error.message
            })
            this.showAlert("failed", "Cannot Delete Field, Please try again. " + error.message)
        });

    }

    componentWillUnmount() {
        this.isMount = false
    }

    exportEventInFieldRelationData = () => {
        this.setState({
            loading: true
        })
        const values = queryString.parse(this.props.location.search)
        axios.post(EXPORT_DATA_API, {
            "tableType": "EventInFieldRelation",
            "env": this.props.env,
            "fieldId": values.fieldId
        }, {responseType: 'arraybuffer'})
            .then((response) => {
                var blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                console.log("retrieving field name ", this.state.fieldData[0]["field_name"])
                fileSaver.saveAs(blob, "Events_In_" + this.state.fieldData[0]["field_name"] + '.xlsx');
                this.setState({
                    loading: false
                })
                this.showAlert("success", "Successfully Export File")
            });
    }
    handleClose = () => {
        this.setState({openDialog: false});
    }

    handleEdit = () => {
        const values = queryString.parse(this.props.location.search)
        this.props.history.push("add?fieldId=" + values.fieldId)
    }
    handleChange = value => event => {
        this.setState({[value]: event.target.value});
    };


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
        const options = {
            //    filterType: 'checkbox',
            rowsPerPage: 25,
            rowsPerPageOptions: [25, 100, 150, this.state.fieldData.length],
            selectableRows: 'none',
            download: false,
            filterType: 'textField',
            print: false,
            responsive: 'scroll',
            rowHover: true,

            onChangeRowsPerPage: (row) => {
                this.setState({
                    row: row
                })
            }

        };
        const {classes} = this.props;
        console.log("checking field data ", this.state.fieldData)
        const {field_id, field_name, type, length, decimal_point, thai_character, description, remarks, generated_by, send_to_edw} = this.state.fieldData[0]
        return (
            <div>
                <Alert stack={false} timeout={3000}/>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                >
                    <Dialog
                        open={this.state.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        maxWidth="sm"
                        fullWidth={true}
                    >
                        <DialogTitle id="form-dialog-title">Submit your description </DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                error={this.state.epicNameError}
                                margin="dense"
                                id="epicName"
                                label="Description"
                                type="text"
                                value={this.state.epicName}
                                multiline
                                rowsMax="10"
                                onChange={this.handleChange('epicName')}
                                fullWidth
                            />
                            {this.state.epicNameError && <FormHelperText>This is required!</FormHelperText>}

                        </DialogContent>
                        <DialogContent>
                            <TextField
                                required
                                error={this.state.devTaskError}
                                margin="dense"
                                id="devTask"
                                label="Dev Task number"
                                type="text"

                                value={this.state.devTask}
                                onChange={this.handleChange('devTask')}
                                fullWidth
                            />
                            {this.state.devTaskError && <FormHelperText>This is required!</FormHelperText>}
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} color="primary">
                                Cancel
                            </Button>
                            <Button variant="contained" onClick={this.handleDelete} color="secondary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Button variant="contained" color="secondary" size="large" onClick={this.handleEdit}>
                        Edit
                    </Button>
                    {" "}
                    <DeleteButton className={classes.button} onClick={this.handleDelete} variant="contained"
                                  size="large">
                        Delete Row
                        <DeleteIcon className={classes.rightIcon}/>

                    </DeleteButton>
                    <br/>
                    <br/>
                    <Card className={classes.card}>
                        <CardContent>
                            <h2>Field Detail</h2>
                            <br/>
                            <p><b>Field ID: </b>{field_id}</p>

                            <p><b>Field Name: </b>{field_name}</p>

                            <p><b>Type: </b>{type}</p>

                            <p><b>Length: </b>{length}</p>

                            <p><b>Decimal Point: </b>{decimal_point}</p>

                            <p><b>Thai Character: </b>{thai_character}</p>

                            <p><b>Description: </b>{description}</p>

                            <p><b>Remarks : </b>{remarks}</p>

                            <p><b>Generated By: </b>{generated_by}</p>
                            <p><b>Send to EDW: </b>{send_to_edw}</p>
                            <br/>


                        </CardContent>
                    </Card>
                    <br/>
                    <Button onClick={this.exportEventInFieldRelationData} variant="contained" size="large"
                            color="primary">
                        <DownloadIcon/>
                    </Button>
                    <br/>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={this.state.title}

                            data={!this.state.eventData.length === 0 ? []
                                :
                                this.state.eventData.map(item => {
                                    return [
                                        item.event_code,
                                        item.sub_event_code,
                                        item.event_name_en,
                                        item.event_name_th,
                                        item.description,
                                        item.send_to_prm,
                                        item.send_to_gl,
                                        item.send_to_edw,
                                        item.profile_flag,
                                        item.splunk_flag,
                                        item.event_bus_flag,
                                        item.endpoints,

                                    ]
                                })
                            }

                            columns={this.columns}
                            options={options}

                        />
                    </MuiThemeProvider>
                </LoadingOverlay>
            </div>

        )
    }
}

FieldDetailContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FieldDetailContainer);

