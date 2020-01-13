import React from 'react'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import queryString from 'query-string'
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
		form: FormElements(true)
	}

	componentDidMount () {
		const event_id = queryString.parse(this.props.location.search).event

		const status = axios.get(API_ROOT + 'events/status_choices', getAxiosConfig())
		const event = axios.get(API_ROOT + 'events/get/' + event_id, getAxiosConfig())

		initializeState(
			[status, event],
			['status', null],
			this.state,
			(state) => this.axiosSetState(state)
		)
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const event = this.event()
		axiosEdit("events", this.state.id, event, this.props.history)
	}

	deleteEvent = () => {
		axiosDelete("events", this.state.id, this.props.history)
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

				<h3>Επεξεργασία Ειδοποίησης</h3>
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
						<Grid container spacing={3}>
							<Grid item>
								<SaveButton />
							</Grid>
							<Grid item>
								<DeleteButton deleteInstance={() => this.deleteEvent()} />
							</Grid>
						</Grid>
					</Grid>
				</form>
			</>
		)
	}
}

export default Edit