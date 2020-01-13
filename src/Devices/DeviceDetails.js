import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const deviceDetails = (props) => {
  const { device } = props
  const url = '/devices/edit?device=' + device.id

  const onClickHandler = () => {
    return props.history.push(url)
  }

  return (
    <TableRow hover={true} onClick={() => onClickHandler()}>
        <TableCell>{ device.name }</TableCell>
    </TableRow>
  ) 
}

export default deviceDetails
