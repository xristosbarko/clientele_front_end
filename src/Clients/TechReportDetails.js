import React from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

const tech_reportDetails = (props) => {
  const { tech_report } = props
  const url = '/techReports/edit?techReport=' + tech_report.id

  const onClickHandler = () => {
    if (!tech_report.generate_pdf) {
      return props.history.push(url)
    }
  }

  return (
    <TableRow hover={true} onClick={() => onClickHandler()}>
      <TableCell>{ tech_report.date }</TableCell>
      <TableCell>{ tech_report.client }</TableCell>
      <TableCell>{ tech_report.department }</TableCell>
      <TableCell>{ tech_report.ip }</TableCell>
      <TableCell onClick={e => e.stopPropagation()}>
        <a href={ tech_report.pdf} target="_blank" rel="noopener noreferrer">
          Εμφάνιση
        </a>
      </TableCell>
    </TableRow>
  ) 
}

export default tech_reportDetails
