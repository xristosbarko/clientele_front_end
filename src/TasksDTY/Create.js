import React, { Component } from 'react'
import FormElements from './Form'
import {onChangeHandler, formElementsToArray, SaveButton} from '../shared/utils'
import {axiosCreate} from '../shared/axios'
import RenderForm from '../shared/renderForm'
import Modal from '../shared/Modal'

import Grid from '@material-ui/core/Grid'

class Create extends Component {
	state = {
		form: FormElements(),
		modal: false,
		component: ''
	}

	axiosSetState (state) {
		this.setState({
			...state
		})
	}

	inputChangedHandler = (event, inputIdentifier) => {
		this.setState({
			form: onChangeHandler(event, inputIdentifier, this.state.form, this.props.showModal)
		})
	}

	showModal (component) {
		this.setState(prevState => ({
			modal: !prevState.modal,
			component
		}))
	}

	taskDTY () {
		if (!this.state.form.scanned_dty.value || typeof this.state.form.scanned_dty.value === 'string') {
			const taskDTY = {}
			for (let formElementIdentifier in this.state.form) {
				if (formElementIdentifier === 'date' &&
					typeof(this.state.form[formElementIdentifier].value) !== 'string') {
					taskDTY[formElementIdentifier] = this.getFormattedDate(this.state.form[formElementIdentifier].value)
				} else if (formElementIdentifier !== 'scanned_dty') {
					taskDTY[formElementIdentifier] = this.state.form[formElementIdentifier].value
				}
			}
			return taskDTY
		} else {
			let taskDTY = new FormData()
			for (let formElementIdentifier in this.state.form) {
				if (formElementIdentifier === 'date' &&
					typeof(this.state.form[formElementIdentifier].value) !== 'string') {
					taskDTY.append(formElementIdentifier, this.getFormattedDate(this.state.form[formElementIdentifier].value))
				} else if (formElementIdentifier === 'scanned_dty') {
					taskDTY.append(formElementIdentifier, this.state.form[formElementIdentifier].value, this.state.form[formElementIdentifier].value.name)
				} else {
					taskDTY.append(formElementIdentifier, this.state.form[formElementIdentifier].value)
				}
			}
			return taskDTY
		}
	}

	getFormattedDate = (date) => {
		const year = date.getFullYear();
		const month = (1 + date.getMonth()).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0')

		return year + '-' + month + '-' + day;
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const taskDTY = this.taskDTY()
		axiosCreate("tasksDTY", taskDTY, this.props.history)
	}

	render () {
		const formElementsArray = formElementsToArray(this.state.form)

		return (
			<>
				{this.state.modal ?
					<Modal
						show={this.state.modal}
						showModal={() => this.showModal()}
						component={this.state.component}
						/> 
				: null}

				<h3>Νέα Εργασία ΔΤΥ</h3>
				<form onSubmit={this.onSubmitHandler}>
					<Grid container direction="column" spacing={3}>
						<Grid item xs={6}>
							<Grid container direction="column" spacing={3}>
								<RenderForm
									formElementsArray={formElementsArray}
									changed={(event, inputIdentifier) => this.inputChangedHandler(event, inputIdentifier)}
									loadComponent={(inputIdentifier) => this.showModal(inputIdentifier)}
								/>
							</Grid>
						</Grid>
						<Grid item>
							<SaveButton />
						</Grid>
					</Grid>
				</form>
			</>
		)
	}
}

export default Create