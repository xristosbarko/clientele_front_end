import React from 'react'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import queryString from 'query-string'
import View from './View'
import FormElements from './Form'
import Create from './Create'
import {initializeState, axiosEdit, axiosDelete, getAxiosConfig} from '../shared/axios'
import {formElementsToArray, SaveButton, DeleteButton} from '../shared/utils'
import RenderForm from '../shared/renderForm'
import Modal from '../shared/Modal'

import Grid from '@material-ui/core/Grid'

class Edit extends Create {
	state = {
		id: null,
		form: FormElements(true),
		phone_numbers: [],
		briefings: [],
		pdf: "",
		modal: false,
		component: ''
	}

	componentDidMount () {
		const task_id = queryString.parse(this.props.location.search).task

		const devices = axios.get(API_ROOT + 'devices/?search=1', getAxiosConfig())
		const status = axios.get(API_ROOT + 'tasks/status_choices', getAxiosConfig())
		const task = axios.get(API_ROOT + 'tasks/get/' + task_id, getAxiosConfig())

		initializeState(
			[devices, status, task],
			['type_of_device', 'status', null],
			this.state,
			(state) => this.axiosSetState(state)
		)
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const task = this.task()
		axiosEdit("tasks", this.state.id, task, this.props.history)
	}

	deleteTask = () => {
		axiosDelete("tasks", this.state.id, this.props.history)
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

				<h3>Επεξεργασία Εργασίας</h3>
				<form onSubmit={this.onSubmitHandler}>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Grid container direction="column" spacing={3}>
								<RenderForm
									formElementsArray={formElementsArray}
									changed={(event, inputIdentifier) => this.inputChangedHandler(event, inputIdentifier)}
									loadComponent={(inputIdentifier) => this.showModal(inputIdentifier)}
								/>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<View
								status={this.state.form.status.value}
								phone_numbers={this.state.phone_numbers}
								briefings={this.state.briefings}
								pdf={this.state.pdf}
							/>
						</Grid>
						<Grid container spacing={3}>
							<Grid item>
								<SaveButton />
							</Grid>
							<Grid item>
								<DeleteButton deleteInstance={() => this.deleteTask()} />
							</Grid>
						</Grid>
					</Grid>
				</form>
			</>
		)
	}
}

export default Edit