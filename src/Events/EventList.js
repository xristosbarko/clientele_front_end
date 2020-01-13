import React, { Component } from 'react'
import EventDetails from './EventDetails'
import axios from 'axios'
import { API_ROOT } from '../appConfig'
import {getAxiosConfig} from '../shared/axios'
import queryString from 'query-string'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import {paramsToUrl, changePageParams} from '../shared/parameters'
import _ from 'lodash'

class EventList extends Component {
	state = {
		count: 0,
		params: {
			client: undefined,
			department: undefined,
			page: undefined			
		},
		hiddenParams: {
			status: 1
		},
		events: []
	}

	componentDidMount () {
		let url = 'events/'
		let {client, department, page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {client, department, page}
		url = paramsToUrl(url, locationParams, this.state.hiddenParams)

		axios.get(API_ROOT + url, getAxiosConfig())
			.then(response => {
				this.setState({
					count: response.data.count,
					params: locationParams,
					events: response.data.results
				})
			})
			.catch(error => {
				console.log(error)
		})
	}

	componentDidUpdate () {
		let url = 'events/'
		let {client, department, page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {client, department, page}
		url = paramsToUrl(url, locationParams, this.state.hiddenParams)

		if (!_.isEqual(locationParams, this.state.params)) {
			axios.get(API_ROOT + url, getAxiosConfig())
				.then(response => {
					this.setState({
						count: response.data.count,
						params: locationParams,
						events: response.data.results
					})
				})
				.catch(error => {
					console.log(error)
			})
		}
	}

	changePage (event, page) {
		const url = '/events'
		const updatedParams = changePageParams(page, this.state.params)
		this.props.history.push(url + updatedParams)
	}

	render () {
		const { count, events } = this.state
		const page = this.state.params.page
		let pagination = null

		if (count) {
			pagination = (
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[]}
							count={count}
							page={page ? parseInt(page) -1 : 0}
							rowsPerPage={10}
							onChangePage={(event, page) => this.changePage(event, page)}
						/>
					</TableRow>
				</TableFooter>
			)
		}

		return (
			<>
				<h3>Σε εκκρεμότητα</h3>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Πελάτης</TableCell>
							<TableCell>Ημερομηνία</TableCell>
							<TableCell>Τηλέφωνο</TableCell>
							<TableCell>Πληροφορίες</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{events.map(event => (
							<EventDetails event={event} key={event.id} history={this.props.history} />
						))}
					</TableBody>
					{pagination}
				</Table>
			</>
		)
	}
}

export default EventList