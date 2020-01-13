import React from 'react'
import FormElement from './formElements'
import {AddButton} from './formElements/ButtonElements'
import AutoCompleteElement from './formElements/AutoCompleteElement'
import Grid from '@material-ui/core/Grid'

const renderForm = (props) => {
	const form = props.formElementsArray.map(formElement => {
		let updatedFormElement = (
				<FormElement
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					changed={event => props.changed(event, formElement.id)}
				/>
			)
		let addButton = null
		let style = null

		if (formElement.config.extra) {
			if (formElement.config.extra.autoComplete) {
				style = {display: 'flex'}
				updatedFormElement = (
					<AutoCompleteElement
						app={formElement.config.extra.autoComplete}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						changed={event => props.changed(event, formElement.id)}
						taskDTYChanged={props.taskDTYChanged ? (taskDTY) => props.taskDTYChanged(taskDTY) : null}
					/>
				)
			}
			if (formElement.config.extra.addButton) {
				addButton = <AddButton style={{flex: '1'}} clicked={() => props.loadComponent(formElement.id)} />
			}
		}

		return (
			<Grid key={formElement.id} item style={style}>
				{updatedFormElement}
				{addButton}
			</Grid>
		)
	})
	return form
}

export default renderForm