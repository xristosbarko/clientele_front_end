import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const eventDetails = (props) => {
  const { event } = props
  const url = '/events/edit?event=' + event.id

  const onClickHandler = () => {
    return props.history.push(url)
  }

  return (
    <TableRow hover={true} onClick={() => onClickHandler()}>
        <TableCell>{ event.client.full_name }</TableCell>
        <TableCell>{ event.date }</TableCell>
        <TableCell>{ event.client.phone_numbers[0] }</TableCell>
        <TableCell>{ event.info }</TableCell>
    </TableRow>
  ) 
}

export default eventDetails
