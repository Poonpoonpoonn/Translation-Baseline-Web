import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import pink from 'material-ui/colors/pink';
import TabBar from '../components/TabBar.jsx'
import AddUserContainer from '../containers/AddUserContainer.jsx'
import {ADD_USER_API, DELETE_USER_API, MANAGE_ADMIN_INDEX, QUERY_USER_API} from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import CustomToolbar from "../components/CustomToolbar.jsx";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';


class ManageAdminContainer extends Component {

    constructor(props) {
        super(props);
        this.userColumns = [
            {
                name: "username",
                label: "Username",
                options: {
                    filter: true,
                    sort: true,
                }
            }
        ];

        this.state = {
            title: "Manage Admin",
            data: [],
            column: [],
            loading: true,
            showAlert: false,
            alertType: "",
            alertTitle: "",
            alertMessage: ""

        }

        this.changeTab = this.changeTab.bind(this);

    }

    queryUser = () => {
        this.setState({
            loading: true
        })
        fetch(QUERY_USER_API, {
            method: "GET",

        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot get data")
                    throw new Error(response.statusText);
                }
            }).then(data => {

            this.setState({
                data: data,
                loading: false
            })
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false
            })
        });
    }
    addUser = (username) => {
        this.setState({
            loading: true
        })
        fetch(ADD_USER_API, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot get data")
                    throw new Error(response.statusText);
                }
            }).then(data => {
            console.log("add user json ", data)
            if (this.isMount) {
                this.setState({
                    loading: false,
                    showAlert: true,
                    alertType: "success",
                    alertTitle: "Success!",
                    alertMessage: "Successfully Add New User."
                })
                this.showAlert("success", "Successfully Add New User.")
            }
        }).catch((error) => {
            console.log('error: ' + error.message);
            this.setState({
                loading: false,
                showAlert: true,
                alertType: "error",
                alertTitle: "Error!",
                alertMessage: "Cannot Add User, Please try again. " + error.message

            })
            this.showAlert("failed", "Cannot Add User, Please try again. " + error.message)
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
                timeout: 3000,
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
                timeout: 3000,
                offset: 100
            });
        }
    }

    componentDidMount() {
        this.isMount = true
        this.props.highlightTabMenu(MANAGE_ADMIN_INDEX)
        this.queryUser()
    }

    componentWillUnmount() {
        this.isMount = false
    }

    handleClose = () => {

    }

    deleteUser = (username) => {
        this.setState({
            loading: true
        })
        fetch(DELETE_USER_API, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "username": username,
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error(response.statusText);
                }
            }).then(data => {
            this.setState({
                showAlert: true,
                alertType: "success",
                alertTitle: "Success!",
                alertMessage: "Successfully Delete User."
            })
            this.queryUser()

        }).catch((error) => {
            this.setState({
                loading: false,
                showAlert: true,
                alertType: "error",
                alertTitle: "Error!",
                alertMessage: "Cannot Delete User, Please try again. " + error.message
            })
        });
    }
    handleEdit = () => {
        this.props.history.push("manageadmin/edit")
    }

    changeTab(tabName) {
        if (tabName === 0) {
            this.setState({title: "Manage Admin"})
        } else if (tabName === 1) {
            this.setState({title: "Add User"})
        }
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
            filterType: 'textField',
            responsive: 'scroll',
            print: false,
            selectableRows: 'none',
            //  onRowsDelete: (rowsDeleted) => {
            //   this.setState({
            //     loading:true
            //   })
            //   for (var key in rowsDeleted.data) {
            //     console.log("checking id ",rowsDeleted.data[key],' ',this.state.data[rowsDeleted.data[key].index].username)
            //     this.deleteUser(this.state.data[rowsDeleted.data[key].index].username)
            //   }
            // },
            customToolbar: () => {
                if (this.props.userRole < 2) {
                    return null
                } else {
                    return <CustomToolbar handleEdit={this.handleEdit}/>;
                }

            }
        };
        return (
            <div>
                <Alert stack={false} timeout={3000}/>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                >
                    <TabBar changeTab={this.changeTab} items={["Manage Admin", "Add User"]}/>
                    <MuiThemeProvider theme={this.getMuiTheme()}>
                        {this.state.title === "Manage Admin" ?
                            (<MUIDataTable
                                title={this.state.title}
                                data={this.state.data.map(item => {
                                    return [
                                        item.username
                                    ]
                                })}
                                columns={this.userColumns}
                                options={options}
                            />)
                            : <div>
                                {/* <SweetAlert
        show={this.state.showAlert}
        title={this.state.alertTitle}
        text={this.state.alertMessage}
        type={this.state.alertType}
        onOutsideClick={() => this.setState({ showAlert: false })}
        onConfirm={() => this.setState({ showAlert: false })}
      /> */}
                                <AddUserContainer addUser={this.addUser}/>
                            </div>
                        }
                    </MuiThemeProvider>
                </LoadingOverlay>
            </div>

        )
    }
}

export default ManageAdminContainer;
