import React, {Component} from 'react';
import MUIDataTable from "mui-datatables";
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import pink from 'material-ui/colors/pink';
import {QUERY_EVENT_SUMMARY_API, TABLE_MAPPING_INDEX, EXPORT_DATA_API} from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import CustomToolbar from "../components/CustomToolbar.jsx";
import EventDetailContainer from "./EventDetailContainer";
import ReactDataGrid from 'react-data-grid';
import {Column, Table} from 'react-virtualized';
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
import MaterialTable from "material-table";



class TranslationBaselineTableContainer extends Component {

    render() {
        return (

            <MaterialTable
                title="Simple Action Preview"
                columns={[
                    { title: 'Name', field: 'name' },
                    { title: 'Surname', field: 'surname' },
                    { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
                    {
                        title: 'Birth Place',
                        field: 'birthCity',
                        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
                    },
                ]}
                data={[
                    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                    { name: 'Zerya Betül', surname: 'Baran', birthYear: 2017, birthCity: 34 },
                ]}
                actions={[
                    {
                        icon: 'save',
                        tooltip: 'Save User',
                        onClick: (event, rowData) => alert("You saved " + rowData.name)
                    }
                ]}
            />
        )
    }
}

export default TranslationBaselineTableContainer;
