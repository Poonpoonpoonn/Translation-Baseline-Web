import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import pink from 'material-ui/colors/pink';
import LoadingOverlay from 'react-loading-overlay';
import DownloadIcon from '@material-ui/icons/CloudDownloadRounded';
import fileSaver from 'file-saver'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import {EXPORT_DATA_API, FLYWAY_TABLE_INDEX, QUERY_FLYWAY_TABLE_API} from '../Constants.js'

class FlywayTableContainer extends Component {

    constructor(props) {
        super(props);
        console.log("check username ", this.props.username)
        this.fullColumns = [
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
                name: "flywayScript",
                label: "Flyway Script",
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
            },
            {
                name: "timestamp",
                label: "Timestamp",
                options: {
                    filter: true,
                    sort: true,
                }
            }
        ];


        this.state = {
            title: "Flyway Table",
            flywayData: [],
            column: this.fullColumns,
            username: this.props.username,
            loading: false,
            row: 50

        }

    }

    componentDidMount() {
        this.isMount = true
        this.props.highlightTabMenu(FLYWAY_TABLE_INDEX)
        this.queryFlywayTable()
    }

    componentWillUnmount() {
        this.isMount = false
    }

    exportData = () => {
        axios.post(EXPORT_DATA_API, this.state.flywayData, {responseType: 'arraybuffer'})
            .then((response) => {
                var blob = new Blob([response.data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
                fileSaver.saveAs(blob, 'FlywayTable_' + this.state.username + '.xlsx');
            });
    }

    queryFlywayTable = () => {
        this.setState({
            loading: true
        })
        fetch(QUERY_FLYWAY_TABLE_API, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "env": this.props.env,
                "username": this.state.username
            })
        })
            .then(response => {
                if (response.status === 200) {
                    console.log('Flyway Container ---> receive response');
                    return response.json()
                } else {
                    throw new Error(response.status);
                }
            }).then(data => {
            console.log('FlywaytableContainer: ', 'isMount', this.isMount);
            if (this.isMount) {
                this.setState({
                    flywayData: data,
                    loading: false
                })
            }
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

        const options = {
            //    filterType: 'checkbox',
            filterType: 'textField',
            rowsPerPage: this.state.row,
            rowsPerPageOptions: [50, 100, 200, this.state.flywayData.length],
            selectableRows: 'none',
            responsive: 'scroll',
            download: false,
            print: false,
            onChangeRowsPerPage: (row) => {
                this.setState({
                    row: row
                })
            }

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
                            data={this.state.flywayData.map(item => {
                                return [
                                    item.id,
                                    item.flyway_script,
                                    item.author,
                                    item.timestamp

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

export default FlywayTableContainer;
