import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import pink from 'material-ui/colors/pink';
import {NOTI_TABLE_MAPPING_INDEX, QUERY_TABLE_MICROSERVICE_API} from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import CustomToolbar from "../components/CustomToolbar.jsx";


class NotiTableMappingContainer extends Component {

    constructor(props) {

        super(props);
        console.log("entering table notification")
        this.isMount = true;
        this.columns = [
            {
                name: "id",
                label: "ID",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                name: "table",
                label: "Table",
                options: {
                    filter: true,
                    // filterType: 'textField',
                    // sort: true,

                }
            },
            {
                name: "microservice",
                label: "Microservice",

                options: {
                    filter: true,
                    // filterType: 'textField',
                    //  sort: true,
                }
            },
            {
                name: "tableType",
                label: "Table Type",

                options: {
                    filter: true,
                }
            }
        ];
        this.state = {
            title: "Notification and Event Config Table",
            data: [],
            column: [],
            row: 50,
            env: this.props.env,
            loading: true
        }


    }


    componentDidUpdate(prevProps) {
        const newProps = this.props
        if (prevProps.env !== newProps.env) {
            console.log("component did update yeah new props ", newProps.env)
            this.setState({
                env: newProps.env,
                loading: true
            }, () => {
                this.queryTable()
            });

        }
    }

    componentWillUnmount() {
        this.isMount = false
    }

    handleEdit = () => {
        this.props.history.push("/configtable/edittabledata?id=0")
    }

    queryTable = () => {

        console.log("change env? ", this.state.env)
        fetch(QUERY_TABLE_MICROSERVICE_API + '?tableType=notification' + '&env=' + this.state.env, {
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
                console.log("table type checking ", data.column, ' ', data.data)
                this.setState({
                    column: data.column,
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


    componentDidMount() {
        this.props.highlightTabMenu(NOTI_TABLE_MAPPING_INDEX)
        this.queryTable()
        console.log("please refresh state")

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
            rowsPerPage: this.state.data.length,
            rowsPerPageOptions: [50, 100, 150, this.state.data.length],
            selectableRows: 'none',
            filterType: 'textField',
            print: false,
            responsive: 'scroll',
            rowHover: true,

            onChangeRowsPerPage: (row) => {
                this.setState({
                    row: row
                })
            },
            onRowClick: (rowData, rowMeta) => {
                console.log("check row data", rowData)
                var url = ''
                if (rowData[3] == "noti") {
                    url = '/configtable/detail?id=' + rowData[0] + '&tableType=' + rowData[3]
                } else {
                    url = '/configtable/detail?id=' + rowData[0]
                }
                this.props.history.push(url)
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
                        <MUIDataTable
                            title={this.state.title}

                            data={!this.state.data.length === 0 ? []
                                :
                                this.state.data.map(item => {
                                    return [
                                        item.id,
                                        item.table_name,
                                        item.microservice,
                                        item.table_type
                                    ]
                                })
                            }

                            columns={this.state.column}
                            options={options}

                        />
                    </MuiThemeProvider>
                </LoadingOverlay>
            </div>

        )
    }
}

export default NotiTableMappingContainer;
