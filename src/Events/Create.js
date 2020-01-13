import React, { Component } from 'react'
import FormElements from './Form'
import {onChangeHandler, formElementsToArray, SaveButton} from '../shared/utils'
import {axiosCreate} from '../shared/axios'
import Grid from '@material-ui/core/Grid'
import RenderForm from '../shared/renderForm'
import Modal from '../shared/Modal'

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
			form: onChangeHandler(event, inputIdentifier, this.state.form)
		})
	}

	showModal (component) {
		this.setState(prevState => ({
			modal: !prevState.modal,
			component
		}))
	}

	event () {
		const event = {}
		for (let formElementIdentifier in this.state.form) {
			if (formElementIdentifier === 'date' &&
				typeof(this.state.form[formElementIdentifier].value) !== 'string') {
				event[formElementIdentifier] = this.getFormattedDate(this.state.form[formElementIdentifier].value)
			} else if (!(formElementIdentifier === 'department' &&
				!this.state.form[formElementIdentifier].value)) {
				event[formElementIdentifier] = this.state.form[formElementIdentifier].value
			}
		}
		return event
	}

	getFormattedDate = (date) => {
		const year = date.getFullYear();
		const month = (1 + date.getMonth()).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0')

		return year + '-' + month + '-' + day;
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const event = this.event()
		axiosCreate("events", event, this.props.history)
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

				<h3>Νέα Ειδοποίηση</h3>
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