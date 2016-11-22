// ah, an abstraction too early...
import React from 'react';
import Radium, {StyleRoot} from 'radium';
import {Link} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import DropdownList from 'react-widgets/lib/DropdownList';
import dateFormat from '../utils/dateFormats.js';
import tableStyles from '../styles/artList.js';


const RadiumTRC = Radium(TableRowColumn);
const RadiumTR = Radium(TableRow);

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
    return (<RadiumTRC style={{overflow: 'visible', ...tableStyles.table.td}} key={record.id}>
              <DropdownList 
                  data={['pending_review', 'published', 'declined']} 
                  value={record[field]} 
                  name="art_status" 
                  onChange={(status) => selectStatus(record.id, status)} />
            </RadiumTRC>)

  case 'edit':
    return <RadiumTRC style={tableStyles.table.td} key={record.id}><Link to={`/art/${record.id}/edit`}>Edit</Link></RadiumTRC>
  
  case 'checkbox':
    return (<RadiumTRC style={tableStyles.table.td} key={record.id}>
                <input type='checkbox' checked={record.checked} value={record.id} data-index={index} onChange={checkAction} />
             </RadiumTRC>)              
  default:
    return <RadiumTRC style={tableStyles.table.td} key={record.id}>{record[field]}</RadiumTRC>
  }
}

const QuickTable = ({data, title, fields, rowAction, selectStatus, checkAction, toggleAll}) => {
  return( 
    <MuiThemeProvider>
    <StyleRoot>
      <Table selectable={false} style={{overflow: 'visible'}}>
        <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan={fields.length} style={{textAlign: 'center'}}>
              {title}
            </TableHeaderColumn>
          </TableRow>

          <RadiumTR style={tableStyles.table.tr}>
            {fields.map((f, index) => { 
              return <TableHeaderColumn key={index}>{headerCell(f, toggleAll)}</TableHeaderColumn>})}
          </RadiumTR>
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
      </StyleRoot>
    </MuiThemeProvider>
  )
}

export default Radium(QuickTable)