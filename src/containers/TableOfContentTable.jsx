import React, { Component } from 'react';
import axios from 'axios';

import RenderTableData from './tableofcontenttable/RenderTableData.js';
import './tableofcontenttable/tableofcontenttable.css';

const header = ['project', 'flow', 'channel', 'screen'];

//create table template
class Table extends Component {
  //Display
  renderTableHeader(header) {
    // let header = Object.keys(this.state.students[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  }

  render() {
    //Whenever our class runs, render method will be called automatically, it may have already defined in the constructor behind the scene.

    const { data } = this.props;

    return (
      <div>
        <h1>Table of contents</h1>
        <table id="students">
          <tbody>
            {data[0] && <tr>{this.renderTableHeader(Object.keys(data[0]))}</tr>}
            {/* {this.renderTableData()} */}
            {data.map(student => (
              <RenderTableData {...student} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
