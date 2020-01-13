import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const departmentDetails = (props) => {
  const { department } = props
  const url = '/departments/edit?department=' + department.name

  const onClickHandler = () => {
    return props.history.push(url)
  }

  return (
    <TableRow hover={true} onClick={() => onClickHandler()}>
        <TableCell>{ department.name }</TableCell>
    </TableRow>
  ) 
}

export default departmentDetails
