import React, {PureComponent} from 'react';
import ReactDataSheet from 'react-datasheet';
// Be sure to include styles at some point, probably during your bootstrapping
import 'react-datasheet/lib/react-datasheet.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {withStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/AddCircle';
import SaveIcon from '@material-ui/icons/Save';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import LoadingOverlay from 'react-loading-overlay';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import renderHTML from 'react-render-html';

import {DEV2, DEV3, DEV4, DEV5, EDIT_EVENT_FIELD_API} from '../Constants.js'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        minWidth: "100%",
    },
    button: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
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
    },
    rightIcon: {
        marginLeft: theme.spacing(1),
    },
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

const AddButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(green[600]),
        backgroundColor: green[600],
        '&:hover': {
            backgroundColor: green[800],
        },
    },
}))(Button);

const SaveButton = withStyles(theme => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[800],
        },
    },
}))(Button);


const CellRenderer = props => {
    const {
        as: Tag, cell, row, col, columns, attributesRenderer,
        selected, editing, updated, style,
        ...rest
    } = props


    const attributes = cell.attributes || {}

    attributes.style = {textAlign: "center", fontSize: "1.5vw"}
    return (
        <Tag {...rest} {...attributes}>
            {props.children}
        </Tag>
    )
}

var rowCount = 1
var selectedRows = null


class CustomEditor extends PureComponent {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {

        this._input.focus()
    }

    handleChange(e) {
        this.props.onChange(e.target.value)
    }

    render() {
        const {value, onKeyDown} = this.props
        return (
            <input
                ref={input => {
                    this._input = input
                }}
                type='textfield'
                className='data-editor'

                style={{fontSize: "1.5vw", width: "100%", height: "100%"}}
                value={value}
                onChange={this.handleChange}
                onKeyDown={onKeyDown}

            />
        )
    }
}


class SpreadSheetContainer extends React.Component {

    constructor(props) {
        super(props)
        this.cellRenderer = this.cellRenderer.bind(this)
        let data = []
        for (let i = 1; i < 11; i++) {
            data.push(this.createDataSet(i))
        }
        this.state = {

            columns: [
                "Event Code",
                "Sub Event Code",
                "Field",
                "Mandatory",
                "Value",
                "Generated By",
                "Send To EDW"
            ],
            selected: {start: null, end: null},
            data: data,
            loading: false,
            openDialog: false,
            showAlert: false,
            alertType: "",
            alertTitle: "",
            alertMessage: "",
            devTask: "",
            devTaskError: false,
            dev2Checked: false,
            dev3Checked: false,
            dev4Checked: false,
            dev5Checked: false,
            epicName: "",
            epicNameError: false,
            resultHtmlText: "<div/>"
        }
    }

    componentDidMount() {
        this.isMount = true
        // this.props.highlightTabMenu(TABLE_MAPPING_INDEX)
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
    }


    createDataSet = (index) => {
        let set = [{readOnly: true, "value": index},
            {"value": "", "key": "Event Code", "overflow": "nowrap", "dataEditor": CustomEditor},
            {"value": "", "key": "Sub Event Code", "overflow": "nowrap", "dataEditor": CustomEditor},
            {"value": "", "key": "Field", "overflow": "nowrap", "dataEditor": CustomEditor},
            {"value": "", "key": "Mandatory", "overflow": "nowrap", "dataEditor": CustomEditor},
            {"value": "", "key": "Value", "overflow": "nowrap", "dataEditor": CustomEditor},
            {"value": "", "key": "Generated By", "overflow": "nowrap", "dataEditor": CustomEditor},
            {"value": "", "key": "Send To EDW", "overflow": "nowrap", "dataEditor": CustomEditor}]
        return set
    }

    handleChange = value => event => {
        console.log("check epicName yoyo ", event.target.value, ' ', [value])
        this.setState({[value]: event.target.value});
    };

