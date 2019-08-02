import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {
  EditingState,
  FilteringState,
  IntegratedFiltering,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SearchState,
  SortingState
} from '@devexpress/dx-react-grid';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import LoadingOverlay from 'react-loading-overlay';
import {
  Grid,
  PagingPanel,
  SearchPanel,
  Table,
  TableEditColumn,
  TableEditRow,
  TableFilterRow,
  TableHeaderRow,
  Toolbar,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import {DELETE_USER_API, MANAGE_ADMIN_INDEX, QUERY_USER_API} from '../Constants.js'


const getRowId = row => row.rowNumber;
var deletedUsernameList = []

const theme = createMuiTheme({
    typography: {
        useNextVariants: true
    },
});
const AddButton = ({onExecute}) => (
    <div style={{textAlign: 'center'}}>
        <Button
            color="primary"
            onClick={onExecute}
            title="Create new row"
        >
            New
        </Button>
    </div>
);

const EditButton = ({onExecute}) => (
    <IconButton onClick={onExecute} title="Edit row">
        <EditIcon/>
    </IconButton>
);

const DeleteButton = ({onExecute}) => (
    <IconButton
        onClick={() => {
            // eslint-disable-next-line
            if (window.confirm('Are you sure you want to delete this row?')) {
                onExecute();
            }
        }}
        title="Delete row"
    >
        <DeleteIcon/>
    </IconButton>
);

const CommitButton = ({onExecute}) => (
    <IconButton onClick={onExecute} title="Save changes">
        <SaveIcon/>
    </IconButton>
);

const CancelButton = ({onExecute}) => (
    <IconButton color="secondary" onClick={onExecute} title="Cancel changes">
        <CancelIcon/>
    </IconButton>
);

const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};
const Command = ({id, onExecute}) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};


class EditManageAdminContainer extends React.PureComponent {

    constructor(props) {
        super(props);
        const columns = [
            {

                name: "username",
                label: "Username",
                options: {
                    filter: true,
                    sort: true,
                    sortDirection: 'asc'
                }
            }
        ];

        this.state = {
            columns: columns,
            rows: [],
            loading: false,
            pageSizes: [20, 50, 100, 0]
            // rows: generateRows({
            //   columnValues: { id: ({ index }) => index, ...defaultColumnValues },
            //   length: 8,
            // }),
        };

        this.commitChanges = this.commitChanges.bind(this);
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
                rows: data,
                loading: false
            })
        }).catch((error) => {
            console.log('error: ' + error);
            this.setState({
                loading: false
            })
        });
    }


    deleteUser = (usernames) => {
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
                "usernames": usernames,
            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    throw new Error(response.statusText);
                }
            }).then(data => {
            this.props.history.push("/manageadmin")

        }).catch((error) => {
            this.setState({
                loading: false
            })
        });
    }

    handleSave = () => {

        if (deletedUsernameList !== []) {
            this.deleteUser(deletedUsernameList)
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


    commitChanges({added, changed, deleted}) {
        let {rows} = this.state;

        if (deleted) {

            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.rowNumber));
            deletedUsernameList.push(this.state.rows[deleted[0]].username)
        }
        this.setState({rows});
    }

    render() {

        const {rows, columns} = this.state;


        return (
            <LoadingOverlay
                active={this.state.loading}
                spinner
            >
                <MuiThemeProvider theme={theme}>
      <span>
      <h2>
            Delete Admin
    </h2>
        </span>
                    <Button variant="contained" color="secondary" onClick={this.handleSave}>
                        Save
                    </Button>
                    <Paper>

                        <Grid
                            rows={rows}
                            columns={columns}
                            Id={getRowId}
                        >
                            <SearchState/>
                            <FilteringState defaultFilters={[]}/>
                            <IntegratedFiltering/>
                            <PagingState
                                defaultCurrentPage={0}
                                defaultPageSize={0}
                            />
                            <IntegratedPaging/>
                            <SortingState/>
                            <IntegratedSorting/>
                            <Table/>


                            <VirtualTable
                                height="auto"
                            />
                            <TableHeaderRow showSortingControls/>
                            <PagingPanel
                                pageSizes={this.state.pageSizes}
                            />
                            <EditingState
                                onCommitChanges={this.commitChanges}
                            />


                            <TableEditRow/>
                            <TableEditColumn
                                showDeleteCommand
                                commandComponent={Command}
                            />
                            <Toolbar/>
                            <SearchPanel/>
                            <TableFilterRow/>
                        </Grid>
                    </Paper>
                </MuiThemeProvider>
            </LoadingOverlay>

        );


    }
}

export default EditManageAdminContainer
