import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Select from 'react-select';
import SpreadSheetIcon from '@material-ui/icons/ViewHeadlineTwoTone';
import AddVersionControlIcon from '@material-ui/icons/PlaylistAdd';
import VersionControlIcon from '@material-ui/icons/FeaturedPlayListRounded';
import AdminIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import TutorialIcon from '@material-ui/icons/LibraryBooksRounded';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/EventNoteRounded';
import FieldIcon from '@material-ui/icons/TextFieldsRounded';
import AddFieldIcon from '@material-ui/icons/AddCommentRounded';
import ImportExportIcon from '@material-ui/icons/ImportExportRounded';
import AddEventIcon from '@material-ui/icons/AddBoxRounded';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Route, Switch, Redirect} from 'react-router-dom';
import {
    ADD_EVENT_INDEX,
    ADD_FIELD_INDEX,
    ADD_VERSION_CONTROL_INDEX,
    EDIT_EVENT_FIELD_INDEX,
    EVENT_TABLE_INDEX,
    FIELD_TABLE_INDEX,
    IMPORT_EXPORT_INDEX,
    MANAGE_ADMIN_INDEX,
    TUTORIAL_INDEX,
    VERSION_CONTROL_INDEX,
    DEV2,
    DEV3,
    DEV4,
    DEV5,
    TRANSLATION_TABLE_INDEX,
    TABLE_OF_CONTENT_INDEX,
    AUDIT_LOG_INDEX,
    EXPORT_INDEX
} from '../Constants.js'
import EventSummaryContainer from './EventSummaryContainer.jsx';
import Input from '@material-ui/core/Input';
import EditImg from '../assets/pencil-edit-button (1).png';
import Dropdown from 'react-dropdown';
import Dialog from "@material-ui/core/Dialog";
//import Dropdown from 'react-bootstrap/Dropdown';


//add sidebar and dev data
import TableOfContentContainer from './TableOfContentContainer.jsx';
import TranslationBaselineContainer from './TranslationBaselineContainer.jsx';
import TranslationBaselineTableContainer from './TranslationBaselineTableContainer.jsx';

//import TranslationBaselineContainer from "./TranslationBaselineContainer";
//add sidebar and dev data

import ExportContainer from './ExportContainer';

const releaseMonthAndYear = "July 2019";
const epicNameVar = "Load request status tracking";
const epicVersion = "1";
const releaseVersion = "Jul 2019";
const parentPage = "10X";
const parentPageL2 = ["Consumer", "Business Owner"];
const flowName = 'This is screen name';
const pictureName = 'This is picture name';
const flowLocation = '10X/..../{Flow name}';

const projectOptions = [
    {value: '10x', label: '10X'},
    {value: 'easy', label: 'Fast Easy'},

];
const flowOptions = [
    {value: 'cons', label: 'Consumer'},
    {value: 'business', label: 'Business Owner'},

];
const channelOptions = [
    {value: 'app', label: 'Application'},
    {value: 'web', label: 'Web'},


];
const screenOptions = [
    {value: '1', label: 'aaa'},
    {value: '2', label: 'bbb'},
    {value: '3', label: 'ccc'},
    {value: '4', label: 'ddd'},

];