    cellRenderer(props) {
        return <CellRenderer as='td' {...props} />
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
    onSelect = (start, end) => {

        selectedRows = start
    }
    addRow = () => {
        let grid = this.state.data.map(row => [...row])
        rowCount = grid.length + 1
        grid.push(this.createDataSet(rowCount))

        this.setState({
            data: grid
        })
    }
    handleClose = () => {
        this.setState({openDialog: false});
    }

    deleteRow = () => {
        if (selectedRows !== null || selectedRows !== undefined) {
            let grid = this.state.data
            if ((selectedRows.start.i === 0 && grid.length === 1) || (selectedRows.start.i === 0 && selectedRows.end.i === grid.length - 1)) {
                return
            }
            if (selectedRows.start.i > selectedRows.end.i) {
                const tempRow = selectedRows
                selectedRows.start.i = tempRow.end.i
                selectedRows.end.i = tempRow.start.i
            }
            var filtered = grid.filter(function (value, index, arr) {

                return index < selectedRows.start.i || index > selectedRows.end.i

            });
            for (let i = 0; i < filtered.length; i++) {
                filtered[i][0].value = i + 1
            }
            rowCount = grid.length + 1

            selectedRows = []
            this.setState({
                data: filtered
            })
        }
    }
    removeEmptySet = (value) => {

        let filtered = []

        for (let i = 0; i < value.length; i++) {

            let empty = false
            for (let j = 1; j < value[i].length; j++) {
                console.log("checking value obj ", value[i][j])
                if (value[i][j].value === "") {
                    empty = true
                    break;
                } else {
                    empty = false
                    if (value[i][j].key === "Field") {
                        value[i][j].value = value[i][j].value.toUpperCase()
                    }
                    // break;
                }
            }
            if (!empty) {

                filtered.push(value[i])
            }
        }

        return filtered

    }
    inputValidation = (rows) => {

        if (rows.length) {
            for (let i = 0; i < rows.length; i++) {
                for (let j = 1; j < rows[i].length; j++) {
                    if (rows[i][j].value === "") {
                        return false
                    }
                }
            }
        } else { // case of data is empty

            return false
        }
        return true
    }

    handleSave = () => {
        let rows = this.removeEmptySet(this.state.data)
        console.log("showing filtered row ", rows)
        const passValidation = this.inputValidation(rows)

        if (passValidation) {
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
                openDialog: false,
                loading: true
            });


            let envList = []

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

            console.log("checking user epicName ", envList)
            fetch(EDIT_EVENT_FIELD_API + "?env=" + this.props.env, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "env": envList,
                    "relationObj": rows,
                    "epicName": this.state.epicName,
                    "devTask": this.state.devTask,
                    "username": this.props.username
                })
            })
                .then(response => {
                    return response.json()
                }).then(data => {

                if (this.isMount) {

                    this.setState({
                        loading: false,
                        resultHtmlText: data.htmlText
                    })
                    console.log("checking data html", data.htmlText)

                    this.showAlert(data.status == 200 ? "success" : data.status == 424 ? "failed" : data.status == 207 ? "partial" : "failed", data.result)
                }
            }).catch((error) => {
                console.log('error: ' + error);
                this.setState({
                    loading: false

                })
                this.showAlert("failed", error.message)
            });
        } else {
            console.log("did not pass")
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
                        <DialogTitle id="form-dialog-title">Submit your epicName to save this Event & Field
                            Relation </DialogTitle>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                error={this.state.epicNameError}
                                margin="dense"
                                id="epicName"
                                label="epicName"
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
                            <Button variant="contained" onClick={this.handleSave} color="secondary">
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>


                    <h2>Update Event & Field Relationship</h2>
                    <SaveButton className={classes.button} onClick={this.handleSave} variant="contained" size="large">
                        Save
                        <SaveIcon className={classes.rightIcon}/>
                    </SaveButton>
                    <br/>
                    <br/>
                    <Card className={classes.card}>
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

                        {" "}
                        <AddButton className={classes.button} onClick={this.addRow} variant="contained" size="large">
                            New row
                            <AddIcon className={classes.rightIcon}/>
                        </AddButton>
                        {"  "}
                        <DeleteButton className={classes.button} onClick={this.deleteRow} variant="contained"
                                      size="large">
                            Delete Row
                            <DeleteIcon className={classes.rightIcon}/>

                        </DeleteButton>


                        <CardContent>
                            <ReactDataSheet
                                data={this.state.data}
                                sheetRenderer={props => (
                                    <table className={props.className} style={{position: "relative", width: "100%"}}>

                                        <thead>
                                        <tr>
                                            <th/>
                                            {this.state.columns.map(col => (

                                                <th key={col} style={{
                                                    textAlign: "center",
                                                    backgroundColor: "rgb(245,245, 245)",
                                                    border: '1px solid black'
                                                }}>
                                                    <p style={{fontSize: "1.5vw"}}> {col}</p>

                                                </th>
                                            ))}
                                        </tr>
                                        </thead>
                                        <tbody>{props.children}</tbody>
                                    </table>
                                )}

                                onSelect={this.onSelect}
                                cellRenderer={this.cellRenderer}
                                valueRenderer={(cell) => cell.value}
                                onCellsChanged={changes => {
                                    const grid = this.state.data.map(row => [...row])
                                    changes.forEach(({cell, row, col, value}) => {
                                        grid[row][col] = {...grid[row][col], value}
                                        this.setState({
                                            data: grid
                                        })

                                    })
                                }}
                            />
                        </CardContent>
                    </Card>
                    <div>
                        {renderHTML(this.state.resultHtmlText)}
                    </div>

                </LoadingOverlay>
            </div>
        )
    }
}

export default withStyles(styles)(SpreadSheetContainer);