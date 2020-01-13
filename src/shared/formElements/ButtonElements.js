import React from 'react'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import DeleteIcon from '@material-ui/icons/Delete'

export const AddButton = (props) => (
	<IconButton
		variant="contained"
		color="primary"
		size="small"
		onClick={() => props.clicked()}>
		<AddIcon />
	</IconButton>
)

export const ButtonElement = (props) => (
	<Button
		variant="contained"
		color={props.value === "Αποθήκευση" ? "primary" : "secondary"}
		size="small"
		startIcon={props.value === "Αποθήκευση" ? <SaveIcon /> : <DeleteIcon />}
		{...props.elementConfig}
	>
	{props.value}
	</Button>
)