const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
        // backgroundColor: '#4169el !important'
    },
    appBarGradient: {
        backgroundColor: '#4169el !important'
        //background: 'linear-gradient(45deg, #7A1EA1 30%, #C6426E 100%)',
    },
    sideBarGradient: {
        // background:'#03DAC5',
        background: 'linear-gradient(45deg, #41295a 10%, #41295a 90%)',
        color: 'white',
    },
    whiteColor: {
        color: 'white',
        textColor: '#ffffff', // this should work
        primaryTextColor: '#ffffff'
    },
    contentBgColor: {
        background: 'linear-gradient(0deg, #434343 30%, #E1E2E1 100%)',
        //background:'white'
    },
    grow: {
        flexGrow: 1,

    },

    listLayout: {
        paddingTop: '8px',
        paddingBottom: '8px',
        margin: '0',
        padding: 0,
        position: 'relative',
        listStyle: 'none',
        display: 'block',
        marginBlockStart: '1em',
        marginBlockEnd: '1em',
        marginInlineEnd: '0px',
        marginInlineStart: '0px',
        paddingInlineStart: '0px'
    },

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: '4em',
        padding: 0,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: 0.0//theme.transitions.duration.leavingScreen,

        }),
        backgroundColor: '#ffe869',
        //background: 'linear-gradient(45deg, ##ffe869, ##cf751b)',
        color: 'black'
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: 0.0,//theme.transitions.duration.enteringScreen,
        }),
    },

    appBarDivider: {
        border: 'none',
        height: '1px',
        margin: '0',
        flexShrink: 0,
        backgroundColor: 'rgba(0,0,0,0.12)',
        display: 'block',
        marginBlockStart: '0.1em',
        marginBlockEnd: '0.1em',
        marginInlineEnd: 'auto',
        marginInlineStart: 'auto',
        overflow: 'hidden'

    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: 0.0//theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: 0.0//theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        //  minHeight: '64px',
    },
    content: {
        // flexGrow: 1,
        padding: theme.spacing(3),
        width: '87%',
        display: 'grid',
        gridTemplateRows: '8em auto',
        //  padding: theme.spacing.unit * 3,
        position: 'absolute',
        top: '4em',
        left: '185px',
        height: 'calc(100% - 4em)',
        // backgroundColor: 'yellow'
    },

    releaseButton: {
        position: 'absolute',
        top: 13,
        left: 280,
        color: '#FFFFFF',
        backgroundColor: '#cf3434',
        // color: rgba(0, 0, 0, 0.87),
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        shadowColor: '#000000',
        //   transition: 'all ease .5s, ":hover": { cursor: "pointer", backgroundColor: "#9c2121", color: "#fd0808"',
        padding: '6px 16px',
        fontSize: '0.875rem',
        minWidth: '64px',
        boxSizing: 'border-box',
        //transition: '#000000 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
        fontWeight: '500',
        lineHeight: '1.75',
        borderRadius: '4px',
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
        '&:hover': {backgroundColor: '#9c2121'},

    },


    userRoleButton: {
        display: 'inline-block',
        // position: 'absolute',
        // top: 13,
        //left: 280,
        color: '#000000',
        backgroundColor: '#f7a831',
        // color: rgba(0, 0, 0, 0.87),
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        shadowColor: '#000000',
        //   transition: 'all ease .5s, ":hover": { cursor: "pointer", backgroundColor: "#9c2121", color: "#fd0808"',
        padding: '6px 16px',
        fontSize: '0.875rem',
        minWidth: '64px',
        boxSizing: 'border-box',
        //transition: '#000000 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
        fontWeight: '500',
        lineHeight: '1.75',
        borderRadius: '4px',
        letterSpacing: '0.02857em',
        textTransform: 'uppercase',
        //  '&:hover': {backgroundColor: '#cf8a23'},

    },

    /*  releaseButton {
          position: 'absolute',
          top: 13,
          left: 280,
          color: '#FFFFFF',
          backgroundColor: '#9c2121',
          // color: rgba(0, 0, 0, 0.87),
          boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
          shadowColor: '#e0e0e0',

  },*/

    drawerLayout: {
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        left: '0',
        right: 'auto',
        top: '0',
        flex: '1 0 auto',
        height: '100%',
        display: 'flex',
        outline: 'none',
        zIndex: '1200',
        position: 'fixed',
        overflowY: 'auto',
        flexDirection: 'column',
        WebkitOverflowScrolling: 'touch',
        color: 'rgba(0, 0, 0, 0.87)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        backgroundColor: '#fff',


    },

    menuDropDown: {
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        paddingLeft: '16px',
        paddingRight: '16px',
        width: '100%',
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        textAlign: 'center',
        paddingTop: '8px',
        paddingBottom: '8px',
        justifyContent: 'flex-start',
        textDecoration: 'none',
        color: 'inherit',
        border: 0,
        cursor: 'pointer',
        margin: 0,
        outline: 'none',
        //alignItems: 'center',
        userSelect: 'none',
        borderRadius: '0',
        verticalAlign: 'middle',
        backgroundColor: 'transparent',
        WebkitAppearance: 'none',
        WebkitTapHighlightColor: 'transparent',
    },

    listItemLayout: {
        transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        paddingLeft: '16px',
        paddingRight: '16px',
        width: '100%',
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        textAlign: 'center',
        paddingTop: '8px',
        paddingBottom: '8px',
        justifyContent: 'flex-start',
        textDecoration: 'none',
        color: 'inherit',
        border: 0,
        cursor: 'pointer',
        margin: 0,
        outline: 'none',
        //alignItems: 'center',
        userSelect: 'none',
        borderRadius: '0',
        verticalAlign: 'middle',
        backgroundColor: 'transparent',
        WebkitAppearance: 'none',
        WebkitTapHighlightColor: 'transparent',


    },

    invisionLayout: {
        position: 'relative',
        //top: 140,
        //left: 250


    },
    epicNameLayout: {
        position: 'absolute',
        top: 80,

    },
    epicVersionLayout: {
        position: 'relative',
        top: 100,

    },
    contentHeader: {
        position: 'static',
        //backgroundColor: '#ebf2fc',
        width: '100%',
        display: 'grid',
        gridTemplateRows: '3em 4em',
        //gridRowGap: '10px',
        //borderBottomStyle: 'solid'
        borderBottom: '2px solid #888888'
    },

    contentMain: {
        position: 'static',
        width: '100%',
        overflow: 'scroll',
        display: 'grid',
        gridTemplateRows: 'auto auto'
    },

    flowHeader: {
        display: 'grid',
        gridTemplateColumns: '25% 75%',
        paddingRight: '10px'
    },

    eachScreen: {
        position: 'relative',
        display: 'grid',
        gridTemplateRows: 'auto auto',
        width: '100%',
        border: '1px solid #888888',
        marginTop: '15px',
        padding: '7px'
    },

    eachScreenPicAndTable: {
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '320px auto',
        width: '100%'
    },

    contentHeaderSubject: {
        display: 'grid',
        gridTemplateColumns: '210px 100px 200px calc(100% - 510px)',
    },

    mainButtonPart: {
        display: 'grid',
        gridTemplateColumns: '200px 200px',
        right: '5%',
    },

    tableOfContentPart: {
        display: 'grid',
        gridTemplateRows: '2em 2em',
    },

    secondPartOfHeader: {
        display: 'grid',
        gridTemplateColumns: 'calc(100% - 350px) 350px',
    },

    workingTicket: {
        display: 'grid',
        gridTemplateColumns: '150px 100px 100px',
    },


    contentTableofContent: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        paddingLeft: '20px',
    },

    contentTableofContentDetail: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',

    },

    editButton: {
        position: 'absolute',
        right: '5%',
    },

    cancelButton: {
        position: 'absolute',
        right: '5%',
    },
    saveButton: {
        position: 'absolute',
        right: '15%',
    },

    testColor: {
        backgroundColor: 'yellow'
    },

    dropdownStyle: {
        borderBottom: '1px solid #888888',
        height: '1.5em',
        width: '170px'
    },

    workingTicketAndError: {
        display: 'grid',
        gridTemplateRows: 'auto auto',

    },


});


