import React, { Component } from 'react'
import RenderForm from './renderForm'
import {onChangeHandler, formElementsToArray} from './utils'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

class Search extends Component {

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

	search () {
		const search = {}
		for (let formElementIdentifier in this.state.form) {
			if (this.state.form[formElementIdentifier].value) {
				if ((formElementIdentifier === 'date_from' || formElementIdentifier === 'date_to') &&
					typeof(this.state.form[formElementIdentifier].value) !== 'string') {
					search[formElementIdentifier] = this.getFormattedDate(this.state.form[formElementIdentifier].value)
				} else {
					search[formElementIdentifier] = this.state.form[formElementIdentifier].value
				}
			}
		}
		return search
	}

	getFormattedDate = (date) => {
		const year = date.getFullYear();
		const month = (1 + date.getMonth()).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0')

		return year + '-' + month + '-' + day;
	}

	onSubmitHandler = (e) => {
		e.preventDefault()
		const search = this.search()
		let url = this.props.location.pathname
		for (let param in search) {
			url += '&' + param + '=' + search[param]
		}
		url = url.replace('&', '?')
		this.props.history.push(url)
	}

	render () {
		const formElementsArray = formElementsToArray(this.state.form)

		return (
			<form onSubmit={this.onSubmitHandler}>
				<Grid container direction="row" justify="center" alignItems="center" spacing={3}>
					<RenderForm
						formElementsArray={formElementsArray}
						changed={(event, inputIdentifier) => this.inputChangedHandler(event, inputIdentifier)}
						loadComponent={(inputIdentifier) => this.showModal(inputIdentifier)}
					/>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							size="small"
							type="submit"
						>
							Αναζήτηση
						</Button>
					</Grid>
				</Grid>
			</form>
		)
	}
}

export default Search