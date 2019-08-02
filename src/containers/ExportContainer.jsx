import React, { Component, Fragment } from 'react';
import Typogarphy from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CloudDownload from '@material-ui/icons/CloudDownload';
import withStyles from '@material-ui/styles/withStyles';
import { saveAs } from 'file-saver';

const styles = {
  button: {
    margin: '1em ',
  },
  rigthIcon: {
    marginLeft: '0.5em',
  },
};

class ExportContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      disableExport: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  handleExport = () => {
    this.setState({ disableExport: true });
    fetch('http://localhost:8080/v1/translation/translationexport')
      .then(res => res.blob())
      .then(blob => {
        saveAs(blob, 'Translation_Baseline.xlsx');
      })
      .catch(error => {
        alert('Something went wrong, please try again later');
      })
      .finally(() => {
        this.setState({ disableExport: false });
      });
  };

  render() {
    console.log('Export constainer props', this.props, this.state);
    const { loading, disableExport } = this.state;
    const { version, classes } = this.props;
    return (
      <Fragment>
        {loading ? (
          'loading...'
        ) : (
          <div>
            <Typogarphy variant="h4">Download Key (version {version} )</Typogarphy>
            <div>
              <Button
                disabled={disableExport}
                variant="contained"
                onClick={this.handleExport}
                className={classes.button}
              >
                {!disableExport ? 'Export' : 'Exporting...'}
                <CloudDownload className={classes.rigthIcon} />
              </Button>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ExportContainer);
