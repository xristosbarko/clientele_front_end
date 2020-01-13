import React, { Component } from 'react'
import TaskDTYDetails from './TaskDTYDetails'
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

class TaskDTYList extends Component {
	state = {
		count: 0,
		params: {
			date_from: undefined,
			date_to: undefined,
			task_dty: undefined,
			client: undefined,
			department: undefined,
			ip: undefined,
			page: undefined			
		},
		tasksDTY: []
	}

	componentDidMount () {
		let url = 'tasksDTY/'
		let {date_from, date_to, task_dty, client, department, ip, page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {date_from, date_to, task_dty, client, department, ip, page}
		url = paramsToUrl(url, locationParams)

		axios.get(API_ROOT + url, getAxiosConfig())
			.then(response => {
				this.setState({
					count: response.data.count,
					params: locationParams,
					tasksDTY: response.data.results
				})
				
			})
			.catch(error => {
				console.log(error)
		})
	}

	componentDidUpdate () {
		let url = 'tasksDTY/'
		let {date_from, date_to, task_dty, client, department, ip, page} = queryString.parse(this.props.location.search)
		if (!page) {page=1}
		const locationParams = {date_from, date_to, task_dty, client, department, ip, page}
		url = paramsToUrl(url, locationParams)

		if (!_.isEqual(locationParams, this.state.params)) {
			axios.get(API_ROOT + url, getAxiosConfig())
				.then(response => {
					this.setState({
						count: response.data.count,
						params: locationParams,
						tasksDTY: response.data.results
					})
				})
				.catch(error => {
					console.log(error)
			})
		}
	}

	changePage (event, page) {
		const url = '/tasksDTY'
		const updatedParams = changePageParams(page, this.state.params)
		this.props.history.push(url + updatedParams)
	}

	render () {
		const { count, tasksDTY } = this.state
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
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Αριθμός</TableCell>
							<TableCell>Ημερομηνία</TableCell>
							<TableCell>Πελάτης</TableCell>
							<TableCell>Τμήμα</TableCell>
							<TableCell>Αναφορά Πελάτη Βλάβης</TableCell>
							<TableCell>PDF</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tasksDTY.map(taskDTY => (
							<TaskDTYDetails taskDTY={taskDTY} key={taskDTY.id} history={this.props.history} />
						))}
					</TableBody>
					{pagination}
				</Table>
			</>
		)
	}
}

export default TaskDTYList
