import React, { Component } from 'react'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {initializeState, axiosCreate, getAxiosConfig} from '../shared/axios'
import FormElements from './Form'
import {onChangeHandler, formElementsToArray, SaveButton} from '../shared/utils'
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

	componentDidMount () {
		const devices = axios.get(API_ROOT + 'devices/?search=1', getAxiosConfig())

		initializeState(
			[devices],
			['type_of_device'],
			this.state,
			(state) => this.axiosSetState(state)
		)
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

	task () {
		const task = {}
		for (let formElementIdentifier in this.state.form) {
			task[formElementIdentifier] = this.state.form[formElementIdentifier].value
		}
		return task
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const task = this.task()
		axiosCreate("tasks", task, this.props.history)
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

				<h3>Νέα Εργασία</h3>
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