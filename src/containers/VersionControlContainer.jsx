import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import pink from 'material-ui/colors/pink';
import TabBar from '../components/TabBar.jsx'
import LoadingOverlay from 'react-loading-overlay';
import CustomToolbar from "../components/CustomToolbar.jsx";

import {
    DELETE_SUMMARIZE_VERSION_CONTROL_API,
    QUERY_FULL_VERSION_CONTROL_API,
    QUERY_SUMMARIZE_VERSION_CONTROL_API,
    VERSION_CONTROL_INDEX
} from '../Constants.js'

class VersionControlContainer extends Component {

    constructor(props) {
        super(props);

        this.fullColumns = [
            {
                name: "version",
                label: "Version",
                options: {
                    filter: true,
                    sort: true,
                    sortDirection: 'asc'
                }
            },
            {
                name: "autoDescription",
                label: "Auto Description",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "epicName",
                label: "Epic Name",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "devTask",
                label: "Dev Task",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "timestamp",
                label: "Timestamp",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "author",
                label: "Author",
                options: {
                    filter: true,
                    sort: true,
                }
            }
        ];
        this.summarizeColumns = [
            {

                name: "id",
                label: "ID",
                options: {
                    filter: true,
                    sort: true,
                    sortDirection: 'asc'
                }
            },
            {
                name: "version",
                label: "Version",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "description",
                label: "Description",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "remark",
                label: "Remark",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "timestamp",
                label: "Timestamp",
                options: {
                    filter: true,
                    sort: true,
                }
            },
            {
                name: "author",
                label: "Author",
                options: {
                    filter: true,
                    sort: true,
                }
            }
        ];

        this.state = {
            title: "Full Version Control",
            fullData: [],
            summarizeData: [],
            column: this.fullColumns,
            loading: false,
            rows: 20

        }
        this.changeTab = this.changeTab.bind(this);

    }

    componentDidMount() {
        this.isMount = true
        this.props.highlightTabMenu(VERSION_CONTROL_INDEX)
        this.queryFullVersionControl()

    }

    componentWillUnmount() {
        this.isMount = false
    }


    queryFullVersionControl = () => {
        let hello = false;
        this.setState({
            loading: true
        })
        fetch(QUERY_FULL_VERSION_CONTROL_API + '?env=' + this.props.env, {
            method: "GET",

        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error(response.status);
                }
            }).then(data => {
            if (this.isMount) {
                this.setState({
                    fullData: data,
                    loading: false
                })
            }
        }).catch((error) => {
            this.setState({
                loading: false
            })
        });
    }
    handleEdit = () => {
        this.props.history.push("/versioncontrol/edit")
    }
    querySummarizeVersionControl = () => {
        this.setState({
            loading: true
        })
        fetch(QUERY_SUMMARIZE_VERSION_CONTROL_API + '?env=' + this.props.env, {
            method: "GET",

        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error(response.status);
                }
            }).then(data => {

            this.setState({
                summarizeData: data,
                loading: false
            })
        }).catch((error) => {
            this.setState({
                loading: false
            })
        });
    }

    changeTab(tabName) {


        if (tabName === 0) {
            this.setState({
                title: "Full Version Control",
                column: this.fullColumns

            })
            if (this.state.fullData.length === 0) {
                this.queryFullVersionControl()
            }

        } else if (tabName === 1) {
            this.setState({
                title: "Summarize Version Control",
                column: this.summarizeColumns

            })
            if (this.state.summarizeData.length === 0) {
                this.querySummarizeVersionControl()
            }
        }
    }

    deleteSummarizeVersionControl = (id) => {
        this.setState({
            loading: true
        })
        fetch(DELETE_SUMMARIZE_VERSION_CONTROL_API, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": id,
                "env": this.props.env
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error(response.status);
                }
            }).then(data => {

            this.querySummarizeVersionControl()

        }).catch((error) => {
            this.setState({
                loading: false
            })
        });
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


        return (
            <div>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                >
                    <TabBar changeTab={this.changeTab} items={["Full Version Control", "Summarize Version Control"]}/>
                    <MuiThemeProvider theme={this.getMuiTheme()}>

                        {this.state.title === "Full Version Control" ?
                            <MUIDataTable
                                title={this.state.title}
                                data={this.state.fullData.map(item => {
                                    return [
                                        item.version,
                                        item.auto_description,
                                        item.epic_name,
                                        item.dev_task,
                                        item.timestamp,
                                        item.author

                                    ]
                                })
                                }
                                columns={this.state.column}
                                options={{
                                    selectableRows: 'none',
                                    print: false,
                                    rowsPerPage: 100,
                                    filterType: 'textField',
                                    responsive: 'scroll',
                                    rowsPerPageOptions: [this.state.fullData.length, 50, 100, 150],

                                }}

                            />
                            :
                            <MUIDataTable
                                title={this.state.title}

                                data={this.state.summarizeData.map(item => {
                                    return [
                                        item.id,
                                        item.version,
                                        item.description,
                                        item.remark,
                                        item.timestamp,
                                        item.author
                                    ]
                                })
                                }
                                columns={this.state.column}
                                options={{
                                    selectableRows: 'none',
                                    filterType: 'textField',
                                    print: false,
                                    rowsPerPage: 20,
                                    responsive: 'scroll',
                                    rowsPerPageOptions: [20, 50, 100, this.state.summarizeData.length],
                                    // onRowsDelete: (rowsDeleted) => {
                                    //   this.setState({
                                    //     loading:true
                                    //   })
                                    //   for (var key in rowsDeleted.data) {
                                    //     console.log("checking id ",rowsDeleted.data[key],' ',this.state.summarizeData[rowsDeleted.data[key].index])
                                    //     this.deleteSummarizeVersionControl(this.state.summarizeData[rowsDeleted.data[key].index].id)
                                    //   }
                                    // }
                                    customToolbar: () => {
                                        console.log("userrole ", this.props.userRole)
                                        if (this.props.userRole < 2) {
                                            return null
                                        } else {
                                            return <CustomToolbar handleEdit={this.handleEdit}/>;
                                        }

                                    },
                                }}
                            />
                        }


                    </MuiThemeProvider>
                </LoadingOverlay>
            </div>

        )
    }
}

export default VersionControlContainer;
