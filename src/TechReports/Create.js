import React, { Component } from 'react'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import FormElements from './Form'
import {initializeState, getAxiosConfig} from '../shared/axios'
import {onChangeHandler, formElementsToArray, SaveButton} from '../shared/utils'
import {axiosCreate} from '../shared/axios'
import Grid from '@material-ui/core/Grid'
import RenderForm from '../shared/renderForm'
import View from './View'
import Modal from '../shared/Modal'

class Create extends Component {
	state = {
		form: FormElements(),
		modal: false,
		component: '',
		taskDTY: null
	}

	axiosSetState (state) {
		this.setState({
			...state
		})
	}

	componentDidMount () {
		const devices = axios.get(API_ROOT + 'devices/?search=2', getAxiosConfig())

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

	techReport () {
		const techReport = {}
		for (let formElementIdentifier in this.state.form) {
			if (formElementIdentifier === 'date' &&
				typeof(this.state.form[formElementIdentifier].value) !== 'string') {
				techReport[formElementIdentifier] = this.getFormattedDate(this.state.form[formElementIdentifier].value)
			} else if (!(formElementIdentifier === 'ip' &&
				!this.state.form[formElementIdentifier].value)) {
				techReport[formElementIdentifier] = this.state.form[formElementIdentifier].value
			}
		}
		return techReport
	}

	getFormattedDate = (date) => {
		const year = date.getFullYear();
		const month = (1 + date.getMonth()).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0')

		return year + '-' + month + '-' + day;
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const techReport = this.techReport()
		axiosCreate("techReports", techReport, this.props.history)
	}

	TaskDTYOnChangeHandler = (taskDTY) => {
		this.setState({
			taskDTY
		})
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

				<h3>Νέα Τεχνική Έκθεση</h3>
				<form onSubmit={this.onSubmitHandler}>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Grid container direction="column" spacing={3}>
								<RenderForm
									formElementsArray={formElementsArray}
									changed={(event, inputIdentifier) => this.inputChangedHandler(event, inputIdentifier)}
									loadComponent={(inputIdentifier) => this.showModal(inputIdentifier)}
									taskDTYChanged={(taskDTY) => this.TaskDTYOnChangeHandler(taskDTY)}
								/>
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<View state={this.state} />
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