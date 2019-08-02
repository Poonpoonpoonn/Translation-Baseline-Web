import React from 'react';
import PropTypes from 'prop-types';
//import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import queryString from 'query-string'
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import CardContent from '@material-ui/core/CardContent';
import {NOTI_TABLE_MAPPING_INDEX, NOTI_VARIABLE, QUERY_NOTIFICATION_MESSAGE} from '../Constants.js'
import LoadingOverlay from 'react-loading-overlay';
import renderHTML from 'react-render-html';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    card: {
        minWidth: "100%",
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: "50%",
    },
    dense: {
        marginTop: 19,
    },
    margin: {
        margin: theme.spacing(1),
    }
});

var isMount = true

class PreviewNotificationContainer extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            loading: true,
            fillChecked: false,
            inputChecked: false,
            column: [],
            data: [],
            htmlText: "",
            newHtmlText: "",
            title: "",
        }

    }

    componentDidMount() {
        this.props.highlightTabMenu(NOTI_TABLE_MAPPING_INDEX)
        const values = queryString.parse(this.props.location.search)

        this.queryNotificationMessage(values)

    }

    render() {
        const {classes} = this.props;
        return (
            <div>
                <LoadingOverlay
                    active={this.state.loading}
                    spinner
                >
                    <h2>{"Preview message of " + this.state.title}</h2>
                    <Card className={classes.card}>
                        <label>
                            <Checkbox
                                name="fill"
                                checked={this.state.fillChecked}
                                onChange={this.handleCheck}
                            />
                            <span>Prefill Data</span>
                        </label>
                        <CardContent>

                            {renderHTML(this.state.newHtmlText === "" ? this.state.htmlText : this.state.newHtmlText)}
                        </CardContent>
                    </Card>
                </LoadingOverlay>

            </div>
        );
    }

    handleCheck = (e) => {
        const name = e.target.name;
        const isChecked = e.target.checked;
        if (name == "fill") {
            console.log("ischeck ", isChecked)
            if (isChecked == true) {
                this.prefillNotificationMessage()
                this.setState({
                    fillChecked: isChecked,
                    inputChecked: false
                })
            } else {

                this.setState({
                    fillChecked: isChecked,
                    newHtmlText: ""
                })
            }

        }

    }

    replaceRange = (s, start, end, newValue) => {
        return s.substring(0, start) + newValue + s.substring(end);
    }

    prefillNotificationMessage = () => {
        var newHtmlText = this.state.htmlText
        var i = -1, j = -1;
        while ((i = newHtmlText.indexOf("[(${")) >= 0) {
            if (newHtmlText.indexOf(")})]") >= 0) {
                j = newHtmlText.indexOf(")})]") + 4
            }

            newHtmlText = this.replaceRange(newHtmlText, i, j, NOTI_VARIABLE)
            console.log("checking firstIndex ", i, ' ', j, ' ', newHtmlText)
        }

        this.setState({
            newHtmlText: newHtmlText
        })
    }


    queryNotificationMessage = (data) => {
        console.log("Checking props history data ", data)
        fetch(QUERY_NOTIFICATION_MESSAGE, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "id": data.id,
                "env": this.props.env,
                "values": data.values,
                "keys": data.keys,
                "types": data.types

            })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json()
                } else {
                    console.log("cannot get data")
                    throw new Error(response.status);
                }
            }).then(data => {
            console.log("check noti preview data", data)
            if (isMount) {
                this.setState({
                    htmlText: data.htmlText,
                    title: data.title,
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


}

PreviewNotificationContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PreviewNotificationContainer);