var sidebarList = [TRANSLATION_TABLE_INDEX, TABLE_OF_CONTENT_INDEX, EXPORT_INDEX];
var icons = [<EventIcon/>, <FieldIcon/>, <AddEventIcon/>, <AddFieldIcon/>, <SpreadSheetIcon/>, <ImportExportIcon/>,
    <VersionControlIcon/>, <AddVersionControlIcon/>, <AdminIcon/>, <TutorialIcon/>]

var adminLabel = "";

class HomeContainer extends React.Component {

    constructor(props) {
        super(props)

        this.handleListMenu = this.handleListMenu.bind(this)
        if (!localStorage.getItem('env')) {
            localStorage.setItem('env', DEV2);
        }

        this.state = {
            env: DEV2,
            envOpen: false,
            profileOpen: false,
            anchorEl: null,
            selected: null,
            username: this.props.username,
            profileName: props.location.profileName,

        };
    }

    handleMouseHover = () => {
        styles()
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };
    highlightTabMenu = (index) => {

        this.setState({selected: index})
    }
    handleChange = event => {
        this.setState({auth: event.target.checked});
    };
    handleListMenu = (key, index) => {
        // event.preventDefault();
        console.log('check key', key, ' ', index);//,' check event ',event)
        switch (key) {
            case EVENT_TABLE_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/eventsummary");
                break
            case FIELD_TABLE_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/fielddictionary");
                break
            // case 'Edit Table':
            // this.setState({selected:sidebarList[index]})
            //   this.props.history.push("/configtable/edittable");
            //   break
            case ADD_EVENT_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/eventsummary/add")
                break
            case ADD_FIELD_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/fielddictionary/add")
                break
            case EDIT_EVENT_FIELD_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/eventsummary/detail/editrelation")
                break
            case IMPORT_EXPORT_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/importexport")
                break
            case VERSION_CONTROL_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/versioncontrol")
                break
            case ADD_VERSION_CONTROL_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/versioncontrol/add")
                break
            case MANAGE_ADMIN_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/manageadmin")
                break
            case MANAGE_ADMIN_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/tutorial")
                break
            //new
            case TRANSLATION_TABLE_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/translationtable");
                break
            case TABLE_OF_CONTENT_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/tableofcontent");
                break
            case AUDIT_LOG_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/auditlog")
                break
            case EXPORT_INDEX:
                this.setState({selected: sidebarList[index]})
                this.props.history.push("/export")
                break
            default:
                break;
        }
    }

