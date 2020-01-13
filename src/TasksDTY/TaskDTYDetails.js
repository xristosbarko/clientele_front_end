import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const taskDTYDetails = (props) => {
  const { taskDTY } = props
  const url = '/tasksDTY/edit?taskDTY=' + taskDTY.id

  const onClickHandler = () => {
    return props.history.push(url)
  }

// { taskDTY.code_number }/{ taskDTY.year }
  return (
    <TableRow hover={true} onClick={() => onClickHandler()}>
      <TableCell>{ taskDTY.code_number }</TableCell>
      <TableCell>{ taskDTY.date }</TableCell>
      <TableCell>{ taskDTY.client }</TableCell>
      <TableCell>{ taskDTY.department }</TableCell>
      <TableCell>{ taskDTY.report_damage }</TableCell>
      <TableCell align='center' onClick={e => e.stopPropagation()}>
        {taskDTY.scanned_dty ?
          <a href={taskDTY.scanned_dty} target="_blank" rel="noopener noreferrer">
            Εμφάνιση
          </a>
        : '-'}
      </TableCell>
    </TableRow>
  ) 
}

export default taskDTYDetails
