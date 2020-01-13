import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import ClientCreate from '../Clients/Create'
import TaskDTYCreate from '../TasksDTY/Create'
import DepartmentCreate from '../Departments/Create'
import TechCreate from '../Techs/Create'

const ScrollDialog = (props) => {

  let component = null

  switch (props.component) {
    case ('client'):
      component = <ClientCreate showModal={props.showModal} />
      break 
    case ('task_dty'):
      component = <TaskDTYCreate showModal={props.showModal} />
      break
    case ('department'):
      component = <DepartmentCreate showModal={props.showModal} />
      break
    case ('tech'):
      component = <TechCreate showModal={props.showModal} />
      break
    default:
      component = null
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={props.show}
        onClose={props.showModal}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers={true}>
          <DialogContentText
            id="scroll-dialog-description"
            tabIndex={-1}
          >
          {component}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ScrollDialog