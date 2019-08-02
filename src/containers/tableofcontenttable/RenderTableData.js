import React, { Component } from 'react';

const renderTableData = ({project, flow, channel, screen}) => {
       return (
          <tr key={project}>
             <td>{project}</td>
             <td>{flow}</td>
             <td>{channel}</td>
             <td>{screen}</td>
          </tr>
       )

 } 

export default renderTableData ;