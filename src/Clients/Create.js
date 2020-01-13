import React, { Component } from 'react'
import {axiosCreate} from '../shared/axios'
import FormElements from './Form'
import FormElement from '../shared/formElements'
import {onChangeHandler, formElementsToArray, SaveButton} from '../shared/utils'
import View from './View'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Create extends Component {
	state = {
		form: FormElements(),
		phone_numbers: []
	}

	inputChangedHandler = (event, inputIdentifier) => {
		this.setState({
			form: onChangeHandler(event, inputIdentifier, this.state.form)
		})
	}

	addPhoneNumber = (phone_number) => {
		if (phone_number) {
			this.setState(prevState => ({
				phone_numbers: [...prevState.phone_numbers, phone_number]
			}))
		}
	}

	deletePhoneNumber = (phone_number) => {
		const phone_numbers = this.state.phone_numbers.filter(pn => {
			return pn !== phone_number
		})
		this.setState({
			phone_numbers
		})
	}

	form (formElementsArray) {
		const form = formElementsArray.map(formElement => {
			return (
				<FormElement
					key={formElement.id}
					elementType={formElement.config.elementType}
					elementConfig={formElement.config.elementConfig}
					value={formElement.config.value}
					changed={event => this.inputChangedHandler(event, formElement.id)}
					addPhoneNumberButton={formElement.config.addPhoneNumberButton}
					clicked={(phone_number) => this.addPhoneNumber(phone_number)}
				/>
			)
		})
		return form
	}

	client () {
		const client = {}
		for (let formElementIdentifier in this.state.form) {
			if (formElementIdentifier !== 'phone_number') {
				client[formElementIdentifier] = this.state.form[formElementIdentifier].value
			}
		}
		client['phone_numbers_pop'] = this.state.phone_numbers
		return client
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const client = this.client()
		axiosCreate("clients", client, this.props.history, this.props.showModal)
	}

	render () {

		const formElementsArray = formElementsToArray(this.state.form)
		const form = this.form(formElementsArray)

		return (
			<>
				<h3>Νέος Πελάτης</h3>
				<form onSubmit={this.onSubmitHandler}>
					<Grid container spacing={3}>
						<Grid item xs={6}>
							<Grid container direction="column" spacing={3}>
								{form}
							</Grid>
						</Grid>
						<Grid item xs={6}>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Τηλέφωνα</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<View
										phone_numbers={this.state.phone_numbers}
										deletePhoneNumber={(phone_number) => this.deletePhoneNumber(phone_number)}
									/>
								</TableBody>
							</Table>
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