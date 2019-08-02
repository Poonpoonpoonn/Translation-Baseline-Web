import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import {TABLE_OF_CONTENT_INDEX} from '../Constants.js'
import Typography from "@material-ui/core/Typography";
import MuiTreeView from 'material-ui-treeview';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from '@material-ui/core/TextField';
import Select from "react-select";
import Input from '@material-ui/core/Input';
import ListItem from '@material-ui/core/ListItem';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import {QUERY_EVENT_SUMMARY_API} from "../Constants";
import TOCAddDialog from './TOCAddDialog';
import axios from 'axios';
import TableOfContentTable from './TableOfContentTable.jsx'; 


/*
2019-07-26 EM   :   Added 'ADD','EDIT' function and link to endpoints. 
                    Change dropdown fields into free text. Added 4 more fields; flow, channel, screen and task.       
2019-07-27 PJ   :   Imported TableOfContentTable.jsx
                    Added table of content table and search function into the render part
*/


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        minWidth: "100%",
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: "50%",
    },
    dense: {
        marginTop: 19,
    },
    margin: {
        margin: theme.spacing.unit,
    },

    //content Poon
    contentMain: {
        position: 'static',
        width: '100%',
        height: '70vh',
        overflow: 'scroll',
        display: 'grid',
        gridTemplateColumns: 'auto 3rem 3rem 3rem'
    },
    contentColumn: {
        position: 'relative',
        width: '50%'
    },
    contentHeader: {
        position: 'static',
        backgroundColor: '#ebf2fc',
        width: '100%',
        display: 'grid',
        gridTemplateRows: '3em',
        //gridRowGap: '10px',
        //borderBottomStyle: 'solid'
        borderBottom: '2px solid #888888'
    },
    contentTableofContent: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',
        paddingLeft: '20px'

    },
    dropdownStyle: {
        borderBottom: '1px solid #888888',
        height: '1.5em',
        width: '170px'
    },
    selected: {
        '&:focus': {
            backgroundColor: 'red',
        },
    },
});


class TableOfContentContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            renameOpen: false,
            screenName: "",
            inline: false,
            selectedNode: "",
            nodeName: "",
            search : "",
            students:[],
            filtered: [],
        }
        this.handleChange = this.handleChange.bind(this);
    }
  


        componentDidMount() {
            this.props.highlightTabMenu(TABLE_OF_CONTENT_INDEX)
            this.queryTable()

            //Retrieve value from Backend and sorting data
            axios
            .get('/v1/translation/maintable')
            .then(response => {
                if (response.status === 200) {
                return response;
                } else {
                throw new Error(response.statusText);
                }
            })
            .then(resp => {
                const displaydata = resp.data.map(students => ({
                    project: students.project_name,
                    flow: students.flow_name,
                    channel: students.epic_name,
                    screen: students.screen_name,
                }));

                this.setState({ students: displaydata, filtered: displaydata });
            })
            .catch(error => {
                this.setState({ error, isLoading: false, students: [], filtered: [] });
            });
        }

        //handle dialog
        handleScreenClickOpen = () => {
            this.setState({open: true});
        };
        handleScreenClose = () => {
            this.setState({open: false});
        };
        handleScreenDone = async screenInfo => {
            this.handleScreenClose();
            const response = await axios.post(`/v1/translation/tableofcontent`, screenInfo);
        };
        handleRenameClickOpen = () => {
            this.setState({renameOpen: true});
           
        };
        handleRenameClose = () => {
            this.setState({renameOpen: false});
        };
    
    
        //handle drop
        handleProjectDrop = (value) => {
            this.setState({selectedProject: value});
        };

        handleFlowDrop = (value) => {
            this.setState({selectedFlow: value});
        };

        handleChannelDrop = (value) => {
            this.setState({selectedChannel: value});
        };
        handleName = (value) => {
            this.setState({screenName: value});
        };
        handleLeafClick = (value) => {
            this.setState({selectedNode: value});
        };
  

        //handle search filter
        handleChange(e) {
            const currentList = this.state.students;
            let newList = [];
            
            if (e.target.value !== "" && currentList.length>0) {
                const text = e.target.value.toLowerCase();
                newList = currentList.filter(item =>
                    Object.keys(item).some(key => {   
                        if (typeof item[key] !== 'string') return false;                     
                        const lc = item[key].toLowerCase();
                        return lc.includes(text);
                    })
                );
            } 
            else {
                newList = currentList;
            } 
            this.setState({
            filtered: newList, search: e.target.value
            });
        }

    //// TEST
    queryTable = () => {

        fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "GET",

        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot get data")
                    throw new Error(response.status);
                }
            }).then(data => {
            if (this.isMount) {

                this.setState({
                    data: data.data,
                    loading: false
                })
            }
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false
            })
        });
    }



    render() {
        const {classes} = this.props;
        const {filtered, search} = this.state;
        return (
            <main className={classNames(classes.content)}>
            
                    {/*new screen button and popup*/}
                    <div>
                        <IconButton aria-label="Add Screen" onClick={this.handleScreenClickOpen}>
                            <SvgIcon>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="folder-plus"
                                     className="svg-inline--fa fa-folder-plus fa-w-16" role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="currentColor"
                                          d="M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48zm-96 168c0 8.84-7.16 16-16 16h-72v72c0 8.84-7.16 16-16 16h-16c-8.84 0-16-7.16-16-16v-72h-72c-8.84 0-16-7.16-16-16v-16c0-8.84 7.16-16 16-16h72v-72c0-8.84 7.16-16 16-16h16c8.84 0 16 7.16 16 16v72h72c8.84 0 16 7.16 16 16v16z"></path>
                                </svg>
                            </SvgIcon>
                            
                        </IconButton>
                    </div>
                    <div>
                        <IconButton aria-label="Rename" onClick={this.handleRenameClickOpen}>
                            <SvgIcon>
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit"
                                     className="svg-inline--fa fa-edit fa-w-18" role="img"
                                     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                    <path fill="currentColor"
                                          d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                                </svg>
                            </SvgIcon>
                        </IconButton>
                    </div>
            
                <TOCAddDialog 
                    open={this.state.open} 
                    onCancel={this.handleScreenClose} 
                    onDone={this.handleScreenDone}
                />
                {/*rename button and popup*/}
                <Dialog open={this.state.renameOpen} onClose={this.handleRenameClose}
                        aria-labelledby="alert-dialog-title"
                        style={{}}>
                    <DialogTitle id="alert-dialog-title">{"Editing Node: " + this.selectedNode}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-name"
                                           style={{gridTemplateColumns: '10rem auto', display: 'grid'}}>
                            <div>Name</div>
                            <Input id="screen-name" type="text" inputProps={{step: '300'}}
                                   onChange={value => this.handleName(value)}/>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRenameClose} color="primary" autoFocus>
                            Cancel
                        </Button>
                        <Button onClick={this.handleRenameClose} color="primary" autoFocus>
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
                
                <div>
                    <input value={search} onChange={this.handleChange}  type="text" className="input" placeholder="Search..." ref="filterTextInput" />
                    <TableOfContentTable data={filtered} />
                </div>
            </main>
        );
    }
}

TableOfContentContainer
    .propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)

(
    TableOfContentContainer
)
;