    handleProfileMenu = event => {
        console.log("event current ", event.currentTarget)
        // this.props.history.push("/versioncontrol")
        this.setState({
            anchorEl: event.currentTarget,
            profileOpen: true
        });
    };
    handleEnvMenu = event => {
        console.log("event current ", event.currentTarget)
        this.setState({
            anchorEl: event.currentTarget,
            envOpen: true
        });
    }
    handleClose = () => {
        this.setState({
            anchorEl: null,
            envOpen: false,
            profileOpen: false
        });
    };

    componentDidMount() {
        // ['Tables','Flyways', 'Version Control','Add Version Control', 'Manage Admin', 'Tutorial']
        // [<TableIcon/>,<SQLIcon/>,<VersionControlIcon />,<AddVersionControlIcon/>,<AdminIcon />,<TutorialIcon />]

        console.log("user role is here ", this.props.userRole)
        if (this.props.userRole === 0) {
            adminLabel = ""
            for (var i = 0; i < sidebarList.length; i++) {

                if (sidebarList[i] === ADD_VERSION_CONTROL_INDEX) {
                    sidebarList.splice(i, 1);
                    icons.splice(i, 1)
                }
                if (sidebarList[i] === MANAGE_ADMIN_INDEX) {
                    sidebarList.splice(i, 1);
                    icons.splice(i, 1)
                }
                if (sidebarList[i] === EDIT_EVENT_FIELD_INDEX) {
                    sidebarList.splice(i, 1);
                    icons.splice(i, 1)
                }
                if (sidebarList[i] === ADD_EVENT_INDEX) {
                    sidebarList.splice(i, 1);
                    icons.splice(i, 1)
                }
                if (sidebarList[i] === ADD_FIELD_INDEX) {
                    sidebarList.splice(i, 1);
                    icons.splice(i, 1)
                }

            }


            console.log("remaining menu ", sidebarList)
        } else if (this.props.userRole === 1) {
            adminLabel = "Admin"
            console.log("check sidebar list & constnat ", sidebarList[i], ' '.ADD_VERSION_CONTROL_INDEX)
            for (var i = 0; i < sidebarList.length; i++) {

                if (sidebarList[i] === ADD_VERSION_CONTROL_INDEX) {
                    sidebarList.splice(i, 1);
                    icons.splice(i, 1)
                }
                if (sidebarList[i] === MANAGE_ADMIN_INDEX) {
                    sidebarList.splice(i, 1);
                    icons.splice(i, 1)
                }
            }
        } else if (this.props.userRole === 2) {
            // adminIcon = require('../assets/super-admin.png')
            adminLabel = "Super Admin"
        }

        this.setState({
            loading: false
        })
        //this.props.history.push("/configtable");

    }

    handleLogout = () => {
        this.setState({
            profileOpen: false
        })
        this.props.logout()
    }
    handleClickUserFlywayTable = () => {

        this.handleListMenu('Flyways', 1)
        this.setState({
            profileOpen: false
        })
    }

    handleChangeEnv = (env) => {
        localStorage.setItem('env', env);
        this.setState({
            env: env,
            anchorEl: null,
            envOpen: false,
            profileOpen: false,
            selected: 'Tables'
        })
        this.props.history.replace("/translationtable")
        // this.forceUpdate()
        // this.handleListMenu('Tables',0)


    }


