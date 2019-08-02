import React, {Component} from 'react';
import TabBar from '../components/TabBar.jsx'
import AddEventContainer from './AddEventContainer.jsx';
import AddFieldContainer from './AddFieldContainer.jsx';
import SpreadSheetContainer from './SpreadSheetContainer.jsx';
import {VERSION_CONTROL_INDEX} from '../Constants.js'


class AddDataContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Full Version Control",
            tabName: "event"
        }

    }

    changeTab = (tabName) => {
        console.log("enter select tab ", tabName)
        if (tabName === 0) {
            this.selectTab("event")
        } else if (tabName === 1) {
            this.selectTab("field")
        } else if (tabName === 2) {
            this.selectTab("eventRelation")
        }
    }

    componentDidMount() {
        this.isMount = true
        this.props.highlightTabMenu(VERSION_CONTROL_INDEX)
        this.selectTab()

    }

    componentWillUnmount() {
        this.isMount = false
    }


    selectTab = () => {
        console.log("enter select tab method")
        const {tabName} = this.state
        const {highlightTabMenu, env, username} = this.props
        switch (tabName) {
            case 'event':
                return <AddEventContainer highlightTabMenu={highlightTabMenu} env={env} username={username}/>;
            case 'field':
                return <AddFieldContainer highlightTabMenu={highlightTabMenu} env={env} username={username}/>;
            case 'eventRelation':
                return <SpreadSheetContainer highlightTabMenu={highlightTabMenu} env={env} username={username}/>;
            default:
                return <AddEventContainer highlightTabMenu={highlightTabMenu} env={env} username={username}/>;
        }
    }

    // getMuiTheme = () => createMuiTheme({
    //   palette: {
    //     //type: "dark",
    //     primary:pink
    //   },

    //   typography: {
    //     useNextVariants: true
    //   },
    //   overrides: {
    //     MUIDataTableBodyCell: {
    //       root: {
    //         // backgroundColor: "#FF0000"
    //       }
    //     },
    //     MUIDataTableSelectCell: {
    //       checked: {color: "#FF0266 !important" }
    //     }
    //     // ,
    //     // MUIDataTableBodyRow: {
    //     //   root: {
    //     //     '&:nth-child(odd)': { 
    //     //       backgroundColor: '#FF0000'
    //     //     }
    //     //   }
    //     // }
    //   }
    // })

    render() {
        const {highlightTabMenu, env, username} = this.props

        return (
            <div>
                <TabBar changeTab={this.changeTab} items={["Add Event", "Add Field", "Add & Update Event Relations"]}/>
                {/* {this.selectTab} */}
                <AddEventContainer highlightTabMenu={highlightTabMenu} env={env} username={username}/>;

            </div>

        )
    }
}

export default AddDataContainer;