import React from 'react'
import TextField from '@material-ui/core/TextField'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import Input from '@material-ui/core/Input'

export const InputElement = (props) => {
	let addPhoneNumberButton = null
	if (props.addPhoneNumberButton) {
		addPhoneNumberButton = (
			<IconButton
				variant="contained"
				color="primary"
				size="small"
				onClick={() => props.clicked(props.value)}>
				<AddIcon />
			</IconButton>
		)
	}

	return (
		<div style={{padding: "5px"}}>
			<TextField
				id="standard-basic"
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed}
			/>
			{addPhoneNumberButton}
		</div>
	)
}

export const DateElement = (props) => (
	<MuiPickersUtilsProvider utils={DateFnsUtils}>
		<KeyboardDatePicker
			id="date-picker-inline"
			variant="inline"
			disableToolbar
			format="dd/MM/yyyy"
			margin="normal"
			{...props.elementConfig}
			value={props.value}
			onChange={props.changed}
			KeyboardButtonProps={{
			'aria-label': 'change date',}}
		/>
	</MuiPickersUtilsProvider>
)

export const SelectElement = (props) => (
	<>
		<InputLabel id={props.elementConfig.label}>{props.elementConfig.label}</InputLabel>
		<Select
			id="demo-customized-select"
			labelId={props.elementConfig.label}
			required={props.elementConfig.required}
			value={props.value}
			onChange={props.changed}>
			{props.elementConfig.options.map(option => (
				<MenuItem key={option.id} value={option.id}>
					{option.name}
				</MenuItem>
			))}
		</Select>
	</>
)

export const CheckboxElement = (props) => (
	<FormControlLabel
		value="start"
		label={props.elementConfig.label}
		labelPlacement="start"
		control={
			<Checkbox
				checked={props.value}
				onChange={props.changed}
				color="primary"
				inputProps={{'aria-label': 'secondary checkbox',}}
			/>
		}
	/>
)

export const FileElement = (props) => (
	<>
		<Input
			type="file"
			{...props.elementConfig}
			onChange={props.changed}
		/>
		{typeof(props.value) === 'string' ? 
			<a href={props.value} target="_blank" rel="noopener noreferrer">
				Εμφάνιση
			</a>
		: null}
	</>
)