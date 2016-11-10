import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
const QuickTable = ({data, title, fields, rowAction}) => {
  return( 
    <MuiThemeProvider>
      <Table selectable={false}>
        <TableHeader enableSelectAll={false} displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan={fields.length} style={{textAlign: 'center'}}>
              {title}
            </TableHeaderColumn>
          </TableRow>

          <TableRow>
            {fields.map((f, index) => { return <TableHeaderColumn key={index}>{f.toUpperCase()}</TableHeaderColumn>})}
          </TableRow>
        </TableHeader>
            
        <TableBody displayRowCheckbox={false}>
          {data.map(record => {
            return (
              <TableRow onTouchTap={rowAction.bind(this, record.id)} key={record.id}>
                {fields.map(f => {return <TableRowColumn key={record.id}>{record[f]}</TableRowColumn>})}
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