    render() {

        const {classes, theme} = this.props;
        const env = localStorage.getItem('env');
        const {anchorEl, selected, open, username} = this.state;
        const envOpen = this.state.envOpen
        const profileOpen = this.state.profileOpen
        const isopen = Boolean(anchorEl);
        console.log("test" + {env})
        // const { logout } = this.props;


        return (

            <div className={classes.root}>

                {/*//Side bar*/}
                <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                    anchor="left"
                    className={classNames(classes.drawerLayout)}
                >
                    <div className={classes.toolbar}/>
                    <Divider className={classes.appBarDivider}/>
                    <List className={classNames(classes.listLayout)}>
                        {sidebarList.map((text, index) => (
                            <ListItem button
                                      key={text}
                                      id={text}
                                      selected={selected === sidebarList[index]}
                                      onClick={this.handleListMenu.bind(this, text, index)}
                                      className={classNames(classes.listItemLayout)}
                            >
                                {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>*/}
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>

                </Drawer>
                <CssBaseline/>

                {/*//Appbar*/}
                <AppBar
                    position="fixed"
                    color="primary"
                    classes={{color: classes.appBar}}
                    className={classNames(classes.appBarGradient, classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar disableGutters={!open}>
                        {/*<IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>*/}


                        {<h1>&nbsp;</h1>}
                        {<h1>&nbsp;</h1>}
                        {<h1>&nbsp;</h1>}

                        <img
                            src={require('../assets/Bababaseline_logo.png')}
                            alt="babaMonsterLogo"
                            // src="../../assets/logo.svg"
                            width="35"
                            className="d-inline-block align-top "
                        />
                        {<h1>&nbsp;</h1>}


                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Translation Baseline -
                        </Typography>
                        <div>
                            <Button
                                //className={classes.buttonColor}
                                className={classes.releaseButton}
                                variant="contained"
                                // color="primary"
                                aria-owns={isopen ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleEnvMenu}
                            >
                                {releaseMonthAndYear}
                            </Button>
                            <label>&nbsp;</label>


                            {/*<Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={envOpen}
                  onClose={this.handleClose}
              >
                  <MenuItem onClick={this.handleChangeEnv.bind(this,DEV2)}>{DEV2}</MenuItem>
                  <MenuItem onClick={this.handleChangeEnv.bind(this,DEV3)}>{DEV3}</MenuItem>
                  <MenuItem onClick={this.handleChangeEnv.bind(this,DEV4)}>{DEV4}</MenuItem>
                  <MenuItem onClick={this.handleChangeEnv.bind(this,DEV5)}>{DEV5}</MenuItem>
              </Menu>*/}
                        </div>

                        {/* <img
        src={adminIcon}
        alt="adminLogo"
        // src="../../assets/logo.svg"
        // width="110"
        // height="40"

        className="d-inline-block align-top"
      /> */}
                        {adminLabel !== "" ? <Button className={classNames(classes.userRoleButton)}
                                                     variant="contained"
                                                     style={{
                                                         backgroundColor: "#f9a825",
                                                         fontWeight: "bold",
                                                         pointerEvents: "none"
                                                     }}
                            // className="d-inline-block align-top"
                        >

                            {adminLabel}
                        </Button> : null}

                        <label>&nbsp;</label>

                        <div>
                            {/*{username}*/}
                            <IconButton
                                aria-owns={isopen ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleProfileMenu}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={profileOpen}
                                onClose={this.handleClose}
                                style={{top: '30px'}}
                            >
                                {/*{this.props.userRole !== 0 ?
                                    <MenuItem onClick={this.handleClickUserFlywayTable}>My Flyways Table</MenuItem> :
                                    <div/>}*/}
                                <MenuItem className={classNames(classes.listItemLayout)} onClick={this.handleLogout}>Log
                                    Out</MenuItem>

                                {/* <MenuItem onClick={this.handleClose}>My account</MenuItem> */}
                            </Menu>
                        </div>

                    </Toolbar>
                </AppBar>


                <main className={classNames(classes.content)}>
                    <div>
                        {/*<div className={classes.toolbar}/>*/}
                        <Switch>

                            <Route exact path="/translationtable" render={(props) => (
                                <TranslationBaselineContainer {...props} highlightTabMenu={this.highlightTabMenu}
                                                              env={env} username={this.props.username} />)}/>
                            {/*<Route exact path="/translationtable" render={(props) => ( //this should be commented*/}
                            {/*    <HomeContainer {...props} highlightTabMenu={this.highlightTabMenu} env={env}*/}
                            {/*                             userRole={this.props.userRole}/>)}/>*/}
                            <Route exact path="/tableofcontent" render={(props) => (
                                <TableOfContentContainer {...props} highlightTabMenu={this.highlightTabMenu} env={env}
                                                         userRole={this.props.userRole}/>)}/> 
                            <Route exact path="/export" render={()=><ExportContainer version="12"/>}/>
                        </Switch>
                    </div>

                </main>

            </div>
        );
    }
}

HomeContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(HomeContainer);

