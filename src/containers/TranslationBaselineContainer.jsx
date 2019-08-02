import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Select from 'react-select';
import SpreadSheetIcon from '@material-ui/icons/ViewHeadlineTwoTone';
import AddVersionControlIcon from '@material-ui/icons/PlaylistAdd';
import VersionControlIcon from '@material-ui/icons/FeaturedPlayListRounded';
import AdminIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import TutorialIcon from '@material-ui/icons/LibraryBooksRounded';
import EventIcon from '@material-ui/icons/EventNoteRounded';
import FieldIcon from '@material-ui/icons/TextFieldsRounded';
import AddFieldIcon from '@material-ui/icons/AddCommentRounded';
import ImportExportIcon from '@material-ui/icons/ImportExportRounded';
import AddEventIcon from '@material-ui/icons/AddBoxRounded';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
    ADD_EVENT_INDEX,
    ADD_FIELD_INDEX,
    ADD_VERSION_CONTROL_INDEX,
    MANAGE_ADMIN_INDEX,
    VERSION_CONTROL_INDEX,
    QUERY_TRANSLATION_DATA_API,
    QUERY_FILTER_LIST
} from '../Constants.js';
import Input from '@material-ui/core/Input';
import Dialog from "@material-ui/core/Dialog";
//add sidebar and dev data
import {forwardRef} from 'react';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Save from '@material-ui/icons/Save';
import SaveOutlined from '@material-ui/icons/SaveOutlined';
import {
    DEV2,
    DEV3,
    DEV4,
    DEV5,
    TRANSLATION_TABLE_INDEX,
    TABLE_OF_CONTENT_INDEX,
    AUDIT_LOG_INDEX,
    EXPORT_INDEX
} from '../Constants.js'
import {QUERY_EVENT_SUMMARY_API} from "../Constants";
import {FixedSizeList as List} from 'react-window';
import TextField from '@material-ui/core/TextField';
import AutoSizer from "react-virtualized-auto-sizer";
import {produce} from 'immer';


//2019-07-28 Tram Add condition to disable/enable add/edit/delete button


//add sidebar and dev data
// const releaseMonthAndYear = "July 2019";
// const epicNameVar = "Load request status tracking";
const epicVersion = "1";
const releaseVersion = "Jul 2019";
// const parentPage = "10X";
// const parentPageL2 = ["Consumer", "Business Owner"];
// const flowName = 'This is screen name';
// const pictureName = ['Loan calculator page', 'FAQ - What is Loan calculator\n'];
// const flowLocation = '10X/..../{Flow name}';


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

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>),
    Save: forwardRef((props, ref) => <Save {...props} ref={ref}/>),
    SaveOutlined: forwardRef((props, ref) => <SaveOutlined {...props} ref={ref}/>),

};

// const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    /*appBarGradient: {
        background: '#4169el'
        //background: 'linear-gradient(45deg, #7A1EA1 30%, #C6426E 100%)',
    },*/
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

    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        height: '4em',
        padding: 0,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: 0.0//theme.transitions.duration.leavingScreen,
        }),
    },
    // appBarShift: {
    //     marginLeft: drawerWidth,
    //     width: `calc(100% - ${drawerWidth}px)`,
    //     transition: theme.transitions.create(['width', 'margin'], {
    //         easing: theme.transitions.easing.sharp,
    //         duration: 0.0,//theme.transitions.duration.enteringScreen,
    //     }),
    // },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    // drawer: {
    //     width: drawerWidth,
    //     flexShrink: 0,
    //     whiteSpace: 'nowrap',
    // },
    // drawerOpen: {
    //     width: drawerWidth,
    //     transition: theme.transitions.create('width', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: 0.0//theme.transitions.duration.enteringScreen,
    //     }),
    // },
    // drawerClose: {
    //     transition: theme.transitions.create('width', {
    //         easing: theme.transitions.easing.sharp,
    //         duration: 0.0//theme.transitions.duration.leavingScreen,
    //     }),
    //     overflowX: 'hidden',
    //     width: theme.spacing(7) + 1,
    //     [theme.breakpoints.up('sm')]: {
    //         width: theme.spacing(9) + 1,
    //     },
    // },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        // flexGrow: 1,
        // padding: theme.spacing(3),
        //width: '85%',
        width: '100%',
        display: 'grid',
        gridTemplateRows: '8em auto',
        // padding: theme.spacing.unit * 3,
        // position: 'absolute',
        //  top: '4em',
        // left: '200px',
        //height: 'calc(100% - 4em)',
        height: '40em',
        //backgroundColor: 'tomato'
    },

    // releaseButton: {
    //     position: 'absolute',
    //     top: 13,
    //     left: 280,
    // },

    // invisionLayout: {
    //     position: 'relative',
    //     //top: 140,
    //     //left: 250
    //
    //
    // },
    // epicNameLayout: {
    //     position: 'absolute',
    //     top: 80,
    //
    // },
    // epicVersionLayout: {
    //     position: 'relative',
    //     top: 100,
    //
    // },
    contentHeader: {
        position: 'static',
        //  backgroundColor: '#ebf2fc',
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
        height: '100%',
        // overflow: 'scroll',
        display: 'grid',
        gridTemplateRows: 'auto auto',
        // backgroundColor: 'blue'
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
        // marginTop: '10px',
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
        // backgroundColor: 'tomato'
    },

    mainButtonPart: {
        display: 'grid',
        gridTemplateColumns: '40px 40px',
        right: '5%',
    },

    tableOfContentPart: {
        display: 'grid',
        gridTemplateRows: '2em 2em',
        // backgroundColor: 'tomato'
    },

    secondPartOfHeader: {
        display: 'grid',
        gridTemplateColumns: 'calc(100% - 350px) 350px',
    },

    workingTicket: {
        display: 'grid',
        gridTemplateColumns: '120px 140px 100px',
        //visibility: 'this.state.ticketVisible'
        paddingTop: '10px'
    },


    contentTableofContent: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto auto',
        //gridTemplateRows: 'auto auto',
        paddingLeft: '20px',
        //overflowY: 'scroll',

    },

    contentTableofContentDetail: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto',

    },

    editButton: {
        position: 'absolute',
        right: '5%',
        //backgroundImage: 'url(${EditImg})',
        //backgroundImage: 'url(require("../assets/pencil-edit-button (1).png"))',
        //width: "70px",
        //height: "30px",

    },

    cancelButton: {
        position: 'absolute',
        right: '5%',
    },
    saveButton: {
        position: 'absolute',
        right: '15%',
    },


    confirmButton: {
        display: 'inline-block',
        // position: 'absolute',
        // top: 13,
        //left: 280,
        color: '#000000',
        backgroundColor: 'transparent',
        // color: rgba(0, 0, 0, 0.87),
        boxShadow: '0px 1px 5px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 3px 1px -2px rgba(0,0,0,0.12)',
        shadowColor: '#000000',
        //   transition: 'all ease .5s, ":hover": { cursor: "pointer", backgroundColor: "#9c2121", color: "#fd0808"',
        padding: '7px 15px',
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
        '&:hover': {backgroundColor: '#888888'},

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

    testSize: {
        position: 'absolute',
        width: '200px',
        height: '100px'
    }


});

