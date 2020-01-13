import React from 'react'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import queryString from 'query-string'
import {initializeState, axiosEdit, axiosDelete, getAxiosConfig} from '../shared/axios'
import FormElements from './Form'
import Create from './Create'
import {formElementsToArray, SaveButton, DeleteButton} from '../shared/utils'
import View from './View'

import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'

class Edit extends Create {
	state = {
		id: null,
		form: FormElements(),
		phone_numbers: []
	}

	axiosSetState (state) {
		this.setState({
			...state
		})
	}

	componentDidMount () {
		const client_id = queryString.parse(this.props.location.search).client
		const client = axios.get(API_ROOT + 'clients/get/' + client_id, getAxiosConfig())

		initializeState(
			[client],
			[null],
			this.state,
			(state) => this.axiosSetState(state)
		)
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const client = this.client()
		axiosEdit("clients", this.state.id, client, this.props.history)
	}

	deleteClient () {
		axiosDelete("clients", this.state.id, this.props.history)
	}

	render () {

		const formElementsArray = formElementsToArray(this.state.form)
		const form = this.form(formElementsArray)

		return (
			<>
				<h3>Επεξεργασία Πελάτη</h3>
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
						<Grid container spacing={3}>
							<Grid item>
								<SaveButton />
							</Grid>
							<Grid item>
								<DeleteButton deleteInstance={() => this.deleteClient()} />
							</Grid>
						</Grid>
					</Grid>
				</form>
			</>
		)
	}
}

export default Edit