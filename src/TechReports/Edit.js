import React from 'react'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import queryString from 'query-string'
import FormElements from './Form'
import Create from './Create'
import {initializeState, axiosEdit, axiosDelete, getAxiosConfig} from '../shared/axios'
import {formElementsToArray, SaveButton, DeleteButton} from '../shared/utils'
import Grid from '@material-ui/core/Grid'
import RenderForm from '../shared/renderForm'
import View from './View'
import Modal from '../shared/Modal'

class Edit extends Create {
	state = {
		id: null,
		form: FormElements(true),
		modal: false,
		component: ''
	}

	componentDidMount () {
		const techReport_id = queryString.parse(this.props.location.search).techReport

		const devices = axios.get(API_ROOT + 'devices/?search=2', getAxiosConfig())
		const techReport = axios.get(API_ROOT + 'techReports/get/' + techReport_id, getAxiosConfig())

		initializeState(
			[devices, techReport],
			['type_of_device', null],
			this.state,
			(state) => this.axiosSetState(state)
		)

	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const techReport = this.techReport()
		axiosEdit("techReports", this.state.id, techReport, this.props.history)
	}

	deleteTechReport = () => {
		axiosDelete("techReports", this.state.id, this.props.history)
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

				<h3>Επεξεργασία Τεχνικής Έκθεσης</h3>
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
							<View state={this.state} />
						</Grid>
						<Grid container spacing={3}>
							<Grid item>
								<SaveButton />
							</Grid>
							<Grid item>
								<DeleteButton deleteInstance={() => this.deleteTechReport()} />
							</Grid>
						</Grid>
					</Grid>
				</form>
			</>
		)
	}
}

export default Edit