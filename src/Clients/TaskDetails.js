import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import moment from 'moment'

const taskDetails = (props) => {
  const { task } = props
  const url = '/tasks/edit?task=' + task.id
  const date_assignment = moment(task.date_assignment).format('YYYY-MM-DD HH:mm')

  const onClickHandler = () => {
    return props.history.push(url)
  }

  return (
    <TableRow hover={true} onClick={() => onClickHandler()}>
        <TableCell>{ date_assignment }</TableCell>
        <TableCell>{ task.client }</TableCell>
        <TableCell>{ task.ip }</TableCell>
        <TableCell>{ task.report_damage }</TableCell>
    </TableRow>
  ) 
}

export default taskDetails