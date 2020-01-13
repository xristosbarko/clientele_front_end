import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const techDetails = (props) => {
  const { tech } = props
  const url = '/techs/edit?tech=' + tech.last_name + ' ' + tech.first_name

  const onClickHandler = () => {
    return props.history.push(url)
  }

  return (
    <TableRow hover={true} onClick={() => onClickHandler()}>
        <TableCell>{ tech.last_name } { tech.first_name }</TableCell>
        <TableCell>{ tech.phone_number }</TableCell>
    </TableRow>
  ) 
}

export default techDetails
