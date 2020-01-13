import React, { Component } from 'react'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {axiosCreate} from '../shared/axios'
import FormElements from './Form'
import {initializeState, getAxiosConfig} from '../shared/axios'
import {onChangeHandler, formElementsToArray, SaveButton} from '../shared/utils'

import Grid from '@material-ui/core/Grid'
import RenderForm from '../shared/renderForm'

class Create extends Component {
	state = {
		form: FormElements()
	}

	axiosSetState (state) {
		this.setState({
			...state
		})
	}

	componentDidMount () {
		const apps = axios.get(API_ROOT + 'devices/app_choices', getAxiosConfig())

		initializeState(
			[apps],
			['app'],
			this.state,
			(state) => this.axiosSetState(state)
		)
	}

	inputChangedHandler = (event, inputIdentifier) => {
		this.setState({
			form: onChangeHandler(event, inputIdentifier, this.state.form)
		})
	}

	device () {
		const device = {}
		for (let formElementIdentifier in this.state.form) {
			device[formElementIdentifier] = this.state.form[formElementIdentifier].value
		}
		return device
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const device = this.device()
		axiosCreate("devices", device, this.props.history)
	}

	render () {
		const formElementsArray = formElementsToArray(this.state.form)

		return (
			<>
				<h3>Νέα Συσκευή</h3>
				<form onSubmit={this.onSubmitHandler}>
					<Grid container direction="column" spacing={3}>
						<Grid item xs={6}>
							<Grid container direction="column" spacing={3}>
								<RenderForm
									formElementsArray={formElementsArray}
									changed={(event, inputIdentifier) => this.inputChangedHandler(event, inputIdentifier)}
									loadComponent={(inputIdentifier) => this.loadComponent(inputIdentifier)}
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