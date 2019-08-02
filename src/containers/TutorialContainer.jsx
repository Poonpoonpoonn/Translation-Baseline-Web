import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {TUTORIAL_INDEX} from '../Constants.js'

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


class TutorialContainer extends React.Component {
    componentDidMount() {
        this.props.highlightTabMenu(TUTORIAL_INDEX)
    }

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <br/>
                <Card className={classes.card}>
                    <CardContent>
                        <h2>
                            Tutorial Coming Soon
                        </h2>


                    </CardContent>
                    <CardActions>
                    </CardActions>
                </Card>
            </form>

        );
    }
}

TutorialContainer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TutorialContainer);
