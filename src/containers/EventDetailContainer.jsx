import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import pink from 'material-ui/colors/pink';
import queryString from 'query-string'
import {
    DELETE_EVENT_API,
    DELETE_EVENT_FIELD_API,
    EVENT_TABLE_INDEX,
    EXPORT_DATA_API,
    QUERY_FIELDS_IN_EVENT_RELATIONS_API
} from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import fileSaver from 'file-saver'
import DownloadIcon from '@material-ui/icons/CloudDownloadRounded';
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


class EventDetailContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "Field Details",
            eventData: [{
                event_code: "",
                sub_event_code: "",
                event_name_en: "",
                event_name_th: "",
                send_to_prm: "",
                send_to_gl: "",
                send_to_edw: "",
                description: "",
                endpoints: ""
            }],
            row: 25,
            fieldData: [],
            loading: true,
            openDialog: false,
            showAlert: false,
            alertType: "",
            alertTitle: "",
            alertMessage: "",
            epicName: "",
            epicNameError: false,
            devTask: "",
            devTaskError: false,
            isDeletingRelation: false

        }
        this.columns = [
            {
                name: "Delete",
                options: {
                    filter: false,
                    sort: false,
                    empty: true,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        //   console.log("value ",value,' ',tableMeta)
                        const rowData = tableMeta
                        return (
                            <Button variant="contained" color="primary" size="small"
                                    onClick={() => this.handleDeleteFieldRelation(rowData)}>
                                <DeleteIcon/>
                            </Button>
                        );
                    }
                }
            },
            {
                name: "field_id",
                label: "Field ID",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                name: "field_name",
                label: "Field Name",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                name: "generator_value",
                label: "Value",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                name: "send_to_edw",
                label: "Send To EDW",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                name: "generated_by",
                label: "Generated By",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
        ]
        // this.columns = [
        //     {
        //         name: "View Detail",
        //         options: {
        //           filter: false,
        //           sort: false,
        //           empty: true,
        //           customBodyRender: (value, tableMeta, updateValue) => {
        //             //   console.log("value ",value,' ',tableMeta)
        //                const rowData = tableMeta
        //             return (
        //                 <Button variant="contained" color="primary" size="small" onClick={ () => this.handleDeleteFieldRelation(rowData)}>
        //                     <DeleteIcon/>
        //                 </Button>
        //             );
        //           }
        //         }
        //     },
        //     {
        //         name: "field_id",
        //         label: "Field ID",
        //         options: {
        //             filter: true,
        //             // filterType: 'textField',
        //             // sort: true,

        //         }
        //     },
        //     {
        //         name: "field_name",
        //         label: "Field Name",
        //         options: {
        //             filter: true,
        //             // filterType: 'textField',
        //             // sort: true,

        //         }
        //     },
        //     {
        //         name: "type",
        //         label: "Type",

        //         options: {
        //             filter: true,
        //             // filterType: 'textField',
        //             //  sort: true,
        //         }
        //     },
        //     {
        //         name: "length",
        //         label: "Length",

        //         options: {
        //             filter: true,
        //         }
        //     },
        //     {
        //         name: "decimalPoint",
        //         label: "Decimal Point",

        //         options: {
        //             filter: true,
        //         }
        //     },
        //     {
        //         name: "thaiChar",
        //         label: "Thai Char",

        //         options: {
        //             filter: true,
        //         }
        //     },
        //     {
        //         name: "description",
        //         label: "Description",

        //         options: {
        //             filter: true,
        //         }
        //     },
        //     {
        //         name: "sampleData",
        //         label: "Sample Data",

        //         options: {
        //             filter: true,
        //         }
        //     },
        //     {
        //         name: "remarks",
        //         label: "Remarks",

        //         options: {
        //             filter: true,
        //         }
        //     },
        //     {
        //         name: "generatedBy",
        //         label: "Generated By",

        //         options: {
        //             filter: true,
        //         }
        //     },
        //     {
        //         name: "sendToEDW",
        //         label: "Send To EDW",

        //         options: {
        //             filter: true,
        //         }
        //     },
        // ];


    }

    exportFieldInEventRelationData = () => {
        this.setState({
            loading: true
        })
        const values = queryString.parse(this.props.location.search)
        axios.post(EXPORT_DATA_API, {
            "tableType": "fieldInEventRelation",
            "env": this.props.env,
            "eventCode": values.eventCode,
            "subEventCode": values.subEventCode
        }, {responseType: 'arraybuffer'})
            .then((response) => {
                var blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                fileSaver.saveAs(blob, "Fields_In_" + values.eventCode + "_" + values.subEventCode + '.xlsx');
                this.setState({
                    loading: false
                })
                this.showAlert("success", "Successfully Export File")
            });
    }

    handleDeleteFieldRelation = (data) => {
        console.log("what is data? ", data, ' ', data === undefined, ' ', data === null)
        if (!this.state.openDialog) {
            this.setState({
                openDialog: true,
                isDeletingRelation: true,
                deleteRowData: data
            });
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
        const values = queryString.parse(this.props.location.search)
        console.log("delete event field ", this.props.username)
        fetch(DELETE_EVENT_FIELD_API + "?env=" + this.props.env, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "eventCode": values.eventCode,
                "subEventCode": values.subEventCode,
                "epicName": this.state.epicName,
                "devTask": this.state.devTask,
                "username": this.props.username,
                "fieldId": data.rowData[1],
                "fieldName": data.rowData[2]
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot save delete field")
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
                this.queryEventRelations()
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
        });
    }

    queryEventRelations = () => {
        const values = queryString.parse(this.props.location.search)
        this.setState({
            loading: true
        })
        fetch(QUERY_FIELDS_IN_EVENT_RELATIONS_API + '?env=' + this.props.env + "&eventCode=" + values.eventCode + "&subEventCode=" + values.subEventCode, {
            method: "GET",

        })
            .then(response => {
                if (response.status === 200) {
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
        this.props.highlightTabMenu(EVENT_TABLE_INDEX)
        this.queryEventRelations()
    }

    componentWillUnmount() {
        this.isMount = false
    }

    handleClose = () => {
        this.setState({openDialog: false});
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
    editEvent = (data) => {
        console.log("row data ", data)
    }

    handleEdit = () => {
        this.props.history.push("add?eventCode=" + this.state.eventData[0]["event_code"] + "&subEventCode=" + this.state.eventData[0]["sub_event_code"])
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
        if (this.state.isDeletingRelation) {
            this.handleDeleteFieldRelation(this.state.deleteRowData)
            this.setState({
                isDeletingRelation: false
            })
            return;
        }

        // console.log("data is not null? ",data)
        // if(data){
        //   console.log("data is not null")
        //   this.deleteFieldRelation(data)
        // }
        // else{
        const values = queryString.parse(this.props.location.search)
        fetch(DELETE_EVENT_API + "?env=" + this.props.env, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "eventCode": values.eventCode,
                "subEventCode": values.subEventCode,
                "epicName": this.state.epicName,
                "devTask": this.state.devTask,
                "username": this.props.username,
            })
        })
            .then(response => {
                console.log("cannot save delete event new response ", response)
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot save delete event")
                    throw new Error(response.statusText);
                }
            }).then(data => {
            if (this.isMount) {

                this.setState({
                    loading: false,
                    showAlert: true,
                    alertType: "success",
                    alertTitle: "Success!",
                    alertMessage: "Successfully Delete Event"

                })
                this.showAlert("success", "Successfully Delete Event")
                this.props.history.replace("/eventsummary")
            }
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false,
                showAlert: true,
                alertType: "error",
                alertTitle: "Error!",
                alertMessage: "Cannot Delete Event, Please try again. " + error.message
            })
            this.showAlert("failed", "Cannot Delete Event, Please try again. " + error.message)
        });
        // }

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
    handleChange = value => event => {
        this.setState({[value]: event.target.value});
    };

    render() {
        const options = {
            //    filterType: 'checkbox',
            rowsPerPage: this.state.fieldData.length,
            rowsPerPageOptions: [25, 100, 150, this.state.fieldData.length],
            selectableRows: false,
            download: false,
            filterType: 'textField',
            print: false,
            responsive: 'scroll',
            rowHover: true,

            onChangeRowsPerPage: (row) => {
                this.setState({
                    row: row
                })
            },

        };

        const {classes} = this.props;
        const {event_code, sub_event_code, event_name_en, event_name_th, send_to_prm, send_to_gl, send_to_edw, description, endpoints} = this.state.eventData[0]
        console.log("display event data ", event_code)
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
                        <DialogTitle id="form-dialog-title">Submit your description to add new event </DialogTitle>
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
                        Delete
                        <DeleteIcon className={classes.rightIcon}/>

                    </DeleteButton>

                    <br/>
                    <br/>

                    <Card className={classes.card}>
                        <CardContent>
                            <h2>Event Detail</h2>
                            <br/>
                            <p><b>Event Code: </b>{event_code}</p>

                            <p><b>Sub Event Code: </b>{sub_event_code}</p>

                            <p><b>Event Name(EN): </b>{event_name_en}</p>

                            <p><b>Event Name(TH): </b>{event_name_th}</p>

                            <p><b>Send to PRM: </b>{send_to_prm}</p>

                            <p><b>Send to GL: </b>{send_to_gl}</p>

                            <p><b>Send to EDW: </b>{send_to_edw}</p>

                            <p><b>Description: </b>{description}</p>

                            <p><b>Endpoints: </b>{endpoints}</p>
                            <br/>


                        </CardContent>
                    </Card>
                    <br/>
                    <Button onClick={this.exportFieldInEventRelationData} variant="contained" size="large"
                            color="primary">
                        <DownloadIcon/>
                    </Button>
                    <br/>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <MUIDataTable
                            title={this.state.title}

                            data={!this.state.fieldData.length === 0 ? []
                                :
                                this.state.fieldData.map(item => {
                                    return [
                                        item.field_id,
                                        item.field_name,
                                        item.generator_value,
                                        // item.type,
                                        // item.length,
                                        // item.decimal_point,
                                        // item.thai_char,
                                        // item.description,
                                        // item.sample_data,
                                        // item.remarks,
                                        item.send_to_edw,
                                        item.generated_by,


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

EventDetailContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDetailContainer);