// var sidebarList = [TRANSLATION_TABLE_INDEX, TABLE_OF_CONTENT_INDEX, AUDIT_LOG_INDEX, EXPORT_INDEX]
// var icons = [<EventIcon/>, <FieldIcon/>, <AddEventIcon/>, <AddFieldIcon/>, <SpreadSheetIcon/>, <ImportExportIcon/>,
//     <VersionControlIcon/>, <AddVersionControlIcon/>, <AdminIcon/>, <TutorialIcon/>]
// var adminLabel = "";
// var count = 0;

const columns = [
    {title: 'key', field: 'key'},
    {title: 'en', field: 'en'},
    {title: 'th', field: 'th'},
    {title: 'task', field: 'task', editable: 'never'},
    {title: 'update', field: 'update', editable: 'never'},
    {title: 'remark', field: 'remark'},
];

class TranslationBaselineContainer extends React.Component {

    constructor(props) {
        super(props)
        this.queryTable = this.queryTable.bind(this);
        this.queryTableOfContent = this.queryTableOfContent.bind(this);
        // this.handleListMenu = this.handleListMenu.bind(this)
        // if (!localStorage.getItem('env')) {
        //     localStorage.setItem('env', DEV2);
        // }

        this.state = {
            isTableEditable: false,
            isTableDeletable: false,
            isTableAddable: false,
            pictureCount: 0,
            test: null,
            tocId: 1,
            env: DEV2,
            envOpen: false,
            profileOpen: false,
            anchorEl: null,
            selected: null,
            username: this.props.username,
            profileName: props.location.profileName,
            ticketVisible: "hidden",
            editClicked: false,
            componentDisable: "",
            divOpacity: 1,
            // value: "",
            selectedProject: "",
            selectedFlow: "",
            selectedChannel: "",
            selectedScreen: "",
            editVisible: "",
            jiraTicket: "",
            errorVisible: "hidden",
            jiraTicketDisable: "",

            confirmVisible: "none",
            editTicketVisible: "none",

            saveVisible: "none",
            cancelVisible: "none",

            open: false,
            setOpen: false,

            saveOpen: false,
            setSaveOpen: false,

            pictureNameDisable: "none",

            screenData: [],
            screenOptions: [],


            isAdd: false,

            //uncomment to use real data from database
            data: [{
                "screen": [{"screenId": "", "screenName": ""}],
                "picture": [
                    {
                        "pictureId": "",
                        "pictureName": "",
                        "pictureSortSequence": '',
                        "picturePath": "",
                        "translation": [
                            {
                                "id": '',
                                "key": "",
                                "en": "",
                                "th": "",
                                "task": "",
                                "remark": "",
                                "update": "",
                                "sortSequence": ''
                            }
                        ]
                    }]
            }],

            //uncomment to test with mock data
            // data: [{
            //     "screen": [{"screenId": "12345", "screenName": "registration"}],
            //     "picture": [
            //         {
            //             "pictureId": "1234567890",
            //             "pictureName": "registration_approved",
            //             "pictureSortSequence": "1",
            //             "picturePath": "../assets/invisiontestfile.jpg",
            //             "translation": [
            //                 {
            //                     "id": 1234567890,
            //                     "key": "CID",
            //                     "en": "Card",
            //                     "th": "",
            //                     "task": "",
            //                     "remark": "",
            //                     "update": "9999-12-31 23:59:59 kitty.cat version1",
            //                     "sortSequence": 1
            //                 },
            //                 {
            //                     "id": 1234567891,
            //                     "key": "III",
            //                     "en": "National",
            //                     "th": "",
            //                     "task": "",
            //                     "remark": "",
            //                     "update": "9999-12-31 23:59:59 kitty.cat version1",
            //                     "sortSequence": 2
            //                 }
            //             ]
            //         },
            //         {
            //             "pictureId": "1234567891",
            //             "pictureName": "registration_rejected",
            //             "pictureSortSequence": "1",
            //             "picturePath": "../assets/invisiontestfile.jpg",
            //             "translation": [
            //                 {
            //                     "id": 1234567893,
            //                     "key": "DDD",
            //                     "en": "ID Card",
            //                     "th": "",
            //                     "task": "",
            //                     "remark": "",
            //                     "update": "9999-12-31 23:59:59 kitty.cat version1",
            //                     "sortSequence": 1
            //                 }
            //             ]
            //         }
            //     ]
            // }],
            // newData: [],
            newData: [{
                "screen": [{"screenId": "", "screenName": ""}],
                "picture": [
                    {
                        "pictureId": "",
                        "pictureName": "",
                        "pictureSortSequence": '',
                        "picturePath": "",
                        "translation": [
                            {
                                "id": '',
                                "key": "",
                                "en": "",
                                "th": "",
                                "task": "",
                                "remark": "",
                                "update": "",
                                "sortSequence": ''
                            }
                        ]
                    }]
            }],
            // translationData: [],
            // newData: [{
            //     "screen": [{"screenId": "12345", "screenName": "registration"}],
            //     "picture": [
            //         {
            //             "pictureId": "1234567890",
            //             "pictureName": "registration_approved",
            //             "pictureSortSequence": "1",
            //             "picturePath": "../assets/invisiontestfile.jpg",
            //             "translation": [
            //                 {
            //                     "id": 1234567890,
            //                     "key": "CID",
            //                     "en": "Card",
            //                     "th": "",
            //                     "task": "",
            //                     "remark": "",
            //                     "update": "9999-12-31 23:59:59 kitty.cat version1",
            //                     "sortSequence": 1
            //                 },
            //                 {
            //                     "id": 1234567891,
            //                     "key": "III",
            //                     "en": "National",
            //                     "th": "",
            //                     "task": "",
            //                     "remark": "",
            //                     "update": "9999-12-31 23:59:59 kitty.cat version1",
            //                     "sortSequence": 2
            //                 }
            //             ]
            //         },
            //         {
            //             "pictureId": "1234567891",
            //             "pictureName": "registration_rejected",
            //             "pictureSortSequence": "1",
            //             "picturePath": "../assets/invisiontestfile.jpg",
            //             "translation": [
            //                 {
            //                     "id": 1234567893,
            //                     "key": "DDD",
            //                     "en": "ID Card",
            //                     "th": "",
            //                     "task": "",
            //                     "remark": "",
            //                     "update": "9999-12-31 23:59:59 kitty.cat version1",
            //                     "sortSequence": 1
            //                 }
            //             ]
            //         }
            //     ]
            // }],
            reqObj: [],
            // timestamp: "",
            deletedId: []
        }
        ;
    }

