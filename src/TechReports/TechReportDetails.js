import React, { useState } from 'react'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import {DeleteButton} from '../shared/utils'
import Checkbox from '@material-ui/core/Checkbox'

const TechReportDetails = (props) => {
  const { tech_report } = props
  const url = '/techReports/edit?techReport=' + tech_report.id

  const onClickHandler = () => {
    if (!tech_report.generate_pdf) {
      return props.history.push(url)
    }
  }

  const [sent, setSent] = useState(tech_report.sent)

  const onChangeSentHandler = () => {
    props.sent(tech_report.id, !sent)
    setSent(prevSent => !prevSent)
  }

// { tech_report.task_dty.code_number }/{ tech_report.task_dty.year }
  return (
    <TableRow hover={true} onClick={() => onClickHandler()}>
      <TableCell>{ tech_report.id }</TableCell>
      <TableCell>{ tech_report.client }</TableCell>
      <TableCell>{ tech_report.department }</TableCell>
      <TableCell>{ tech_report.type_of_device }</TableCell>
      <TableCell>{ tech_report.date }</TableCell>
      <TableCell>{ tech_report.task_dty.code_number }</TableCell>
      <TableCell align='center' onClick={e => e.stopPropagation()}>
        {tech_report.pdf ? <a href={ tech_report.pdf} target="_blank" rel="noopener noreferrer">
          Εμφάνιση
        </a> : '-'}
      </TableCell>
      <TableCell onClick={e => e.stopPropagation()}>
        <Checkbox
          checked={sent}
          onChange={onChangeSentHandler}
          color="primary"
          inputProps={{'aria-label': 'secondary checkbox',}}
        />
      </TableCell>
      <TableCell onClick={e => e.stopPropagation()}>
        <DeleteButton deleteInstance={() => props.deleteTechReport(tech_report.id)} />
      </TableCell>
    </TableRow>
  ) 
}

export default TechReportDetails
