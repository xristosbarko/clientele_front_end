import React, { Component } from 'react'
import TaskDetails from './TaskDetails'
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

class TaskList extends Component {
	state = {
		count: 0,
		params: {
			date_from: undefined,
			date_to: undefined,
			status: undefined,
			client: undefined,
			ip: undefined,
			tech: undefined,
			page: undefined			
		},
		hiddenParams: {
			status: 1
		},
		tasks: []
	}

	componentDidMount () {
		let url = 'tasks/'
		let {date_from, date_to, status, client, ip, tech, page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {date_from, date_to, status, client, ip, tech, page}
		url = paramsToUrl(url, locationParams, this.state.hiddenParams)

		axios.get(API_ROOT + url, getAxiosConfig())
			.then(response => {
				this.setState({
					count: response.data.count,
					params: locationParams,
					tasks: response.data.results
				})

			})
			.catch(error => {
				console.log(error)
		})
	}

	componentDidUpdate () {
		let url = 'tasks/'
		let {date_from, date_to, status, client, ip, tech, page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {date_from, date_to, status, client, ip, tech, page}
		url = paramsToUrl(url, locationParams, this.state.hiddenParams)

		if (!_.isEqual(locationParams, this.state.params)) {
			axios.get(API_ROOT + url, getAxiosConfig())
				.then(response => {
					this.setState({
						count: response.data.count,
						params: locationParams,
						tasks: response.data.results
					})
				})
				.catch(error => {
					console.log(error)
			})
		}
	}

	changePage (event, page) {
		const url = '/tasks'
		const updatedParams = changePageParams(page, this.state.params)
		this.props.history.push(url + updatedParams)
	}

	render () {
		const { count, tasks } = this.state
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

		let status = queryString.parse(this.props.location.search).status
		switch (status) {
			case ('2'):
			case ('3'):
				status = 'Δελτίο Τεχνικού Ελέγχου'
				break
			default:
				status = 'Δελτίο Παραλαβής Υλικού'
		}

		return (
			<>
			<Table>
					<TableHead>
						<TableRow>
							<TableCell>No</TableCell>
							<TableCell>Ημερομηνία Ανάθεσης</TableCell>
							<TableCell>Πελάτης</TableCell>
							<TableCell>Αναφορά Πελάτη Βλάβης</TableCell>
							<TableCell>{status}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasks.map(task => (
							<TaskDetails task={task} key={task.id} history={this.props.history} />
						))}
					</TableBody>
					{pagination}
				</Table>
			</>
		)
	}
}

export default TaskList
