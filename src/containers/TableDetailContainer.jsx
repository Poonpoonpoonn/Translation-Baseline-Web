import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import pink from 'material-ui/colors/pink';
import queryString from 'query-string'
import {EXPORT_DATA_API, NOTI_TABLE_MAPPING_INDEX, QUERY_TABLE_DETAIL_API, TABLE_MAPPING_INDEX} from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import CustomToolbar from "../components/CustomToolbar.jsx";
import Button from '@material-ui/core/Button';
import DownloadIcon from '@material-ui/icons/CloudDownloadRounded';
import PreviewIcon from '@material-ui/icons/RemoveRedEyeRounded';
import fileSaver from 'file-saver'
import axios from 'axios'

var tableId = 0;
var isMount = true

class TableDetailContainer extends Component {

    constructor(props) {

        super(props);
        this.state = {
            title: 'Config Table',
            column: [],
            columnData: [],
            data: [],
            row: 20,
            loading: false
        }


    }

    exportData = () => {
        const values = queryString.parse(this.props.location.search) //{"id":values.id,"env":this.props.env}
        axios.post(EXPORT_DATA_API, {"id": values.id, "env": this.props.env}, {responseType: 'arraybuffer'})
            .then((response) => {
                var blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                fileSaver.saveAs(blob, this.state.title + '.xlsx');
            });
    }

    queryTable = (id) => {

        this.setState({
            loading: true
        })
        fetch(QUERY_TABLE_DETAIL_API + '?env=' + this.props.env + '&id=' + id, {
            method: "GET",

        })
            .then(response => {
                console.log("response status ", response.status === 200)
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot get data")

                    throw new Error(response.status);
                }
            }).then(data => {

            const values = queryString.parse(this.props.location.search)
            console.log("check table type ", values.tableType)
            if (values.tableType === "noti") {
                data.columnData.unshift({
                    name: "Preview",
                    options: {
                        filter: false,
                        sort: false,
                        empty: true,
                        customBodyRender: (value, tableMeta, updateValue) => {
                            //   console.log("value ",value,' ',tableMeta)
                            const rowData = tableMeta
                            return (
                                <Button variant="contained" onClick={() => this.previewNotificationMessage(rowData)}>
                                    <PreviewIcon/>
                                </Button>
                            );
                        }
                    }
                });
            }
            // var column = []
            // var columnData = data.columnData
            // console.log("still enter data? ",columnData)
            // if (values.tableType === "noti"){
            //     columnData.unshift({
            //         name: "Preview",
            //         options: {
            //           filter: false,
            //           sort: false,
            //           empty: true,
            //           customBodyRender: (value, tableMeta, updateValue) => {
            //             //   console.log("value ",value,' ',tableMeta)
            //                const rowData = tableMeta
            //             return (
            //                 <Button variant="contained" onClick={ () => this.previewNotificationMessage(rowData)}>
            //                     <PreviewIcon/>
            //                 </Button>
            //             );
            //           }
            //         }
            //     });
            //     // column.push({
            //     //     name: "Preview",
            //     //     options: {
            //     //       filter: false,
            //     //       sort: false,
            //     //       empty: true,
            //     //       customBodyRender: (value, tableMeta, updateValue) => {
            //     //         //   console.log("value ",value,' ',tableMeta)
            //     //            const rowData = tableMeta
            //     //         return (
            //     //             <Button variant="contained" onClick={ () => this.previewNotificationMessage(rowData)}>
            //     //                 <PreviewIcon/>
            //     //             </Button>
            //     //         );
            //     //       }
            //     //     }
            //     // })
            // }

            // for (var i = 0; i < data.column.length; i++) {
            //     var sort=null
            //     if(i==0){sort='asc'}
            //     column.push({
            //         name: data.column[i],
            //         label: data.column[i] + " [" + data.type[i] +"]",
            //         options: {
            //           filter: true,
            //           sortDirection:sort
            //          }
            //     });
            // }
            if (isMount) {

                this.setState({
                    data: data.data,
                    pkIndexs: data.primaryKeyIndexs,
                    pkValues: data.primaryKeys,
                    pkTypes: data.type,
                    column: data.column,
                    columnData: data.columnData,
                    title: data.tableName,
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

    previewNotificationMessage = (data) => {
        const values = queryString.parse(this.props.location.search)
        var pkValueStr = ""
        var pkIndexStr = ""
        var pkTypeStr = ""
        for (var i = 0; i < this.state.pkIndexs.length; i++) {
            if (i < this.state.pkTypes.length) {
                pkTypeStr += ("&types=" + this.state.pkTypes[i])
            }
            if (i < this.state.pkIndexs.length) {
                pkValueStr += ("&values=" + data.rowData[this.state.pkIndexs[i] + 1])
                pkIndexStr += ("&keys=" + this.state.column[this.state.pkIndexs[i]])
                console.log("why key is empty? ", this.state.pkIndexs[i])
            }
        }
        console.log("help checking index str ", pkIndexStr, ' ', this.state.column)

        const url = "/configtable/notification/preview?env=" + this.props.env + "&id=" + values.id + pkIndexStr + pkValueStr + pkTypeStr
        window.open(url, '_blank')
        //<a href="https://google.com" target="_blank">CSV</a>
    }

    componentDidMount() {
        isMount = true
        const values = queryString.parse(this.props.location.search)
        if (values.tableType == "noti") {
            this.props.highlightTabMenu(NOTI_TABLE_MAPPING_INDEX)

        } else {
            this.props.highlightTabMenu(TABLE_MAPPING_INDEX)
        }
        tableId = values.id
        this.queryTable(tableId, values.tableType)

    }

    componentWillUnmount() {
        isMount = false
    }

    handleEdit = () => {
        const values = queryString.parse(this.props.location.search)
        this.props.history.push("/configtable/edittabledata?id=" + values.id)
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
            // MUIDataTableBodyCell: {
            //     root: {

            //     }
            // },
            MUIDataTableSelectCell: {
                checked: {color: "#FF0266 !important"}
            },
            MUIDataTableBodyCell: {
                root: {
                    border: 'solid 1px #C0C0C0',
                    verticalAlign: 'top',
                    //   '&:nth-child': {
                    //      backgroundColor: 'red',

                    //   }
                }
            }

        }
    })

    render() {

        const options = {
            //    filterType: 'checkbox',
            rowsPerPage: this.state.row,
            rowsPerPageOptions: [20, 50, 100, this.state.data.length],
            selectableRows: 'none',
            print: false,
            download: false,
            filterType: 'textField',
            responsive: 'scroll',
            onChangeRowsPerPage: (row) => {
                this.setState({
                    row: row
                })
            },

            customToolbar: () => {
                if (this.props.userRole < 1) {
                    return null
                } else {
                    return <CustomToolbar handleEdit={this.handleEdit}/>;
                }

            },

        };

        return (
            <div>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                >
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        <Button variant="contained" onClick={this.exportData} color="secondary">
                            <DownloadIcon/>
                        </Button>

                        <MUIDataTable
                            title={this.state.title}
                            data={this.state.data}

                            // data={!this.state.data.length === 0 ? []
                            //     :
                            //     this.state.data.map(item => {
                            //         return [
                            //             item.table_name,
                            //             item.microservice
                            //         ]
                            //     })
                            // }


                            columns={this.state.columnData}
                            options={options}

                        />
                    </MuiThemeProvider>
                </LoadingOverlay>
            </div>

        )
    }
}

export default TableDetailContainer;
