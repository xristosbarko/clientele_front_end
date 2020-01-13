import React, { Component } from 'react'
import {axiosCreate} from '../shared/axios'
import FormElements from './Form'
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

	inputChangedHandler = (event, inputIdentifier) => {
		this.setState({
			form: onChangeHandler(event, inputIdentifier, this.state.form)
		})
	}

	department () {
		const department = {}
		for (let formElementIdentifier in this.state.form) {
			department[formElementIdentifier] = this.state.form[formElementIdentifier].value
		}
		return department
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const department = this.department()
		axiosCreate("departments", department, this.props.history, this.props.showModal)
	}

	render () {
		const formElementsArray = formElementsToArray(this.state.form)

		return (
			<>
				<h3>Νέο Τμήμα</h3>
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