// ah, an abstraction too early...
import React from 'react';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import DropdownList from 'react-widgets/lib/DropdownList';
import dateFormat from '../utils/dateFormats.js';

const headerCell = (field, toggleAll) => {
  if (field == "checkbox") {
    return <p style={{cursor: 'pointer'}} onClick={toggleAll}>Toggle All</p>
  } else {
    return field.toUpperCase();
  }
}

const determineCell = (record, field, checkAction, index, selectStatus) => {
  switch (field) {
  case 'status':
    return (<TableRowColumn style={{overflow: 'visible'}} key={record.id}>
              <DropdownList 
                  data={['pending_review', 'published', 'declined']} 
                  value={record[field]} 
                  name="art_status" 
                  onChange={(status) => selectStatus(record.id, status)} />
            </TableRowColumn>)   
                  
  case 'creation_date':  
    return (<TableRowColumn style={{overflow: 'visible'}} key={record.id}>
              {dateFormat(record[field])}
            </TableRowColumn>)

  case 'edit':
    return <TableRowColumn key={record.id}><Link to={`/art/${record.id}/edit`}>Edit</Link></TableRowColumn>
  
  case 'checkbox':
    return (<TableRowColumn key={record.id}>
                <input type='checkbox' checked={record.checked} value={record.id} data-index={index} onChange={checkAction} />
             </TableRowColumn>)              
  default:
    return <TableRowColumn key={record.id}>{record[field]}</TableRowColumn>
  }
}

const QuickTable = ({data, title, fields, rowAction, selectStatus, checkAction, toggleAll}) => {
  return( 
    <MuiThemeProvider>
      <Table selectable={false} style={{overflow: 'visible'}}>
        <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan={fields.length} style={{textAlign: 'center'}}>
              {title}
            </TableHeaderColumn>
          </TableRow>

          <TableRow>
            {fields.map((f, index) => { 
              return <TableHeaderColumn key={index}>{headerCell(f, toggleAll)}</TableHeaderColumn>})}
          </TableRow>
        </TableHeader>
            
        <TableBody style={{overflow: 'visible'}} displayRowCheckbox={false}>

          {data.map((record, index) => {

            return (
              <TableRow key={record.id}>
                {fields.map(f => determineCell(record, f, checkAction, index, selectStatus))}
              </TableRow>
            )
           }
          )}
        </TableBody>
          
      </Table>
    </MuiThemeProvider>
  )
}

export default QuickTable