    queryTableOfContent = () => {
        console.log("Check function queryTableofContent")
        fetch(QUERY_FILTER_LIST + '?toc_id=' + this.state.tocId, {
            method: "GET",

        })
            .then(response => {
                console.log("Check response of screen:", response)
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot get data")
                    throw new Error(response.status);
                }
            }).then(data => {
            // if (this.isMount) { //yung mai kao
            console.log("Check data in table of content:", data);

            /*const temp = data.map((data) => {
                return {
                    key: data.screen_id,
                    value: data.screen_name,
                };
            })*/
            /* for(let i = 0; i < data.length; i++){

                 data.data[i].key = data.data[i].screen_id;
                 delete data.data[i].screen_id;
                 console.log('it s work!!!');
             }*/

            data.data.forEach(item => {
                    item.value = item.screen_id;
                    item.label = item.screen_name;
                    delete item.screen_name;
                    delete item.screen_id;
                }
            )

            this.setState({
                screenOptions: data,
//                    screenData:test,

                loading: false,
                //screenOptions: this.screenData.map(({screen_id, screen_name}) => ({key: screen_id, value: screen_name})),

            })

            console.log("Check data in screen data:", this.state.screenOptions);


        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false
            })
        });

    }

    queryTable = (selectedID) => {

        console.log("Check function queryTable")
        //fetch('http://localhost:8080/v1/translation/translationbaselinetable?screen_id=153', {
        fetch(QUERY_TRANSLATION_DATA_API + '?screen_id=' + selectedID, {
            method: "GET",

        })
            .then(response => {
                console.log("Check response:", response)
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot get data")
                    throw new Error(response.status);
                }
            })
            .then(data => {
                // if (this.isMount) { //yung mai kao
                console.log("Check data:", data);
                this.state.data[0] = data;
                this.setReqObjBefore(this.state.data);
                console.log('reqObj before in query', this.state.reqObj)
                this.state.newData[0] = data;
                this.state.pictureCount = data.picture.length;
                // this.state.translationData = data.picture[0].translation;
                console.log("Check state data:", this.state.data);
                this.setState({
                    // data: this.state.data.push(JSON.parse(data)),
                    // newData: this.state.newData.push(JSON.parse(data)),
                    loading: false,
                    // pictureCount: data.picture.length
                })
                // this.isQuery = true;
                // this.setReqObjBefore(this.state.data);
                // }
            }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false,
            })
        });
    }

    handlePictureNameChange = index => event => {
        console.log(index, event.target.value);
        const newDataState = produce(this.state.newData, draft => {
            draft[0].picture[index].pictureName = event.target.value;
        });
        this.setState({newData: newDataState});
    }

    setReqObjBefore(data) {
        const reqObj = [];
        reqObj.screen = [];
        reqObj.screen.push({
            "screenId": "",
            "screenName": ""
        })
        // reqObj[0].screenId = this.state.data[0].screen[0].screenId;
        reqObj.screen[0].screenId = data[0].screen[0].screenId;
        // reqObj.screen.screenName = this.state.data[0].screen[0].screenName;
        reqObj.screen[0].screenName = data[0].screen[0].screenName;
        // reqObj.screen.screenName = this.state.data.screen[0].screenName;
        // reqObj[0].screen[0].push("screenName")=this.state.data[0].screen[0].screenName;
        // console.log('screenname', JSON.stringify(reqObj));
        reqObj.picture = [];
        // for (var i = 0; i < this.state.data[0].picture.length; i++) {
        for (var i = 0; i < data[0].picture.length; i++) {
            reqObj.picture.push({
                "pictureId": "",
                "pictureName": "",
                "pictureSortSequence": "",
                "picturePath": "",
                "requestBefore": [
                    {
                        "translation": [
                            {}]
                    }],
                "requestAfter": [
                    {
                        "translation": [
                            {}]
                    }],
            });
            // reqObj.picture[i].pictureId = this.state.data[0].picture[i].pictureId;
            // reqObj.picture[i].pictureName = this.state.data[0].picture[i].pictureName;
            // reqObj.picture[i].pictureSortSequence = this.state.data[0].picture[i].pictureSortSequence;
            // reqObj.picture[i].picturePath = this.state.data[0].picture[i].picturePath;
            reqObj.picture[i].pictureId = data[0].picture[i].pictureId;
            reqObj.picture[i].pictureName = data[0].picture[i].pictureName;
            reqObj.picture[i].pictureSortSequence = data[0].picture[i].pictureSortSequence;
            reqObj.picture[i].picturePath = data[0].picture[i].picturePath;

            console.log('req beforeeee woiii', reqObj)
            // reqObj.picture[i].requestBefore[0].translation = this.state.data[0].picture[i].translation;
            reqObj.picture[i].requestBefore[0].translation = data[0].picture[i].translation;
            console.log('req before same same woiiii', reqObj)

            // reqObj = JSON.stringify(obj);
            // reqObj.picture.requestBefore.translation = this.state.data[0].picture[i].translation;
        }
        ;

        this.state.reqObj = reqObj;
        console.log('setrequest before', reqObj);
    }

    componentDidMount() {
        // this.isMount = true;
// this.isQuery = false;
        // if (!query) {
        //this.queryTable();
        // this.setReqObjBefore(this.state.data);
        //     query = true;
        // }
        // if (this.state.data[0].screen[0].screenId !== "") {

        // setTimeout(function() {
        //     this.setReqObjBefore();
        // },10)


        // }
        this.queryTableOfContent();

        /* while (this.state.screenData == null){
             if (this.state.screenData != null){
                 this.state.screenOptions= this.state.screenData.map(({screen_id, screen_name}) => ({key: screen_id, value: screen_name}))
                 console.log("HOWWWWWWW", this.state.screenOptions)
             }
         }
 */
        //this.mapScreenDataWithOption();

        // if (count === 0) {
        // console.log('didmount', this.state.reqObj)
        //     count++;
        // }
        // console.log("user role is here ", this.props.userRole)
        // if (this.props.userRole === 0) {
        //     adminLabel = ""
        //     for (var i = 0; i < sidebarList.length; i++) {
        //
        //         if (sidebarList[i] === ADD_VERSION_CONTROL_INDEX) {
        //             sidebarList.splice(i, 1);
        //             icons.splice(i, 1)
        //         }
        //         if (sidebarList[i] === MANAGE_ADMIN_INDEX) {
        //             sidebarList.splice(i, 1);
        //             icons.splice(i, 1)
        //         }
        //         // if (sidebarList[i] === EDIT_EVENT_FIELD_INDEX) {
        //         //     sidebarList.splice(i, 1);
        //         //     icons.splice(i, 1)
        //         // }
        //         if (sidebarList[i] === ADD_EVENT_INDEX) {
        //             sidebarList.splice(i, 1);
        //             icons.splice(i, 1)
        //         }
        //         if (sidebarList[i] === ADD_FIELD_INDEX) {
        //             sidebarList.splice(i, 1);
        //             icons.splice(i, 1)
        //         }
        //
        //     }
        //
        //
        //     console.log("remaining menu ", sidebarList)
        // } else if (this.props.userRole === 1) {
        //     adminLabel = "Admin"
        //     console.log("check sidebar list & constnat ", sidebarList[i], ' '.ADD_VERSION_CONTROL_INDEX)
        //     for (var i = 0; i < sidebarList.length; i++) {
        //
        //         if (sidebarList[i] === ADD_VERSION_CONTROL_INDEX) {
        //             sidebarList.splice(i, 1);
        //             icons.splice(i, 1)
        //         }
        //         if (sidebarList[i] === MANAGE_ADMIN_INDEX) {
        //             sidebarList.splice(i, 1);
        //             icons.splice(i, 1)
        //         }
        //     }
        // } else if (this.props.userRole === 2) {
        //     // adminIcon = require('../assets/super-admin.png')
        //     adminLabel = "Super Admin"
        // }

        this.setState({
            loading: false
        })
        //this.props.history.push("/configtable");

    }

    handleEditButton = () => {
        console.log('Tiii');
        console.log('hiiiiiiiiiiddddiii', this.state.screenData);
        //alert("Im an alert");
        if (this.state.editClicked == false) {
            this.setState({
                ticketVisible: "visible",
                componentDisable: "none",
                editClicked: true,
                divOpacity: 0.5,
                editVisible: "none",
                confirmVisible: "",
                saveVisible: "",
                cancelVisible: "",
                jiraTicketDisable: "",
                pictureNameDisable: "",
                isTableEditable: true,
                isTableDeletable: true,
                isTableAddable: true,
            })
        }
        ;
    }
    handleCancelConfirmClickOpen = () => {
        this.setState({
            setOpen: true
        });
    };

    handleCancelConfirmClose = () => {
        this.setState({
            setOpen: false
        });

    };

    handleConfirmButton = () => {
        if (this.state.jiraTicket != "") {
            this.setState({
                ticketVisible: "visible",
                componentDisable: "",
                //editClicked: true,
                divOpacity: "1",
                editVisible: "none",
                errorVisible: "hidden",
                jiraTicketDisable: "none",
                confirmVisible: "none",
                editTicketVisible: "none", //this is ""
            });

        } else {
            this.setState({
                errorVisible: "visible",
                confirmVisible: "",
                editTicketVisible: "none",//this is none
            });
        }
        ;

    };


    handleSaveConfirmClickOpen = () => {
        this.setState({
            setSaveOpen: true
        });
    };

    handleSaveConfirmClose = () => {
        this.setState({
            setSaveOpen: false
        });

    };
    //save button
    handleSaveButton = () => {
        // this.setReqObjBefore(this.state.data);
        const reqObj = this.state.reqObj;
        // const task = this.state.jiraTicket;
        console.log('save', this.state.reqObj);
        //this variable help check which rows are edited, to reduce query in Backend
        // console.log('new data', this.state.reqObj);
        for (var i = 0; i < this.state.pictureCount; i++) {
            // reqObj.picture[i].requestAfter[0].translation = this.state.data[0].picture[i].translation;
            reqObj.picture[i].requestAfter[0].translation = this.state.newData[0].picture[i].translation;
            reqObj.picture[i].pictureName = this.state.newData[0].picture[i].pictureName;
            // console.log('Im fisrt loop')
        }
        ;

        // reqObj.userName = this.state.userName;
        reqObj.userName = "config-monster";
        reqObj.deleteId = this.state.deletedId;
        this.setState({
            reqObj: reqObj,

            ticketVisible: "hidden",
            componentDisable: "",
            editClicked: false,
            divOpacity: 1,
            editVisible: "",
            confirmVisible: "none",
            saveVisible: "none",
            cancelVisible: "none",
            setSaveOpen: false,
            jiraTicket: "",
            errorVisible: "hidden",
            pictureNameDisable: "none",
            isTableEditable: false,
            isTableDeletable: false,
            isTableAddable: false,
        })
        // console.log('nooooo', JSON.stringify({
        //     "screen": this.state.reqObj.screen,
        //     "picture": this.state.reqObj.picture,
        //     "deletedTranslationId":this.state.reqObj.deleteId,
        //     "userName":this.state.reqObj.userName,}))

        //query here
        console.log('reqobj', this.state.reqObj);
        this.updateTranslation();
        if (this.state.isAdd) {
            this.addTranslation();
            this.state.isAdd = false;
        }
        this.state.reqObj = [];
        console.log('reset reqObj', this.state.reqObj);

    };

    handleAdd = () => {
        const picture = [];
        picture.translation = [];
        const reqObj = this.state.reqObj;
        for (var i = 0; i < this.state.data[0].picture.length; i++) {
            if (reqObj.picture[i].pictureId === undefined) {
                picture.push(reqObj.picture[i])
            }
            for (var j = 0; j < this.state.data[0].picture[i].translation.length; j++) {
                console.log('reqObj.picture[i].translation[j].id: ', reqObj.picture[i].requestAfter[0].translation[j].id)
                if (reqObj.picture[i].requestAfter[0].translation[j].id === undefined) {
                    picture.push({
                        "pictureId": "",
                        "pictureName": "",
                        "pictureSortSequence": "",
                        "picturePath": "",
                        "translation": [{
                            "id": "",
                            "key": "",
                            "en": "",
                            "th": "",
                            "task": "",
                            "remark": "",
                            "update": "",
                            "sortSequence": ""
                        }]
                    })
                    picture[i].pictureId = reqObj.picture[i].pictureId;
                    picture[i].pictureName = reqObj.picture[i].pictureName;
                    picture[i].pictureSortSequence = reqObj.picture[i].pictureSortSequence;
                    picture[i].picturePath = reqObj.picture[i].picturePath;
                    picture[i].translation = reqObj.picture[i].requestAfter[0].translation[j];
                    // console.log('noo translation iddddddd');
                }
            }
        }
        // console.log('body: ', JSON.stringify({
        //     "screen": this.state.reqObj.screen,
        //     "picture": picture,
        //     "username": this.props.username
        // }))
        return picture;
    }

    addTranslation() {
        const picture = this.handleAdd();
        fetch('http://localhost:8080/v1/translation/translationbaselinetable', {
            method: "POST",
            headers: {
                //     'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "screen": this.state.reqObj.screen,
                "picture": picture,
                "username": this.props.username
            })
        })
            .then(response => {
                return response.json()
            }).then(data => {
            console.log("add translation json ", data)
            if (this.isMount) {
                this.setState({
                    loading: false,
                })

                // this.showAlert(data.status == 200 ? "success" : data.status == 424 ? "failed" : data.status == 207 ? "partial" : "failed", data.result)
            }
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false,
            })
            // this.showAlert("failed", error.message)
        });
    }


    updateTranslation() {
        // if (values.eventCode !== undefined && values.subEventCode !== undefined) {
        console.log("check username ", this.props.username)
        console.log('reqobj screen in update', this.state.reqObj.screen)
        // fetch(EDIT_EVENT_API + "?env=" + this.props.env, {
        fetch('http://localhost:8080/v1/translation/translationbaselinetable', {
            method: "PUT",
            headers: {
                //     'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:
                JSON.stringify({
                    "screen": this.state.reqObj.screen,
                    "picture": this.state.reqObj.picture,
                    "deletedTranslationId": this.state.reqObj.deleteId,
                    "userName": this.state.reqObj.userName
                })
        })
            .then(response => {
                console.log("cannot save update event new response ", response)
                return response.json()
            }).then(data => {
            if (this.isMount) {
                this.setState({
                    loading: false,
                })
                // this.showAlert(data.status == 200 ? "success" : data.status == 424 ? "failed" : data.status == 207 ? "partial" : "failed", data.result)
                console.log('update response', data);
            }
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false,

            })
            // this.showAlert("failed", error.message)
        });

    }

    handleYesCancelButton = () => {
        this.setState({
            ticketVisible: "hidden",
            componentDisable: "",
            editClicked: false,
            divOpacity: 1,
            editVisible: "",
            confirmVisible: "none",
            saveVisible: "none",
            cancelVisible: "none",
            setOpen: false,
            jiraTicket: "",
            errorVisible: "hidden",
            pictureNameDisable: "none",
            isTableEditable: false,
            isTableDeletable: false,
            isTableAddable: false,
        })
    }

    handleTicketEdit = () => {
        this.setState({
            ticketVisible: "visible",
            componentDisable: "none",
            //editClicked: true,
            divOpacity: "0.5",
            editVisible: "none",
            errorVisible: "hidden",
            jiraTicketDisable: "",
            confirmVisible: "",
            editTicketVisible: "none"//this is none
        });
    }

    //dropdown
    handleProjectDrop = (value) => {
        this.setState({selectedProject: value});
    }

    handleFlowDrop = (value) => {
        this.setState({selectedFlow: value});
    }

    handleChannelDrop = (value) => {
        this.setState({selectedChannel: value});
    }

    handleScreenDrop = (selected) => {
        //uncomment this to make data reset, but now the code is not able to handle screen with no picture
        // this.state.data = [{
        //     "screen": [{"screenId": "", "screenName": ""}],
        //     "picture": [
        //         {
        //             "pictureId": "",
        //             "pictureName": "",
        //             "pictureSortSequence": '',
        //             "picturePath": "",
        //             "translation": [
        //                 {
        //                     "id": '',
        //                     "key": "",
        //                     "en": "",
        //                     "th": "",
        //                     "task": "",
        //                     "remark": "",
        //                     "update": "",
        //                     "sortSequence": ''
        //                 }
        //             ]
        //         }]
        // }];
        // this.state.newData = [{
        //     "screen": [{"screenId": "", "screenName": ""}],
        //     "picture": [
        //         {
        //             "pictureId": "",
        //             "pictureName": "",
        //             "pictureSortSequence": '',
        //             "picturePath": "",
        //             "translation": [
        //                 {
        //                     "id": '',
        //                     "key": "",
        //                     "en": "",
        //                     "th": "",
        //                     "task": "",
        //                     "remark": "",
        //                     "update": "",
        //                     "sortSequence": ''
        //                 }
        //             ]
        //         }]
        // }];
        console.log(selected.value);
        this.setState(
            {
                selectedScreen: selected,
                /*test: selected.value*/
            });
        console.log('test value', this.state.test);
        this.queryTable(selected.value);
    }

    handleDropSubmit = event => {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    commonChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


// Render it
    render() {
        console.log('reqObj renderrrr', this.state.reqObj)
        const Row = ({classes, index, style}) => {
            return (
                <div style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateRows: 'auto auto',
                    width: '100%',
                    borderBottom: '1px solid #888888',
                    padding: '7px'
                }}>
                    {/*Row {index}*/}
                    <div style={{
                        pointerEvents: this.state.pictureNameDisable, justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <TextField
                            // autoFocus
                            // required
                            // error={this.state.epicNameError}
                            style={{width:"auto"}}
                            margin="dense"
                            id="pictureName"
                            // label="Picture Name"
                            name="pictureName"
                            type="text"
                            value={this.state.newData[0].picture[index].pictureName}
                            multiline
                            rowsMax="10"
                            onChange={this.handlePictureNameChange(index)}
                        />
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: 'auto auto'}}>
                        <img
                            src={require('../assets/invisiontestfile.jpg')}
                            // src={require({this.state.picturePath[0]})}
                            width="280"
                            height="430"
                            // className={classNames(classes.invisionLayout)}
                        />
                        <MaterialTable
                            icons={tableIcons}
                            title=""
                            columns={columns}
                            options={{
                                search: true,
                                sorting: false,
                                //header: false,
                                actionsColumnIndex: -1,
                            }}
                            data={this.state.newData[0].picture[index].translation}
                            components={{
                                // Row: props => (<div style={{'font':'0.75'}}>{ props.data }</div>
                                //
                                // ),
                            }}

                            editable={{
                                isEditable: rowData => this.state.isTableEditable,
                                isDeletable: rowData => this.state.isTableDeletable,
                                onRowAdd: (this.state.isTableAddable) ? newData =>
                                        new Promise((resolve, reject) => {
                                            setTimeout(() => {
                                                    {
                                                        this.state.isAdd = true;
                                                        const data = this.state.newData;
                                                        const translation = data[0].picture[index].translation;
                                                        translation.push(newData);
                                                        const i = translation.indexOf(newData);
                                                        translation[i].task = this.state.jiraTicket;
                                                        data[0].picture[index].translation = translation;
                                                        this.setState({newData: data}
                                                            // this.state.newData = data
                                                            , () => resolve());
                                                    }
                                                    resolve()
                                                },
                                                // 1000
                                            )
                                        })
                                    : undefined
                                ,
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                const data = this.state.newData
                                                const translation = data[0].picture[index].translation;
                                                const i = translation.indexOf(oldData);
                                                translation[i] = newData;
                                                translation[i].task = this.state.jiraTicket;
                                                data[0].picture[index].translation[i] = translation[i];
                                                this.setState({newData: data}, () => resolve());
                                                // console.log('new data eiei', this.state.data[0].picture[index].translation[i]);
                                                console.log('reqObj after update', this.state.reqObj)
                                                this.setState(
                                                    {loading: false}
                                                );
                                            }
                                            resolve()
                                        }, 1000)

                                    }),
                                onRowDelete: oldData =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                const data = this.state.newData;
                                                const translation = data[0].picture[index].translation;
                                                const i = translation.indexOf(oldData);
                                                //deleteId clarifying
                                                const deletedId = this.state.deletedId;
                                                deletedId.push(translation[i].id);
                                                data[0].picture[index].translation.splice(i, 1);
                                                this.setState({
                                                    newData: data,
                                                    deletedId: deletedId
                                                }, () => resolve());
                                                this.setState(
                                                    {loading: false}
                                                );
                                            }
                                            resolve()
                                        }, 1000)
                                    }),
                            }}
                        />
                    </div>
                </div>
            );
        };


        const {classes, theme} = this.props;
        const env = localStorage.getItem('env');
        const {anchorEl, selected, open, username} = this.state;
        const envOpen = this.state.envOpen
        const profileOpen = this.state.profileOpen
        const isopen = Boolean(anchorEl);
        console.log("test" + {env})
        // const { logout } = this.props;


        return (
            <div>
                {/*//Main-Tram*/}
                <div className={classNames(classes.content)}>
                    {/* <main style={{'height':'100vh'}} className={classNames(classes.content,classes.contentBgColor)}> */}

                    {/*//Header - include table of content*/}
                    <div className={classNames(classes.contentHeader)}>
                        <div className={classNames(classes.contentHeaderSubject)}>
                            <div>
                                <Typography variant="h6" color="inherit">
                                    Translation baseline -
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h6" color="inherit">
                                    {releaseVersion}
                                </Typography>
                            </div>
                            <div>
                                <Typography variant="h6" color="inherit">
                                    (Version {epicVersion})
                                </Typography>
                            </div>
                            <div className={classNames(classes.mainButtonPart)}>
                                <div>
                                    {/*  <Button variant="contained" className={classNames(classes.saveButton)}
                                            onClick={this.handleSaveButton} style={{display: this.state.saveVisible}}>
                                        Save
                                    </Button>*/}

                                    <IconButton aria-label="Save" className={classNames(classes.saveButton)}
                                                onClick={this.handleSaveConfirmClickOpen}
                                                style={{display: this.state.saveVisible}}>

                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="save"
                                             className="svg-inline--fa fa-save fa-w-14" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width='25'
                                             height='25'>
                                            <path fill="currentColor"
                                                  d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"></path>
                                        </svg>
                                    </IconButton>


                                </div>
                                <div>
                                    {/*<Button variant="contained" className={classNames(classes.editButton)}
                                            onClick={this.handleEditButton} style={{display: this.state.editVisible}}>
                                        Edit
                                    </Button>*/}

                                    <IconButton aria-label="Edit" className={classNames(classes.editButton)}
                                                onClick={this.handleEditButton}
                                                style={{display: this.state.editVisible}}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="edit"
                                             className="svg-inline--fa fa-edit fa-w-18" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width='25'
                                             height='25'>
                                            <path fill="currentColor"
                                                  d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"></path>
                                        </svg>
                                    </IconButton>


                                    {/*<Button variant="contained" className={classNames(classes.cancelButton)}
                                            onClick={this.handleCancelConfirmClickOpen}
                                            style={{display: this.state.cancelVisible}}>
                                        Cancel
                                    </Button>*/}
                                    <IconButton aria-label="cancel" className={classNames(classes.cancelButton)}
                                                onClick={this.handleCancelConfirmClickOpen}
                                                style={{display: this.state.cancelVisible}}>
                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times"
                                             className="svg-inline--fa fa-times fa-w-11" role="img"
                                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" width='25'
                                             height='25'>
                                            <path fill="currentColor"
                                                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path>
                                        </svg>
                                    </IconButton>
                                </div>


                            </div>
                        </div>

                        {/*issue: should have someting that cover this*/}


                        <div className={classNames(classes.secondPartOfHeader)}>
                            <div className={classNames(classes.tableOfContentPart)}>
                                <div>
                                    Table of Content
                                </div>

                                <div className={classNames(classes.contentTableofContent)}>
                                    {/*<div>
                                        <Select placeholder={"Project"} options={projectOptions}
                                                className={classNames(classes.dropdownStyle)}
                                                value={this.state.selectedProject}
                                                onChange={value => this.handleProjectDrop(value)}/>


                                    </div>
                                    <div>
                                        <Select placeholder={"Flow"} options={flowOptions}
                                                className={classNames(classes.dropdownStyle)}
                                                value={this.state.selectedFlow}
                                                onChange={value => this.handleFlowDrop(value)}
                                        />


                                    </div>
                                    <div>
                                        <Select placeholder={"Channel"} options={channelOptions}
                                                className={classNames(classes.dropdownStyle)}
                                                value={this.state.selectedChannel}
                                                onChange={value => this.handleChannelDrop(value)}/>

                                    </div>*/}

                                    <div>
                                        <Select placeholder={"Screen"} options={this.state.screenOptions.data}
                                                className={classNames(classes.dropdownStyle)}
                                                value={this.state.selectedScreen}
                                                onChange={value => this.handleScreenDrop(value)}/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className={classNames(classes.workingTicket)}
                                     style={{visibility: this.state.ticketVisible}}>
                                    <div style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Typography variant="body1" color="inherit" style={{
                                            justifyContent: 'center',
                                            alignItems: 'center', paddingTop: '10px'
                                        }}>
                                            Working Ticket
                                        </Typography>
                                    </div>
                                    <div style={{
                                        pointerEvents: this.state.jiraTicketDisable, justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {/*<TextField*/}
                                        {/*    required*/}
                                        {/*    id="workingTicket"*/}
                                        {/*    label="Working Ticket"*/}
                                        {/*    //defaultValue="Hello World"*/}
                                        {/*    //className={classes.textField}*/}
                                        {/*    margin="normal"*/}
                                        {/*/>*/}
                                        <Input
                                            // defaultValue="Hello world"
                                            //className={classes.input}
                                            inputProps={{
                                                'aria-label': 'jiraTicket',
                                            }}
                                            value={this.state.jiraTicket}
                                            name={"jiraTicket"}
                                            onChange={this.commonChange}
                                            style={{width: '125px'}}
                                        />
                                    </div>
                                    <div style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Button onClick={this.handleConfirmButton}
                                                style={{display: this.state.confirmVisible}}
                                                className={classNames(classes.confirmButton)}>
                                            Confirm
                                        </Button>
                                        <Button onClick={this.handleTicketEdit}
                                                style={{display: this.state.editTicketVisible}}>
                                            Edit
                                        </Button>
                                    </div>
                                </div>


                                <div style={{visibility: this.state.errorVisible}}>
                                    <Typography variant="caption" color="inherit">
                                        Please specify Jira task to make change
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/*//Main component - each screen and detail*/}
                    <div className={classNames(classes.contentMain)}
                         style={{pointerEvents: this.state.componentDisable, opacity: this.state.divOpacity}}>

                        {/*<div className={classNames(classes.eachScreen)}>*/}
                        {/*<div className={classNames(classes.eachScreenPicAndTable)}>*/}
                        <AutoSizer>
                            {({height, width}) => (
                                <List
                                    height={height}
                                    itemCount={this.state.pictureCount}
                                    itemSize={500}
                                    width={width}
                                >
                                    {Row}
                                </List>
                            )}
                        </AutoSizer>
                        {/*</div>*/}
                        {/*</div>*/}
                    </div>

                    {/*<div className={classes.toolbar}/>*/}
                    {/*<Switch>
                        <Route exact path="/" render={(props) => (
                            <HomeContainer {...props} highlightTabMenu={this.highlightTabMenu} env={env}/>)}/>
                        <Route exact path="/translationtable" render={(props) => ( //this should be commented
                            <HomeContainer {...props} highlightTabMenu={this.highlightTabMenu} env={env}
                                                     userRole={this.props.userRole}/>)}/>
                        <Route exact path="/tableofcontent" render={(props) => (
                            <TableOfContentContainer {...props} highlightTabMenu={this.highlightTabMenu} env={env}
                                                     userRole={this.props.userRole}/>)}/>
                    </Switch>*/}
                </div>

                <div>
                    {/*<Button variant="outlined" color="primary" onClick={this.handleCancelConfirmClickOpen}>*/}
                    {/*    Open alert dialog*/}
                    {/*</Button>*/}
                    <Dialog
                        open={this.state.setOpen}
                        onClose={this.handleCancelConfirmClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle
                            id="alert-dialog-title">{"Do you want to discard your change and leave the current page?"}</DialogTitle>
                        {/*<DialogContent>
                            <DialogContentText id="alert-dialog-description">

                            </DialogContentText>
                        </DialogContent>*/}
                        <DialogActions>
                            <Button onClick={this.handleYesCancelButton} variant="outlined" color="primary"
                                    style={{padding: '10px'}}>
                                Yes
                            </Button>
                            <Button onClick={this.handleCancelConfirmClose} variant="contained" color="primary"
                                    style={{padding: '10px'}} autoFocus>
                                No
                            </Button>
                        </DialogActions>

                    </Dialog>
                </div>
                <div>
                    <Dialog
                        open={this.state.setSaveOpen}
                        onClose={this.handleSaveConfirmClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle
                            id="alert-dialog-title">{"Do you want to save your change under  "+this.state.jiraTicket+"  ticket?"}</DialogTitle>
                        {/*<DialogContent>*/}
                        {/*    <DialogContentText id="alert-dialog-description">*/}

                        {/*    </DialogContentText>*/}
                        {/*</DialogContent>*/}
                        <DialogActions>
                            <Button onClick={this.handleSaveButton} variant="contained" color="primary"
                                    style={{padding: '10px'}} autoFocus>
                                Yes
                            </Button>
                            <Button onClick={this.handleSaveConfirmClose} variant="outlined" color="primary"
                                    style={{padding: '10px'}}>
                                No
                            </Button>
                        </DialogActions>

                    </Dialog>
                </div>
            </div>
        );
    }
}

TranslationBaselineContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(TranslationBaselineContainer);

