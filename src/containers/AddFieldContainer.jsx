import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {
  ADD_FIELD_API,
  ADD_FIELD_INDEX,
  DEV2,
  DEV3,
  DEV4,
  DEV5,
  EDIT_FIELD_API,
  QUERY_EVENTS_IN_FIELD_RELATIONS_API
} from '../Constants.js'
import Radio from '@material-ui/core/Radio';
import MenuList from '../components/MenuList.jsx';
import queryString from 'query-string'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoadingOverlay from 'react-loading-overlay';
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

const menus = [
    'VARCHAR',
    'INTEGER',
    'STRING',
    'DATETIME',
    'DATE',
    'DECIMAL',
    'DECIMAL(7,2)',
    'DECIMAL(15,2)',
    'DECIMAL(21,2)',
    'DECIMAL(7,4)',
];

class AddFieldContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "Add New Field",
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
            loading: false,
            showAlert: false,
            alertType: "",
            alertTitle: "",
            alertMessage: "",
            openDialog: false,
            devTask: "",
            devTaskError: false,
            descriptionError: false,
            dev2Checked: false,
            dev3Checked: false,
            dev4Checked: false,
            dev5Checked: false,
            fieldName: "",
            fieldNameError: false,
            type: "VARCHAR",
            length: "",
            lengthError: false,
            decimalPoint: "",
            thaiCharacter: "Y",
            description: "",
            sampleData: "",
            remarks: "",
            generatedBy: "S",
            sendToEDW: "Y",
            epicName: "",
            epicNameError: false,
        };

    }

    componentDidMount() {
        this.isMount = true
        const values = queryString.parse(this.props.location.search)

        this.props.highlightTabMenu(ADD_FIELD_INDEX)
        if (this.props.env == DEV2) {
            this.setState({
                dev2Checked: true
            })
        } else if (this.props.env == DEV3) {
            this.setState({
                dev3Checked: true
            })
        } else if (this.props.env == DEV4) {
            this.setState({
                dev4Checked: true
            })
        } else if (this.props.env == DEV5) {
            this.setState({
                dev5Checked: true
            })
        }

        if (values.fieldId !== undefined) {
            this.setState({
                title: "Edit Field"
            })
            this.queryFieldRelations()
        } else {
            this.setState({
                title: "Add New Field"
            })
        }
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
            console.log("field data ", data.fieldData[0])
            this.setState({
                fieldName: data.fieldData[0].field_name,
                type: data.fieldData[0].type,
                length: data.fieldData[0].length,
                decimalPoint: data.fieldData[0].decimal_point,
                thaiCharacter: data.fieldData[0].thai_char,
                description: data.fieldData[0].description,
                sampleData: data.fieldData[0].sample_data,
                remarks: data.fieldData[0].remarks,
                generatedBy: data.fieldData[0].generated_by,
                sendToEDW: data.fieldData[0].send_to_edw,
                title: "Edit Field: " + data.fieldData[0].field_name,
                loading: false
            })
            console.log("check field data ", data.fieldData)

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

    handleCheck = (e) => {
        const name = e.target.name;
        const isChecked = e.target.checked;
        console.log("name of check ", name, ' ', isChecked)
        if (name == DEV2) {
            this.setState({
                dev2Checked: isChecked,
            })
        } else if (name == DEV3) {

            this.setState({
                dev3Checked: isChecked,

            })
        } else if (name == DEV4) {

            this.setState({
                dev4Checked: isChecked,

            })
        } else if (name == DEV5) {

            this.setState({
                dev5Checked: isChecked,

            })
        }

    }

    handleChange = name => event => {
        console.log("event target ", event.target.name, ' ', event.target.value)
        this.setState({[event.target.name]: event.target.value});

    };
    validateInput = () => {
        let validated = true
        if (this.state.fieldName === "") {
            validated = false
            this.setState({
                fieldNameError: true
            })
        } else {
            if (this.state.fieldNameError) {
                this.setState({
                    fieldNameError: false
                })
            }
        }
        if (this.state.type === "") {
            validated = false
            this.setState({
                typeError: true
            })
        } else {
            if (this.state.typeError) {
                this.setState({
                    typeError: false
                })
            }
        }
        if (this.state.length === "") {
            validated = false
            this.setState({
                lengthError: true
            })
        } else {
            if (this.state.lengthError) {
                this.setState({
                    lengthError: false
                })
            }
        }
        // if(this.state.decimalPoint === ""){
        //     validated = false
        //     this.setState({
        //       decimalPointError:true
        //     })
        // }
        // else{
        //   if(this.state.decimalPointError){
        //     this.setState({
        //       decimalPointError: false
        //     })
        //   }
        // }
        if (this.state.thaiCharacter === "") {
            validated = false
            this.setState({
                thaiCharacterError: true
            })
        } else {
            if (this.state.thaiCharacterError) {
                this.setState({
                    thaiCharacterError: false
                })
            }
        }
        if (this.state.generatedBy === "") {
            validated = false
            this.setState({
                generatedByError: true
            })
        } else {
            if (this.state.generatedByError) {
                this.setState({
                    generatedByError: false
                })
            }
        }
        if (this.state.sendToEDW === "") {
            validated = false
            this.setState({
                sendToEDWError: true
            })
        } else {
            if (this.state.sendToEDWError) {
                this.setState({
                    sendToEDWError: false
                })
            }
        }
        return validated
    }

    selectMenu = (index) => {
        console.log("select menu index ", index)
        this.setState({
            type: menus[index]
        })
    }

    handleClose = () => {
        this.setState({
            openDialog: false,
            epicNameError: false,
            devTaskError: false
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
                timeout: 10000,
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
                timeout: 10000,
                offset: 100
            });
        } else if (type === "partial") {
            Alert.warning(message, {
                position: 'top-right',
                effect: 'flip',
                onShow: function () {
                    console.log('aye!')
                },
                beep: false,
                timeout: 10000,
                offset: 100
            });
        }
    }
    handleSave = () => {


        var passValidation = this.validateInput()
        if (passValidation) {
            if (!this.state.openDialog) {
                this.setState({
                    openDialog: true
                })
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
                openDialog: false,
                loading: true,
            })

            var envList = []

            if (this.state.dev2Checked) {
                envList.push(DEV2)
            }
            if (this.state.dev3Checked) {
                envList.push(DEV3)
            }
            if (this.state.dev4Checked) {
                envList.push(DEV4)
            }
            if (this.state.dev5Checked) {
                envList.push(DEV5)
            }

            const reqObj = {
                "field_name": this.state.fieldName,
                "type": this.state.type,
                "length": this.state.length,
                "decimal_point": this.state.decimalPoint,
                "thai_char": this.state.thaiCharacter,
                "description": this.state.description,
                "sample_data": this.state.sampleData,
                "remarks": this.state.remarks,
                "generated_by": this.state.generatedBy,
                "send_to_edw": this.state.sendToEDW,

            }
            const values = queryString.parse(this.props.location.search)
            if (values.fieldId !== undefined) {

                fetch(EDIT_FIELD_API + "?env=" + this.props.env, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "env": envList,
                        "fieldObj": reqObj,
                        "fieldId": values.fieldId,
                        "epicName": this.state.epicName,
                        "devTask": this.state.devTask,
                        "username": this.props.username,
                    })
                })
                    .then(response => {
                        return response.json()
                    }).then(data => {
                    if (this.isMount) {
                        this.setState({
                            loading: false,

                        })
                        this.showAlert(data.status == 200 ? "success" : data.status == 424 ? "failed" : data.status == 207 ? "partial" : "failed", data.result)
                    }
                }).catch((error) => {

                    this.setState({
                        loading: false,

                    })
                    this.showAlert("failed", error.message)
                });
            } else {
                fetch(ADD_FIELD_API + "?env=" + this.props.env, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "env": envList,
                        "username": this.props.username,
                        "fieldObj": reqObj,
                        "epicName": this.state.epicName,
                        "devTask": this.state.devTask,
                    })
                })
                    .then(response => {
                        return response.json()
                    }).then(data => {
                    if (this.isMount) {
                        this.setState({
                            loading: false,
                            showAlert: true,
                            alertType: "success",
                            alertTitle: "Success!",
                            alertMessage: "Successfully Add New Field"

                        })
                        this.showAlert(data.status == 200 ? "success" : data.status == 424 ? "failed" : data.status == 207 ? "partial" : "failed", data.result)
                    }
                }).catch((error) => {

                    this.setState({
                        loading: false,
                        showAlert: true,
                        alertType: "error",
                        alertTitle: "Error!",
                        alertMessage: "Cannot Add Field, Please try again. " + error.message
                    })
                    this.showAlert("failed", error.message)
                });
            }
        } else {

        }

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
                    <Dialog
                        open={this.state.openDialog}
                        onClose={this.handleClose}
                        aria-labelledby="form-dialog-title"
                        maxWidth="sm"
                        fullWidth={true}
                    >
                        <DialogTitle id="form-dialog-title">Submit your description to save this Event & Field
                            Relation </DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                error={this.state.epicNameError}
                                margin="dense"
                                id="description"
                                label="Description"
                                name="epicName"
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
                                name="devTask"
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
                            <Button variant="contained" onClick={this.handleSave} color="secondary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <form className={classes.container} noValidate autoComplete="off">
                        <br/>
                        <h1>{this.state.title}</h1>
                        <br/>

                        <Card className={classes.card}>

                            <CardContent>
                                <h3><br/>&nbsp; Select environments that you want to apply changes to</h3>
                                <label>

                                    <Checkbox
                                        name={DEV2}
                                        checked={this.state.dev2Checked}
                                        onChange={this.handleCheck}
                                    />
                                    <span>{DEV2}</span>
                                </label>
                                <label>
                                    <Checkbox
                                        name={DEV3}
                                        checked={this.state.dev3Checked}
                                        onChange={this.handleCheck}
                                    />
                                    <span>{DEV3}</span>
                                </label>
                                <label>
                                    <Checkbox
                                        name={DEV4}
                                        checked={this.state.dev4Checked}
                                        onChange={this.handleCheck}
                                    />
                                    <span>{DEV4}</span>
                                </label>
                                <label>
                                    <Checkbox
                                        name={DEV5}
                                        checked={this.state.dev5Checked}
                                        onChange={this.handleCheck}
                                    />
                                    <span>{DEV5}</span>
                                </label>
                                <br/>
                                <TextField
                                    required
                                    error={this.state.fieldNameError}
                                    id="fieldName"
                                    name="fieldName"
                                    label="Field Name"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.fieldName}
                                    onChange={this.handleChange('fieldName')}
                                    margin="normal"
                                />
                                {this.state.fieldNameError && <FormHelperText>This is required!</FormHelperText>}
                                <br/>
                                <h4>Type <span style={{color: "red"}}>* &#9;</span></h4>
                                <MenuList menus={menus} selectMenu={this.selectMenu}/>


                                <TextField
                                    required
                                    error={this.state.lengthError}
                                    id="length"
                                    name="length"
                                    label="Length"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.length}
                                    onChange={this.handleChange('length')}
                                    margin="normal"
                                />
                                {this.state.lengthError && <FormHelperText>This is required!</FormHelperText>}

                                <TextField


                                    id="decimalPoint"
                                    name="decimalPoint"
                                    label="Decimal Point"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.decimalPoint}
                                    onChange={this.handleChange('decimalPoint')}
                                    margin="normal"
                                />

                                <br/>

                                <h4>Thai Character <span style={{color: "red"}}>* &#9;</span></h4>

                                <Radio
                                    checked={this.state.thaiCharacter === 'Y'}
                                    onChange={this.handleChange('thaiCharacter')}
                                    value="Y"
                                    name="thaiCharacter"
                                    inputProps={{'aria-label': 'Allowed'}}
                                />
                                <label>Allowed</label>
                                <Radio
                                    checked={this.state.thaiCharacter === 'N'}
                                    onChange={this.handleChange('thaiCharacter')}
                                    value="N"
                                    name="thaiCharacter"
                                    inputProps={{'aria-label': 'Not Allowed'}}
                                />
                                <label>Not Allowed</label>
                                <br/>
                                <TextField

                                    id="description"
                                    name="description"
                                    label="Description"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.description}
                                    onChange={this.handleChange('description')}
                                    margin="normal"
                                />


                                <TextField

                                    id="sampleData"
                                    name="sampleData"
                                    label="Sample Data"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.sampleData}
                                    onChange={this.handleChange('sampleData')}
                                    margin="normal"
                                />

                                <TextField

                                    id="remarks"
                                    name="remarks"
                                    label="Remarks"
                                    variant="outlined"
                                    className={classes.textField}
                                    value={this.state.remarks}
                                    onChange={this.handleChange('remarks')}
                                    margin="normal"
                                />
                                <br/>

                                <h4>Generated By<span style={{color: "red"}}>&#9;*</span></h4>

                                <Radio
                                    checked={this.state.generatedBy == 'S'}
                                    onChange={this.handleChange('generatedBy')}
                                    value="S"
                                    name="generatedBy"
                                    inputProps={{'aria-label': 'System'}}
                                />
                                <label>System</label>

                                <Radio
                                    checked={this.state.generatedBy == 'U'}
                                    onChange={this.handleChange('generatedBy')}
                                    value="U"
                                    name="generatedBy"
                                    inputProps={{'aria-label': "User's Input"}}
                                />
                                <label>User's Input</label>

                                <Radio
                                    checked={this.state.generatedBy != 'S' && this.state.generatedBy != 'U' && this.state.generatedBy != ""}
                                    onChange={this.handleChange('generatedBy')}
                                    value="O"
                                    name="generatedBy"
                                    inputProps={{'aria-label': "Other Field's Value eg. DEVICE_ID"}}
                                />
                                <label>Other Field's Value eg. DEVICE_ID </label>

                                <br/>

                                <h4>Send To EDW<span style={{color: "red"}}>&#9;*</span></h4>

                                <Radio
                                    checked={this.state.sendToEDW === 'Y'}
                                    onChange={this.handleChange('sendToEDW')}
                                    value="Y"
                                    name="sendToEDW"
                                    inputProps={{'aria-label': 'Send To EDW'}}
                                />
                                <label>Yes</label>

                                <Radio
                                    checked={this.state.sendToEDW === 'N'}
                                    onChange={this.handleChange('sendToEDW')}
                                    value="N"
                                    name="sendToEDW"
                                    inputProps={{'aria-label': 'Send To EDW'}}
                                />
                                <label>No</label>

                                <br/>

                            </CardContent>
                            <CardActions>
                                <Button onClick={this.handleSave} variant="contained" size="large" color="primary"
                                        className={classes.margin}>
                                    Save
                                </Button>
                            </CardActions>
                        </Card>
                    </form>
                </LoadingOverlay>
            </div>

        );
    }
}

AddFieldContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddFieldContainer);
