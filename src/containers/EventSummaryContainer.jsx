import React, { Component } from 'react';
import MUIDataTable from "mui-datatables";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import pink from 'material-ui/colors/pink';
import { QUERY_EVENT_SUMMARY_API,TABLE_MAPPING_INDEX, EXPORT_DATA_API, QUERY_TRANSLATION_TABLE_API, QUERY_TOCID_FROM_RELEASE_API } from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import CustomToolbar from "../components/CustomToolbar.jsx";
import EventDetailContainer from "./EventDetailContainer";
import ReactDataGrid from 'react-data-grid';
import { Column, Table } from 'react-virtualized';
import fileSaver from 'file-saver'
import axios from 'axios'
import 'react-virtualized/styles.css';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/EditRounded';
import orange from '@material-ui/core/colors/orange';
import PreviewIcon from '@material-ui/icons/RemoveRedEyeRounded';
import DownloadIcon from '@material-ui/icons/CloudDownloadRounded';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';


class EventSummaryContainer extends Component {

    constructor(props) {
        super(props);
        this.isMount = true;
        this.columns = [
            {
                field: "key",
                label: "Key",
                options: {
                    filter: true,
                }
            },
            {
                field: "enDescription",
                label: "EN",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                field: "thDescriptuon",
                label: "TH",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                field: "jiraTicket",
                label: "Jira Ticket",

                options: {
                    filter: true,
                    // filterType: 'textField',
                    //  sort: true,
                }
            },
            {
                field: "updateTime",
                label: "Update",

                options: {
                    filter: true,
                }
            },
            {
                field: "remark",
                label: "Remark",

                options: {
                    filter: true,
                }
            },

        ];
        this.state = {
            title: "Event Summary",
            data: [],
            row:25,
            env:this.props.env,
            loading:true
        }
    }


    componentDidUpdate(prevProps) {
        console.log("enter new update ????")
        const newProps = this.props
        if(prevProps.env !== newProps.env){
            console.log("component did update yeah new props ",newProps.env)
            this.setState({
                env:newProps.env,
                loading:true
            }, () => {
                this.queryTable()
            });

        }
    }
    componentWillUnmount() {
        this.isMount = false
    }
    handleViewDetail = () => {
        this.props.history.push('/eventsummary/detail')
    }
    showAlert = (type,message) => {
        if(type === "success"){
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
        }
        else if(type === "failed"){
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
    /* exportEventData = () => {
         this.setState({
             loading:true
         })
         axios.post(EXPORT_DATA_API,{"tableType":"event","env":this.props.env}, { responseType: 'arraybuffer' })
     .then((response) => {
        var blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob, this.state.title+'.xlsx');
      this.setState({
         loading:false
     })
     this.showAlert("success","Successfully Export File")
     });
     }*/

    /*  viewEventDetail = (data) => {
          this.props.history.push("/eventsummary/detail?eventCode="+data.rowData[2]+"&subEventCode="+data.rowData[3])
      }*/
    queryTable = () => {

        fetch(QUERY_TRANSLATION_TABLE_API + '?env=' + this.state.env, {
            method: "GET",

        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                }
                else {
                    console.log("cannot get data")
                    throw new Error(response.status);
                }
            }).then(data => {
            if(this.isMount) {

                this.setState({
                    data: data.data,
                    loading:false
                })
            }
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading:false
            })
        });
    }


    componentDidMount() {
        this.props.highlightTabMenu(TABLE_MAPPING_INDEX)
        this.queryTable()
        console.log("please refresh state")

    }

    //  cellRenderer = ({ index, key, style }) => {
    //     return (
    //       <div
    //         key={key}
    //         style={style}
    //       >
    //         {this.columns[index].key}
    //       </div>
    //     )
    //   }

    getMuiTheme = () => createMuiTheme({
        palette: {
            //type: "dark",
            primary: orange
        },

        typography: {
            useNextVariants: true,
            fontSize: 18 // to support newer version ->
        },
        overrides: {
            MUIDataTableBodyCell: {
                root: {
                    border: 'solid 1px #C0C0C0',
                    verticalAlign:'top',

                    //   '&:nth-child': {
                    //      backgroundColor: 'red',

                    //   }
                }
            },
            MUIDataTableSelectCell: {
                checked: { color: "#FF0266 !important" }
            },

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
        console.log("wtf is happenning ",this.state.data !== undefined)
        const options = {
            //    filterType: 'checkbox',
            rowsPerPage: this.state.row,
            rowsPerPageOptions: [25, 100, 150, this.state.data.length],
            selectableRows: false,
            filterType: 'textField',
            print: false,
            responsive:'scroll',
            rowHover:true,

            onChangeRowsPerPage: (row) => {
                this.setState({
                    row:row
                })
            },

        };

        return (
            <div>
                <Alert stack={false} timeout={3000} />
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                >

                    {/*<Button onClick={this.exportEventData} variant="contained" size="large" color="primary" >*/}
                    {/*       <DownloadIcon/>*/}
                    {/*  </Button>*/}
                    <br/>
                    <MuiThemeProvider theme={this.getMuiTheme()}>


                        <MUIDataTable
                            title={this.state.title}

                            data={!this.state.data.length === 0 ? []
                                :
                                this.state.data.map(item => {
                                    return [
                                        item.function_name,
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
export default EventSummaryContainer;