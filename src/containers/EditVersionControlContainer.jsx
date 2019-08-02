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
import {
    DELETE_SUMMARIZE_VERSION_CONTROL_API,
    QUERY_SUMMARIZE_VERSION_CONTROL_API,
    VERSION_CONTROL_INDEX
} from '../Constants.js'


const getRowId = row => row.rowNumber;
var deletedIdList = []

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


class EditVersionControlContainer extends React.PureComponent {

    constructor(props) {
        super(props);
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
            columns: this.summarizeColumns,
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

    getColumnName = (obj) => {
        let column = JSON.parse(JSON.stringify(obj))
        return column.name
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
                rows: data,
                loading: false
            })
        }).catch((error) => {
            this.setState({
                loading: false
            })
        });
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
            this.props.history.push("/versioncontrol")

        }).catch((error) => {
            this.setState({
                loading: false
            })
        });
    }

    handleSave = () => {

        if (deletedIdList !== []) {
            this.deleteSummarizeVersionControl(deletedIdList)
        }
    }

    componentDidMount() {
        this.isMount = true
        this.props.highlightTabMenu(VERSION_CONTROL_INDEX)
        this.querySummarizeVersionControl()
    }

    componentWillUnmount() {
        this.isMount = false
    }


    commitChanges({added, changed, deleted}) {
        let {rows} = this.state;

        if (deleted) {

            const deletedSet = new Set(deleted);
            rows = rows.filter(row => !deletedSet.has(row.rowNumber));
            deletedIdList.push(this.state.rows[deleted[0]].id)
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
            Edit Version Control
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

export default EditVersionControlContainer
